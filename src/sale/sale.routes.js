'use strict'

import { Router } from 'express'
import {
    createSale,
    getMySales,
    getSales,
    getSaleById,
    updateSale,
    deleteSale
} from './sale.controller.js'
import { uploadFieldImage } from '../../middlewares/file-uploader.js'
import requireAddressForDomicilio from '../../middlewares/requireAddressForDomicilio.js'

const router = Router()

router.post('/create', uploadFieldImage.none(), requireAddressForDomicilio, createSale)

router.get('/my-sales', getMySales)

router.get('/', getSales)

router.get('/:id', getSaleById)

// Actualizar venta
router.put('/:id', updateSale)

// Eliminar venta
router.delete('/:id', deleteSale)

export default router
