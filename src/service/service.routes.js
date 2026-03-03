'use strict';

import express from 'express';
import { 
    createService, 
    updateService,
    getAllServices,
    deleteService,
    getServiceById,
    getServicesByName,
    getServicesByStatus 
} from './service.controller.js';

const router = express.Router();

// Rutas principales
router.post('/crear', createService);                    // POST - Crear servicio
router.get('/obtener', getAllServices);                 // GET - Obtener todos
router.get('/obtener/:id', getServiceById);             // GET - Obtener por ID
router.put('/actualizar/:id', updateService);           // PUT - Actualizar servicio
router.delete('/eliminar/:id', deleteService);          // DELETE - Eliminar servicio

// Rutas de filtrado
router.get('/estado/:status', getServicesByStatus);     // GET - Filtrar por estado
router.get('/tipo/:name', getServicesByName);           // GET - Filtrar por tipo de servicio

export default router;