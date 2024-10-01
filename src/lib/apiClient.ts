import aspida from '@aspida/axios';
import axios from 'axios';
// import { safeEnv } from './env';
import api from '../api/$api';

const client = axios.create({
  baseURL: 'http://localhost:5173/api/',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
  withXSRFToken: true,
});

export const apiClient = api(aspida(client));
