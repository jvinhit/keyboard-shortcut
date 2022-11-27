import { KeyboardContextProvider } from "./contexts/KeyboardContext";
import Banner from "./components/Banner";

import "./styles.css";
import { ShortcutContextProvider } from "./contexts/ShortcutContext";

export default function App() {
  return (
    <ShortcutContextProvider>
      <KeyboardContextProvider>
        <div className="App">
          <h1>Hello CodeSandbox</h1>
          <h2>Start editing to see some magic happen!</h2>
        </div>
        <div>
          <Banner />
        </div>
      </KeyboardContextProvider>
    </ShortcutContextProvider>
  );
}
