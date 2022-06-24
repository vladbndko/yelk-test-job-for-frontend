import { action, atom } from 'nanostores';

export const airportsLoading = atom(false);

export const setAirportsLoading = action(
  airportsLoading,
  'setAirportsLoading',
  (store, loading) => {
    store.set(loading);
  },
);
