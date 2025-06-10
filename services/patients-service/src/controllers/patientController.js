// symptom-tracker-monorepo/services/patients-service/src/controllers/patientController.js
import Patient from '../models/Patient.js';

// Create a new patient
export const createPatient = async (req, res) => {
  try {
    const { firstName, lastName, dateOfBirth, email, phoneNumber, address } = req.body;
    const newPatient = new Patient({ firstName, lastName, dateOfBirth, email, phoneNumber, address });
    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (error) {
    if (error.code === 11000) { // Duplicate error (email)
      return res.status(400).json({ message: 'El email proporcionado ya está registrado.', error: error.keyValue });
    }
    res.status(400).json({ message: 'Error al crear el paciente', error: error.message, details: error.errors });
  }
};

// Get all patients
export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los pacientes', error: error.message });
  }
};

// Get a patient by ID
export const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Paciente no encontrado' });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el paciente', error: error.message });
  }
};

// Update a patient
export const updatePatient = async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedPatient) {
      return res.status(404).json({ message: 'Paciente no encontrado para actualizar' });
    }
    res.status(200).json(updatedPatient);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Error al actualizar: el email proporcionado ya está en uso por otro paciente.', error: error.keyValue });
    }
    res.status(400).json({ message: 'Error al actualizar el paciente', error: error.message, details: error.errors });
  }
};

// Delete a patient
export const deletePatient = async (req, res) => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
    if (!deletedPatient) {
      return res.status(404).json({ message: 'Paciente no encontrado para eliminar' });
    }
    // Consider deleting associated symptoms if necessary (would be done in symptoms-service or via events)
    res.status(200).json({ message: 'Paciente eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el paciente', error: error.message });
  }
};