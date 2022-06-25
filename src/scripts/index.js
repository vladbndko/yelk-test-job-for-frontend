import debounce from 'lodash/debounce';

import { fetchAirports, fetchAirportRoutes } from './api';

import { airportRoutes, setAirportRoutes } from './stores/airport-routes';
import { airportRoutesLoading, setAirportRoutesLoading } from './stores/airport-routes-loading';
import {
  airportRoutesVisibility,
  setAirportRoutesVisibility,
} from './stores/airport-routes-visibility';

import { airports, setAirports } from './stores/airports';
import { airportsLoading, setAirportsLoading } from './stores/airports-loading';
import { searchTerm, setSearchTerm } from './stores/search-term';

const airportsItemsElement = document.getElementById('airports-items');
const airportsLoaderElement = document.getElementById('airports-loader');

const airportRoutesElement = document.getElementById('airport-routes');
const airportRoutesRowsElement = document.getElementById('airport-routes-rows');
const airportRoutesLoaderElement = document.getElementById('airport-routes-loader');

const airportsRoutesModalElement = document.getElementById('airport-routes-modal');
const airportsRoutesModalCloseElement = airportsRoutesModalElement.querySelector('.close');

airportsRoutesModalCloseElement.addEventListener('click', (e) => {
  e.preventDefault();
  setAirportRoutesVisibility(false);
});

window.addEventListener('keydown', (e) => {
  if (e.code === 'Escape' && airportRoutesVisibility.get()) {
    setAirportRoutesVisibility(false);
  }
});

document.getElementById('name').addEventListener(
  'input',
  debounce(({ target: { value } }) => {
    setSearchTerm(value);
  }, 1000),
);

searchTerm.listen(async () => {
  if (searchTerm.get().length === 0) {
    setAirports([]);
  }

  if (searchTerm.get().length < 3) {
    return;
  }

  setAirportsLoading(true);
  try {
    const response = await fetchAirports(searchTerm.get(), 10);
    const { items } = await response.json();
    setAirports(items);
  } catch (error) {
    console.error(error);
  } finally {
    setAirportsLoading(false);
  }
});

airportsLoading.listen(() => {
  airportsLoaderElement.classList[airportsLoading.get() ? 'remove' : 'add']('hidden');
  airportsItemsElement.classList[airportsLoading.get() ? 'add' : 'remove']('hidden');
});

airports.listen(async () => {
  airportsItemsElement.innerHTML = '';

  if (airports.get().length === 0) {
    airportsItemsElement.innerHTML = 'No results';
  }

  airports.get().forEach((item) => {
    const cardElement = document.createElement('a');
    cardElement.setAttribute('href', '#');
    cardElement.classList.add('card');
    cardElement.addEventListener('click', async (e) => {
      e.preventDefault();
      setAirportRoutesLoading(true);
      setAirportRoutesVisibility(true);
      try {
        const response = await fetchAirportRoutes(item.icao);
        const { routes } = await response.json();
        setAirportRoutes(routes.slice(0, 10));
      } catch (error) {
        console.error(error);
      } finally {
        setAirportRoutesLoading(false);
      }
    });

    const cardTitleElement = document.createElement('h5');
    cardTitleElement.classList.add('card-title');
    cardTitleElement.textContent = item.name;

    const cardBodyElement = document.createElement('p');
    cardBodyElement.classList.add('card-body');
    cardBodyElement.textContent = `Location: LAT ${item.location.lat}, LON ${item.location.lon}. ICAO: ${item.icao}`;

    cardElement.append(cardTitleElement, cardBodyElement);
    airportsItemsElement.append(cardElement);
  });
});

airportRoutesLoading.listen(() => {
  airportRoutesLoaderElement.classList[airportRoutesLoading.get() ? 'remove' : 'add']('hidden');
  airportRoutesElement.classList[airportRoutesLoading.get() ? 'add' : 'remove']('hidden');
});

airportRoutesVisibility.listen(() => {
  airportsRoutesModalElement.classList[airportRoutesVisibility.get() ? 'remove' : 'add']('hidden');
  setAirportRoutes([]);
});

airportRoutes.listen(() => {
  airportRoutesRowsElement.innerHTML = '';

  if (airportRoutes.get().length === 0) {
    const row = document.createElement('tr');
    const colEmpty = document.createElement('td');
    colEmpty.setAttribute('colspan', '2');
    colEmpty.innerHTML = 'Empty';
    row.append(colEmpty);
    airportRoutesRowsElement.append(row);
  }

  airportRoutes.get().forEach((route) => {
    const row = document.createElement('tr');

    const colDestination = document.createElement('td');
    colDestination.textContent = route.destination.name;

    const colOperators = document.createElement('td');
    colOperators.textContent = route.operators.map(({ name }) => name).join(', ');

    row.append(colDestination, colOperators);
    airportRoutesRowsElement.append(row);
  });
});
