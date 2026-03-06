'use strict'

import { Router } from 'express'
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from './product.controller.js'
import { uploadProfilePicture } from '../../middlewares/file-uploader.js'

const router = Router()

router.post('/create', uploadProfilePicture.single('image'), createProduct)
router.get('/', getProducts)
router.get('/:id', getProductById)
router.put('/:id', uploadProfilePicture.single('image'), updateProduct)
router.delete('/:id', deleteProduct)

export default router