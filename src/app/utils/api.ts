import axios from 'axios';
import { environment } from '../../../src/env';
/**
 * config an API utility to connect with backend api
 */
export const API = axios.create({
  baseURL: environment.baseURL
});
