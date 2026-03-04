'use strict';

import express from 'express';
import { createClient, getClients, getClientById, updateClient, deleteClient } from './client.controller.js';
import { uploadProfilePicture } from '../../middlewares/file-uploader.js';
import { validateCreateClient, validateUpdateClient } from '../../middlewares/client-validator.js';

const router = express.Router();

router.post('/', uploadProfilePicture.single('profilePicture'), validateCreateClient, createClient);
router.get('/', getClients);
router.get('/:id', getClientById);
router.put('/:id', uploadProfilePicture.single('profilePicture'), validateUpdateClient, updateClient);
router.delete('/:id', deleteClient);

export default router;
