'use strict'

import { Router } from 'express'
import {
    createDetail,
    getDetails,
    getDetailsBySale,
    getDetailById,
    updateDetail,
    deleteDetail
} from './detail.controller.js'


const router = Router()

router.post('/create', createDetail)

router.get('/sale/:saleId', getDetailsBySale)

router.get('/', getDetails)

router.put('/:id', updateDetail)

router.delete('/:id', deleteDetail)

router.get('/:id', getDetailById)

export default router
