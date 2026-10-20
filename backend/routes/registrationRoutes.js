import express from 'express';
import { registerForActivity, getParticipantsByActivity } from '../controllers/registrationController.js';

const router = express.Router();

router.post('/', registerForActivity);
router.get('/activity/:activityId', getParticipantsByActivity);

export default router;
