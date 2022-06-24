import { atom, action } from 'nanostores';

export const airportRoutes = atom([]);

export const setAirportRoutes = action(airportRoutes, 'setAirportRoutes', (store, routes) => {
  store.set(routes);
});
