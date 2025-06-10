// symptom-tracker-monorepo/services/symptoms-service/src/controllers/symptomLogController.js
import SymptomLog from '../models/SymptomLog.js';

// Optional: you might want to verify patient existence by calling the patients-service
// import axios from 'axios';
// const PATIENT_SERVICE_URL = process.env.PATIENT_SERVICE_URL || 'http://localhost:3001/api';

export const createSymptomLog = async (req, res) => {
  try {
    const { patientId, symptomDescription, severity, notes } = req.body;

    // Optional: Verify if the patient exists before logging the symptom
    // try {
    //   await axios.get(`${PATIENT_SERVICE_URL}/patients/${patientId}`);
    // } catch (patientError) {
    //   if (patientError.response && patientError.response.status === 404) {
    //     return res.status(404).json({ message: `Paciente con ID ${patientId} no encontrado.` });
    //   }
    //   throw patientError; // re-throw other errors
    // }

    const newLog = new SymptomLog({ patientId, symptomDescription, severity, notes });
    await newLog.save();
    res.status(201).json(newLog);
  } catch (error) {
    res.status(400).json({ message: 'Error al registrar el síntoma', error: error.message, details: error.errors });
  }
};

export const getSymptomsByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;
    const logs = await SymptomLog.find({ patientId }).sort({ loggedAt: -1 });
    if (!logs || logs.length === 0) {
      return res.status(404).json({ message: `No se encontraron síntomas para el paciente con ID ${patientId}` });
    }
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los síntomas del paciente', error: error.message });
  }
};

export const getAllSymptomLogs = async (req, res) => {
  try {
    const logs = await SymptomLog.find().sort({ loggedAt: -1 });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener todos los registros de síntomas', error: error.message });
  }
};