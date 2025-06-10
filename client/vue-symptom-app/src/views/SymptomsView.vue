<template>
  <div class="symptoms-view">
    <h2>Registro de Síntomas</h2>
    <form @submit.prevent="createSymptom">
      <select v-model="symptomForm.patientId" required>
        <option value="">Selecciona un Paciente</option>
        <option v-for="patient in patients" :key="patient._id" :value="patient._id">
          {{ patient.firstName }} {{ patient.lastName }} ({{ patient.email }})
        </option>
      </select>
      <textarea v-model="symptomForm.symptomDescription" placeholder="Descripción del síntoma" required></textarea>
      <input type="number" v-model.number="symptomForm.severity" placeholder="Severidad (1-10)" min="1" max="10" required />
      <input v-model="symptomForm.notes" placeholder="Notas adicionales" />
      <button type="submit">Registrar Síntoma</button>
    </form>

    <h3>Todos los Registros de Síntomas</h3>
    <ul v-if="allSymptoms.length > 0">
      <li v-for="symptom in allSymptoms" :key="symptom._id">
        Paciente: {{ getPatientName(symptom.patientId) }} - {{ symptom.symptomDescription }} (Severidad: {{ symptom.severity }}) - {{ new Date(symptom.loggedAt).toLocaleDateString() }}
      </li>
    </ul>
    <p v-else>No hay síntomas registrados.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { symptomsApi, patientsApi } from '@/services/api';

const patients = ref([]);
const allSymptoms = ref([]);
const symptomForm = ref({ patientId: '', symptomDescription: '', severity: null, notes: '' });

const fetchPatients = async () => {
  try {
    const response = await patientsApi.getAll();
    patients.value = response.data;
  } catch (error) {
    console.error('Error al obtener pacientes:', error);
  }
};

const fetchAllSymptoms = async () => {
  try {
    const response = await symptomsApi.getAll();
    allSymptoms.value = response.data;
  } catch (error) {
    console.error('Error al obtener todos los síntomas:', error);
  }
};

const createSymptom = async () => {
  try {
    await symptomsApi.create(symptomForm.value);
    alert('Síntoma registrado exitosamente!');
    symptomForm.value = { patientId: '', symptomDescription: '', severity: null, notes: '' };
    fetchAllSymptoms(); // Refresh the list
  } catch (error) {
    console.error('Error al registrar síntoma:', error.response?.data?.message || error.message);
    alert(`Error al registrar síntoma: ${error.response?.data?.message || error.message}`);
  }
};

const getPatientName = (patientId) => {
  const patient = patients.value.find(p => p._id === patientId);
  return patient ? `${patient.firstName} ${patient.lastName}` : 'Desconocido';
};

onMounted(() => {
  fetchPatients();
  fetchAllSymptoms();
});
</script>

<style scoped>
.symptoms-view { max-width: 800px; margin: auto; }
form { margin-bottom: 20px; padding: 15px; border: 1px solid #ccc; border-radius: 5px; }
form select, form textarea, form input { display: block; margin-bottom: 10px; padding: 8px; width: calc(100% - 18px); }
ul { list-style: none; padding: 0; }
li { padding: 10px; border-bottom: 1px solid #eee; }
</style>