import { action, atom } from 'nanostores';

export const searchTerm = atom('');

export const setSearchTerm = action(searchTerm, 'setSearchTerm', (store, value) => {
  store.set(value);
});
