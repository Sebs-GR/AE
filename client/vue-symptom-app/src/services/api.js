// symptom-tracker-monorepo/client/vue-symptom-app/src/services/api.js
import axios from 'axios';

// The base URLs for the services. These will be taken from environment variables.
const PATIENTS_SERVICE_URL = import.meta.env.VITE_PATIENTS_SERVICE_URL || 'http://localhost:3001/api';
const SYMPTOMS_SERVICE_URL = import.meta.env.VITE_SYMPTOMS_SERVICE_URL || 'http://localhost:3002/api';

export const patientsApi = {
  getAll() {
    return axios.get(`${PATIENTS_SERVICE_URL}/patients`);
  },
  getById(id) {
    return axios.get(`${PATIENTS_SERVICE_URL}/patients/${id}`);
  },
  create(patientData) {
    return axios.post(`${PATIENTS_SERVICE_URL}/patients`, patientData);
  },
  update(id, patientData) {
    return axios.put(`${PATIENTS_SERVICE_URL}/patients/${id}`, patientData);
  },
  delete(id) {
    return axios.delete(`${PATIENTS_SERVICE_URL}/patients/${id}`);
  }
};

export const symptomsApi = {
  getAll() {
    return axios.get(`${SYMPTOMS_SERVICE_URL}/symptoms`);
  },
  getByPatientId(patientId) {
    return axios.get(`${SYMPTOMS_SERVICE_URL}/symptoms/patient/${patientId}`);
  },
  create(symptomData) {
    // symptomData must include patientId
    return axios.post(`${SYMPTOMS_SERVICE_URL}/symptoms`, symptomData);
  }
};