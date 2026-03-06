'use strict'

import { Router } from 'express'
import {
    createSale,
    addDetailsToSale,
    getMySales,
    getSales,
    getSaleById,
    updateSale,
    deleteSale
} from './sale.controller.js'
import { uploadProfilePicture } from '../../middlewares/file-uploader.js'
import { validateSaleRequest } from '../../middlewares/sale-validator.js'
import requireAddressForDomicilio from '../../middlewares/requireAddressForDomicilio.js'

const router = Router()

router.post('/create', uploadProfilePicture.none(), validateSaleRequest, requireAddressForDomicilio, createSale)

router.get('/my-sales', getMySales)

router.get('/', getSales)

router.put('/:id', uploadProfilePicture.none(), updateSale)

router.put('/:id/details', uploadProfilePicture.none(), addDetailsToSale)

router.delete('/:id', deleteSale)

router.get('/:id', getSaleById)


export default router
