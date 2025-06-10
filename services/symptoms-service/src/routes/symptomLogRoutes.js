// symptom-tracker-monorepo/services/symptoms-service/src/routes/symptomLogRoutes.js
import { Router } from 'express';
import { createSymptomLog, getSymptomsByPatientId, getAllSymptomLogs } from '../controllers/symptomLogController.js';

const router = Router();

router.post('/symptoms', createSymptomLog);
router.get('/symptoms/patient/:patientId', getSymptomsByPatientId);
router.get('/symptoms', getAllSymptomLogs); // Route to get all symptoms

export default router;