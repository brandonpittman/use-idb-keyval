import { useEffect, useState } from "react";

import { get, set } from "./idb.js";

export default function useIdbKeyval(key, initialState) {
  const [item, setItem] = useState(initialState);

  useEffect(() => {
    if (typeof window !== "undefined")
      get(key).then((value) => value === undefined || setItem(value));
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
