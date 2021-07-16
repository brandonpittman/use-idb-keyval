import { useEffect, useCallback, useState } from 'react';

import { get, set } from './idb';

const useIdbKeyval = <T>(
  key: string,
  initialState: T,
  initFn?: (initialState: T) => any
) => {
  const [item, setItem] = useState(initialState);
  const [saving, setSaving] = useState(false);

  const safeSet = async (key: string, value: T) => {
    if (saving) {
      console.error('Already awaiting a set call.');
    } else {
      setSaving(true);
      await set(key, value);
      setSaving(false);
    }
  };

  useEffect(() => {
    (async () => {
      if (typeof window !== 'undefined') {
        const value = await get(key);
        if (value) {
          setItem(value);
        } else {
          const initFnResult = initFn ? initFn(initialState) : null;
          setItem(initFnResult ? initFnResult : initialState);
          safeSet(key, initFnResult ? initFnResult : initialState);
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
            safeSet(key, prevValue);
            return prevValue;
          });
        } else {
          setItem(value);
          safeSet(key, value);
        }
      },
      [safeSet, setItem]
    ),
    useCallback(() => {
      setItem(initialState);
      safeSet(key, initialState);
    }, [safeSet, setItem]),
  ];
};

export { useIdbKeyval, get, set };
export default useIdbKeyval;
