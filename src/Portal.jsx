import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children }) => {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => {
      return setMounted(false);
    };
  }, []);

  return isMounted
    ? createPortal(children, document.querySelector("#modal"))
    : null;
};

export default Portal;
