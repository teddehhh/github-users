import { useEffect, useState } from 'react';

interface IObj {
  key: string;
  initialValue: Object;
}

interface IStoreRecord {
  [key: string]: Object;
}

function useLocalStorage(...args: IObj[]) {
  const [store, setStore] = useState<IStoreRecord>(
    args.reduce((obj, item) => ({ ...obj, [item.key]: item.initialValue }), {})
  );

  const states = Object.keys(store).map((key) => ({
    key,
    state: store[key],
    setState: (obj: Object | ((prev: Object) => Object)) => {
      setStore((prev) => {
        const newStore = { ...prev };
        newStore[key] = typeof obj === 'object' ? obj : obj(store[key]);

        localStorage.setItem(key, JSON.stringify(newStore[key]));

        return newStore;
      });
    },
  }));

  /** initialize */
  useEffect(() => {
    states.map(({ key, state, setState }) => {
      const items = localStorage.getItem(key) || JSON.stringify(state);

      if (items !== JSON.stringify(state)) {
        setState(JSON.parse(items));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return states;
}

export default useLocalStorage;
