import { action, atom } from 'nanostores';

export const airportRoutesLoading = atom(false);

export const setAirportRoutesLoading = action(
  airportRoutesLoading,
  'setAirportRoutesLoading',
  (store, loading) => {
    store.set(loading);
  },
);
