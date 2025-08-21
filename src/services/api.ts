import axios from 'axios';

// To use env vars, import using import.meta.env.VITE_[varName]
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const apiRoutes = {
  sessions: '/sessions',
  users: '/users',
  serialCommand: '/serial/command',
  serialCycleCommand: '/serial/cycle/command',
};
