import express from 'express';
import { downloadInvoice } from './invoice.controller.js';

const router = express.Router();

router.get('/:id/pdf', downloadInvoice);

export default router;