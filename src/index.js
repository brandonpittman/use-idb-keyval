import { useEffect, useState } from "react";

import { get, set } from "./idb.js";

export default function useIdbKeyval(key, initialState, initFn) {
  const [item, setItem] = useState(initialState);

  useEffect(async () => {
    if (typeof window !== "undefined") {
      const value = await get(key);
      if (value) {
        setItem(value);
      } else {
        const initFnResult = initFn ? initFn(initialState) : null;
        setItem(initFnResult ? initFnResult : initialState);
        set(key, initFnResult ? initFnResult : initialState);
      }
    }
  }, [key]);

  return [
    item,
    (value) => {
      if (typeof value === "function") {
        setItem((prev) => {
          const prevValue = value(prev);
          set(key, prevValue);
          return prevValue;
        });
      } else {
        setItem(value);
        set(key, value);
      }
    },
    () => {
      setItem(initialState);
      set(key, initialState);
    },
  ];
}
