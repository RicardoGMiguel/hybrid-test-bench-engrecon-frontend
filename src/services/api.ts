import axios from 'axios';

// To use env vars, import using import.meta.env.VITE_[varName]
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const apiRoutes = {
  sessions: '/sessions',
  users: '/users',
  customers: '/customers',
  employees: '/employees',
  equipments: '/equipments',
  projects: '/projects',
  project_employees: '/project_employees',
  auto_evaluations: '/auto_evaluations',
  kinesis_functional_evaluations: '/kinesis_functional_evaluations',
  evaluations: '/evaluations',
  sensors: '/sensors',
  attendance_lists: '/attendance_lists',
  monitoring_evaluations: '/monitoring_evaluations',
  reports: '/reports',
  file_templates: '/file_templates',
};
