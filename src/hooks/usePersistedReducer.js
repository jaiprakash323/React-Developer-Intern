import { useReducer, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const usePersistedReducer = (reducer, initialState, storageKey) => {
  const [savedState, saveState] = useLocalStorage(storageKey, initialState);
  const [state, dispatch] = useReducer(reducer, savedState);

  useEffect(() => {
    saveState(state);
  }, [state, saveState]);

  return [state, dispatch];
};