import express from 'express';
import { addSchool, listSchools } from '../controllers/schoolController.js';

const router = express.Router();

router.post('/add', addSchool);
router.get('/list', listSchools);

export default router;
