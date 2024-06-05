import { SetStateAction, useEffect, useState } from 'react';
import { ILocalStorageItem, IStoreRecord } from './types/types';

// TODO: Поработать над типами аргументов

/**
 * Создание состояний для полей и их синхронизация с localStorage
 * @param args Поля для хранения в localStorage
 * @returns Состояния полей и их управление
 */
function useLocalStorage(...args: ILocalStorageItem[]) {
  const [store, setStore] = useState<IStoreRecord>(
    args.reduce((obj, item) => ({ ...obj, [item.key]: item.initialValue }), {})
  );
  const [synced, setSynced] = useState(false);

  const states = Object.keys(store).map((key) => ({
    key,
    state: store[key],
    setState: (obj: SetStateAction<Object>) => {
      setStore((prev) => {
        const newStore = { ...prev };
        newStore[key] = typeof obj === 'object' ? obj : obj(store[key]);

        localStorage.setItem(key, JSON.stringify(newStore[key]));

        return newStore;
      });
    },
  }));

  /** Синхронизация с localStorage */
  useEffect(() => {
    states.map(({ key, state, setState }) => {
      const items = localStorage.getItem(key) || JSON.stringify(state);

      if (items !== JSON.stringify(state)) {
        setState(JSON.parse(items));
      }
    });

    setSynced(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { states, synced };
}

export default useLocalStorage;
