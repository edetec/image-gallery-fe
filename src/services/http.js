import axios from 'axios';

export const BACKEND = process.env.VUE_APP_BACKEND;

const client = axios.create({
  baseURL: `${BACKEND}/api/`
});

export default client; 