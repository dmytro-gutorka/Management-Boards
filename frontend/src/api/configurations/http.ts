import axios from 'axios';
import { DEFAULT_API_BASE_URL } from '../../constants/env.default.constsnts.ts';

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL,
});
