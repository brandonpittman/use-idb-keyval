# use-idb-keyval

This is a React hook to help you use IndexedDB. 

## Usage

```javascript
import useIdb from "use-idb-keyval";

const Demo = () => {
  const [value, setValue, resetValue] = useIdb("count", 0);

  return (
    <>
      <p>Count: {value}.</p>
      <button onClick={() => setValue(previousValue => previousValue + 1)}>Increment</button>
      <button onClick={resetValue}>Reset</button>
    </>
  );
};
```

When using the setter function, you can either pass a new value or a function that takes the previous value.

## API

```javascript
useIdb(key);
useIdb(key, initialValue);
useIdb(key, initialValue, (inititalValue) => { doSomething(initialValue});
```

- `key` &mdash; `indexDB` item key to register
- `initialValue` &mdash; initial value to set, if value in the `indexDB` item is empty.
- You can pass a function as the third parameter to do a computation with the initial value.

> Inspired by [idb-keyval](https://github.com/jakearchibald/idb-keyval)


<a href="https://www.buymeacoffee.com/blp" target="_blank"><img width="217" height="60" src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee"></a>

