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
import { uploadProfilePicture } from '../../middlewares/file-uploader.js'

const router = Router()

router.post('/create', uploadProfilePicture.none(), createDetail)

router.get('/sale/:saleId', getDetailsBySale)

router.get('/', getDetails)

router.put('/:id', updateDetail)

router.delete('/:id', deleteDetail)

router.get('/:id', getDetailById)

export default router
