import express from 'express';
import { downloadStatistics } from './statistics.controller.js';

const router = express.Router();

router.get('/pdf', downloadStatistics);

export default router; // 👈 ESTO ES LO QUE FALTA