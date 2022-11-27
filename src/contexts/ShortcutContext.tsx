import { createContext, ReactNode, useState } from "react";

type ShortcutContextType = {
  registerListener: (
    shortcutKey: Set<string>,
    eventHandler: () => void
  ) => void;
  removeListener: (shortKey: Set<string>) => void;
  triggerListener: (shortKey: Set<string>) => void;
};
const initValue: ShortcutContextType = {
  registerListener: (_: Set<string>, eventHandler: () => void) => {},
  removeListener: (_: Set<string>) => {},
  triggerListener: (_: Set<string>) => {}
};
const ShortcutContext = createContext<ShortcutContextType>(initValue);

const buildShortcutIndex = (keys: Set<string>) => Array.from(keys).join("+");

const ShortcutContextProvider = ({ children }: { children: ReactNode }) => {
  const [shortcutMap, addShortcutMap] = useState<Map<string, () => void>>(
    new Map()
  );

  const registerListener = (
    shortcutKey: Set<string>,
    eventHandler: () => void
  ) => {
    const shortcut = buildShortcutIndex(shortcutKey);
    addShortcutMap(shortcutMap.set(shortcut, eventHandler));
  };
  const removeListener = (shortKey: Set<string>) => {
    shortcutMap.delete(buildShortcutIndex(shortKey));
  };
  const triggerListener = (heldKey: Set<string>) => {
    const listener = shortcutMap.get(buildShortcutIndex(heldKey));
    if (listener) listener();
  };

  return (
    <ShortcutContext.Provider
      value={{ registerListener, removeListener, triggerListener }}
    >
      {children}
    </ShortcutContext.Provider>
  );
};
export { ShortcutContext, ShortcutContextProvider };
