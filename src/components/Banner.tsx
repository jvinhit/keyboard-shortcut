import { CSSProperties, useContext, useEffect, useState } from "react";
import { KeyboardContext } from "../contexts/KeyboardContext";
import { ShortcutContext } from "../contexts/ShortcutContext";

const center: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column"
};
const Banner = () => {
  const { keys } = useContext(KeyboardContext);
  const [isShow, setShow] = useState(false);
  const { registerListener, removeListener } = useContext(ShortcutContext);
  const handleShow = () => setShow((s) => !s);

  useEffect(() => {
    const keys = new Set(["shift", " "]);
    registerListener(keys, handleShow);
    return () => {
      removeListener(keys);
    };
  });
  return (
    <div style={center}>
      <div>{isShow && <div>this is sample mess </div>}</div>
      <div>
        <button onClick={handleShow}>Click me</button>
      </div>
      <div>
        {Array.from(keys).map((key) => (
          <span key={key}>{key.toUpperCase()}</span>
        ))}
      </div>
    </div>
  );
};

export default Banner;
