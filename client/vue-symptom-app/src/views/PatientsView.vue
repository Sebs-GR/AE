<template>
  <div class="patients-view">
    <h2>Gestión de Pacientes</h2>
    <form @submit.prevent="handlePatientSubmit">
      <h3>{{ editingPatientId ? 'Editar' : 'Nuevo' }} Paciente</h3>
      <input v-model="patientForm.firstName" placeholder="Nombre" required />
      <input v-model="patientForm.lastName" placeholder="Apellido" required />
      <input type="date" v-model="patientForm.dateOfBirth" placeholder="Fecha de Nacimiento" required />
      <input type="email" v-model="patientForm.email" placeholder="Email" required />
      <button type="submit">{{ editingPatientId ? 'Actualizar' : 'Guardar' }} Paciente</button>
      <button type="button" @click="resetPatientForm" v-if="editingPatientId">Cancelar Edición</button>
    </form>

    <h3>Lista de Pacientes</h3>
    <ul v-if="patients.length > 0">
      <li v-for="patient in patients" :key="patient._id">
        {{ patient.firstName }} {{ patient.lastName }} ({{ patient.email }})
        <button @click="editPatient(patient)">Editar</button>
        <button @click="confirmDeletePatient(patient._id)">Eliminar</button>
        <button @click="viewSymptoms(patient._id)">Ver Síntomas</button>
      </li>
    </ul>
    <p v-else>No hay pacientes registrados.</p>

    <div v-if="selectedPatientSymptoms.length > 0">
      <h4>Síntomas de {{ patients.find(p => p._id === selectedPatientId)?.firstName }}</h4>
      <ul>
        <li v-for="symptom in selectedPatientSymptoms" :key="symptom._id">
          {{ symptom.symptomDescription }} (Severidad: {{ symptom.severity }}) - {{ new Date(symptom.loggedAt).toLocaleDateString() }}
        </li>
      </ul>
    </div>
    <div v-if="selectedPatientId && !selectedPatientSymptoms.length && symptomsFetched">
      <p>No hay síntomas registrados para este paciente.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { patientsApi, symptomsApi } from '@/services/api'; // Ensure the path is correct

const patients = ref([]);
const patientForm = ref({ firstName: '', lastName: '', dateOfBirth: '', email: '' });
const editingPatientId = ref(null);
const selectedPatientId = ref(null);
const selectedPatientSymptoms = ref([]);
const symptomsFetched = ref(false);

const fetchPatients = async () => {
  try {
    const response = await patientsApi.getAll();
    patients.value = response.data;
  } catch (error) {
    console.error('Error al obtener pacientes:', error);
    alert('Error al obtener pacientes.');
  }
};

const handlePatientSubmit = async () => {
  try {
    if (editingPatientId.value) {
      await patientsApi.update(editingPatientId.value, patientForm.value);
      alert('Paciente actualizado!');
    } else {
      await patientsApi.create(patientForm.value);
      alert('Paciente creado!');
    }
    resetPatientForm();
    fetchPatients();
  } catch (error) {
    console.error('Error al guardar paciente:', error.response?.data?.message || error.message);
    alert(`Error al guardar paciente: ${error.response?.data?.message || error.message}`);
  }
};

const editPatient = (patient) => {
  editingPatientId.value = patient._id;
  // Format the date for the input type="date"
  const dob = new Date(patient.dateOfBirth).toISOString().split('T')[0];
  patientForm.value = { ...patient, dateOfBirth: dob };
};

const confirmDeletePatient = async (id) => {
  if (window.confirm('¿Estás seguro de que quieres eliminar este paciente?')) {
    try {
      await patientsApi.delete(id);
      alert('Paciente eliminado.');
      fetchPatients();
    } catch (error) {
      console.error('Error al eliminar paciente:', error);
      alert('Error al eliminar paciente.');
    }
  }
};

const resetPatientForm = () => {
  editingPatientId.value = null;
  patientForm.value = { firstName: '', lastName: '', dateOfBirth: '', email: '' };
};

const viewSymptoms = async (patientId) => {
  selectedPatientId.value = patientId;
  symptomsFetched.value = false;
  try {
    const response = await symptomsApi.getByPatientId(patientId);
    selectedPatientSymptoms.value = response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      selectedPatientSymptoms.value = [];
      // No symptoms, this is an expected case
    } else {
      console.error(`Error al obtener síntomas para el paciente ${patientId}:`, error);
      alert(`Error al obtener síntomas.`);
      selectedPatientSymptoms.value = [];
    }
  } finally {
    symptomsFetched.value = true;
  }
};

onMounted(fetchPatients);
</script>

<style scoped>
.patients-view { max-width: 800px; margin: auto; }
form { margin-bottom: 20px; padding: 15px; border: 1px solid #ccc; border-radius: 5px; }
form input { display: block; margin-bottom: 10px; padding: 8px; width: calc(100% - 18px); }
ul { list-style: none; padding: 0; }
li { padding: 10px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; }
li button { margin-left: 10px; }
</style>