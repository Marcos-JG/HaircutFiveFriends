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
import { uploadFieldImage } from '../../middlewares/file-uploader.js'

const router = Router()

router.post('/create', uploadFieldImage.none(), createDetail)

router.get('/sale/:saleId', getDetailsBySale)

router.get('/', getDetails)

router.get('/:id', getDetailById)

router.put('/:id', updateDetail)

router.delete('/:id', deleteDetail)

export default router
