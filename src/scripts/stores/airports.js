import { action, atom } from 'nanostores';

export const airports = atom([]);

export const setAirports = action(airports, 'setAirports', (store, airports) => {
  store.set(airports);
});
