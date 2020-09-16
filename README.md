# use-idb-keyval

React hook to help you use IndexDB. This acts as a drop-in replacement for `useLocalStorage`. 

This is a fork of [kigiri/react-use-idb](https://github.com/kigiri/react-use-idb/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc). The original package hadn't been updated in over a year and no activity seemed to be happening. I wanted to fix a bug and use it myself, so here we are. 😀

## Why ?

`LocalStorage` is synchronous and has [performances issues](https://hacks.mozilla.org/2012/03/there-is-no-simple-solution-for-local-storage/)

`LocalStorage` is also limited, only storing strings and does not provide a default mechanisme for serializing / deserializing your data.

Instead, we can rely on `indexDB` for structural cloning.

## Usage

```javascript
import useIdb from "use-idb-keyval";

const Demo = () => {
  const [value, setValue] = useIdb("character-name", "Geralt");

  return (
    <div>
      <p>My favorite character from The Witcher is {value}.</p>
      <button onClick={() => setValue("Yennefer")}>Yennefer</button>
      <button onClick={() => setValue("Triss")}>Triss</button>
    </div>
  );
};
```

## API

```javascript
useIdb(key);
useIdb(key, initialValue);
```

- `key` &mdash; `indexDB` item key to register
- `initialValue` &mdash; initial value to set, if value in the `indexDB` item is empty.

> Inspired by [idb-keyval](https://github.com/jakearchibald/idb-keyval)
