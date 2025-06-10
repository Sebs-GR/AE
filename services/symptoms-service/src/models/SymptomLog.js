// symptom-tracker-monorepo/services/symptoms-service/src/models/SymptomLog.js
import mongoose from 'mongoose';

const SymptomLogSchema = new mongoose.Schema({
  patientId: { // Reference to the patient ID in the patients service
    type: mongoose.Schema.Types.ObjectId, // Or String if you won't use populate directly between services
    ref: 'Patient', // This is conceptual, existence validation would be at the application level
    required: [true, 'El ID del paciente es obligatorio'],
  },
  symptomDescription: {
    type: String,
    required: [true, 'La descripción del síntoma es obligatoria'],
    trim: true,
  },
  severity: {
    type: Number,
    required: [true, 'La severidad es obligatoria'],
    min: 1,
    max: 10, // Scale from 1 to 10, for example
  },
  notes: {
    type: String,
    trim: true,
  },
  loggedAt: {
    type: Date,
    default: Date.now,
  },
});

const SymptomLog = mongoose.model('SymptomLog', SymptomLogSchema);
export default SymptomLog;