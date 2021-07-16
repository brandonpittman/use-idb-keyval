import { useEffect, useState } from 'react';

import { get, set } from './idb';

function useIdbKeyval<S>(key: string, initialState: S): any;
function useIdbKeyval<S>(key: string, initialState: () => S): any {
  const [item, setItem] = useState(initialState);
  const reset = () => {
    const res =
      typeof initialState === 'function' ? initialState() : initialState;
    setItem(res);
    set(key, res);
  };

  useEffect(() => {
    (async () => {
      if (typeof window !== 'undefined') {
        const value = await get(key);
        if (value) {
          setItem(value);
        } else {
          const valueToSet =
            typeof initialState === 'function' ? initialState() : initialState;
          setItem(valueToSet);
          set(key, valueToSet);
        }
      }
    })();
  }, [key]);

  return [
    item,
    (value: any) => {
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
    reset,
  ] as const;
}

export { useIdbKeyval, get, set };
export default useIdbKeyval;
