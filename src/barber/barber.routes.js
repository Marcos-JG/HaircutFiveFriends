'use strict';

import express from 'express';
import { createBarber, getBarbers, getBarberById, updateBarber, deleteBarber } from './barber.controller.js';

const router = express.Router();

router.post('/', createBarber);
router.get('/', getBarbers);
router.get('/:id', getBarberById);
router.put('/:id', updateBarber);
router.delete('/:id', deleteBarber);

export default router;
