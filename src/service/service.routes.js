'use strict';

import express from 'express';
import multer from 'multer';
import { 
    createService, 
    updateService,
    getAllServices,
    deleteService,
    getServiceById,
    getServicesByName,
    getServicesByStatus 
} from './service.controller.js';
import { validateCreateService, validateUpdateService } from '../../middlewares/service-validator.js';

const router = express.Router();
const parseFormData = multer().none();

// Rutas principales
router.post('/crear', parseFormData, validateCreateService, createService);    // POST - Crear servicio
router.get('/obtener', getAllServices);                 // GET - Obtener todos
router.get('/obtener/:id', getServiceById);             // GET - Obtener por ID
router.put('/actualizar/:id', parseFormData, validateUpdateService, updateService); // PUT - Actualizar servicio
router.delete('/eliminar/:id', deleteService);          // DELETE - Eliminar servicio

// Rutas de filtrado
router.get('/estado/:status', getServicesByStatus);     // GET - Filtrar por estado
router.get('/tipo/:name', getServicesByName);           // GET - Filtrar por tipo de servicio

export default router;