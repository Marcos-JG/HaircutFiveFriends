import express from 'express';
import { generateStatisticsReport } from './statistics.controller.js';
const router = express.Router();

router.get('/pdf', generateStatisticsReport);

export default router; 