import { useEffect, useState } from "react";

import { get, set } from "./idb.js";

export default function useIdbKeyval(key, initialState) {
  const [item, setItem] = useState(initialState);

  useEffect(() => {
    get(key).then((value) => value === undefined || setItem(value));
  }, [key]);

  return [
    item,
    (value) => {
      if (typeof value === "function") {
        let prevValue;
        setItem((prev) => {
          prevValue = prev;
          value(prev);
        });
        return set(key, value(prevValue));
      } else {
        setItem(value);
        return set(key, value);
      }
    },
  ];
}

export { get, set };
