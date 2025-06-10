// symptom-tracker-monorepo/services/patients-service/src/routes/patientRoutes.js
import { Router } from 'express';
import {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient
} from '../controllers/patientController.js';

const router = Router();

router.post('/patients', createPatient);
router.get('/patients', getAllPatients);
router.get('/patients/:id', getPatientById);
router.put('/patients/:id', updatePatient);
router.delete('/patients/:id', deletePatient);

export default router;