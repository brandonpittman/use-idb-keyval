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
      setItem(value);
      return set(key, value);
    },
  ];
}
