'use strict'

import { Router } from 'express'
import { uploadProfilePicture } from '../../middlewares/file-uploader.js'
import { asyncHandlerWithCleanup } from '../../middlewares/cleanup-upload-on-error.js'
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from './product.controller.js'

const router = Router()

// Use Cloudinary-backed multer instance. Accept form-data with a single file field 'image' or JSON for create/update
router.post('/create', uploadProfilePicture.single('image'), asyncHandlerWithCleanup(createProduct))
router.get('/', getProducts)
router.get('/:id', getProductById)
router.put('/:id', uploadProfilePicture.single('image'), asyncHandlerWithCleanup(updateProduct))
router.delete('/:id', deleteProduct)

export default router