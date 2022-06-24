import ky from 'ky';
import 'dotenv/config';

const { X_RAPID_API_KEY, X_RAPID_API_HOST } = process.env;

const api = ky.create({
  prefixUrl: `https://${X_RAPID_API_HOST}`,
  headers: {
    'X-RapidAPI-Key': X_RAPID_API_KEY,
    'X-RapidAPI-Host': X_RAPID_API_HOST,
  },
});

export const fetchAirports = async (q, limit) => {
  return api('airports/search/term', {
    searchParams: { q, limit },
  });
};

export const fetchAirportRoutes = async (icao) => {
  return api(`airports/icao/${icao}/stats/routes/daily`);
};
