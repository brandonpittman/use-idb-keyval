import { useEffect, useCallback, useState } from 'react';

import { get, set } from './idb';

const useIdbKeyval = (
  key: string,
  initialState: any,
  initFn?: (initialState: any) => any
) => {
  const [item, setItem] = useState(initialState);

  useEffect(() => {
    (async () => {
      if (typeof window !== 'undefined') {
        const value = await get(key);
        if (value) {
          setItem(value);
        } else {
          const initFnResult = initFn ? initFn(initialState) : null;
          setItem(initFnResult ? initFnResult : initialState);
          set(key, initFnResult ? initFnResult : initialState);
        }
      }
    })();
  }, [key]);

  return [
    item,
    useCallback(
      value => {
        if (typeof value === 'function') {
          setItem((prev: typeof item) => {
            const prevValue = value(prev);
            set(key, prevValue);
            return prevValue;
          });
        } else {
          setItem(value);
          set(key, value);
        }
      },
      [set, setItem]
    ),
    useCallback(() => {
      setItem(initialState);
      set(key, initialState);
    }, [set, setItem]),
  ];
};

export { useIdbKeyval, get, set };
export default useIdbKeyval;
