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
import { uploadProfilePicture } from '../../middlewares/file-uploader.js'
import requireAddressForDomicilio from '../../middlewares/requireAddressForDomicilio.js'

const router = Router()

router.post('/create', uploadProfilePicture.none(), requireAddressForDomicilio, createSale)

router.get('/my-sales', getMySales)

router.get('/', getSales)

router.put('/:id', updateSale)

router.delete('/:id', deleteSale)

router.get('/:id', getSaleById)


export default router
