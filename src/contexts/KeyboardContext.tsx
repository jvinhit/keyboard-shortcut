import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react";
import { ShortcutContext } from "./ShortcutContext";

interface KeyboardContextType {
  keys: Set<string>;
}

const initValue: KeyboardContextType = {
  keys: new Set()
};
const KeyboardContext = createContext<KeyboardContextType>(initValue);

const KeyboardContextProvider = ({ children }: { children: ReactNode }) => {
  const [keys, setKeys] = useState<Set<string>>(new Set());
  const { triggerListener } = useContext(ShortcutContext);
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const newKeys = new Set([...Array.from(keys), e.key.toLowerCase()]);
      triggerListener(newKeys);
      setKeys(newKeys);
    },
    [keys, triggerListener]
  );

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      const newKeys = new Set([
        ...Array.from(keys).filter((k) => k !== e.key.toLowerCase())
      ]);
      setKeys(newKeys);
    },
    [keys]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    // window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);
  console.log(keys);
  return (
    <KeyboardContext.Provider value={{ keys }}>
      {children}
    </KeyboardContext.Provider>
  );
};

export { KeyboardContextProvider, KeyboardContext };
