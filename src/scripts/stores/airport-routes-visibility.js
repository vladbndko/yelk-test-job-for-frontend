import { action, atom } from 'nanostores';

export const airportRoutesVisibility = atom(false);

export const setAirportRoutesVisibility = action(
  airportRoutesVisibility,
  'setAirportRoutesVisibility',
  (store, visibility) => {
    store.set(visibility);
  },
);
