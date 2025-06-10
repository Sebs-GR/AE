// symptom-tracker-monorepo/services/patients-service/src/models/Patient.js
import mongoose from 'mongoose';

const PatientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'El apellido es obligatorio'],
    trim: true,
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'La fecha de nacimiento es obligatoria'],
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Por favor, introduce un email válido'],
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to ensure email is saved in lowercase before validating uniqueness
PatientSchema.pre('save', async function(next) {
  if (this.isModified('email')) {
    this.email = this.email.toLowerCase();
  }
  next();
});

const Patient = mongoose.model('Patient', PatientSchema);

export default Patient;