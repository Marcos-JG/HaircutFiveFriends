'use strict';

import express from 'express';
import { createBarber, getBarbers, getBarberById, updateBarber, deleteBarber } from './barber.controller.js';
import { uploadProfilePicture } from '../../middlewares/file-uploader.js';
import { validateCreateBarber, validateUpdateBarber } from '../../middlewares/barber-validator.js';

const router = express.Router();

router.post('/', uploadProfilePicture.single('profilePicture'), validateCreateBarber, createBarber);
router.get('/', getBarbers);
router.get('/:id', getBarberById);
router.put('/:id', uploadProfilePicture.single('profilePicture'), validateUpdateBarber, updateBarber);
router.delete('/:id', deleteBarber);

export default router;
