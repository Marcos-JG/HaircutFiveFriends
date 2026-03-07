'use strict'

import { Router } from 'express'
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getRedeemableProducts
} from './product.controller.js'
import { uploadProfilePicture } from '../../middlewares/file-uploader.js'
import {
    validateCreateProduct,
    validateProductId,
    validateUpdateProduct
} from '../../middlewares/product-validator.js'

const router = Router()

router.post('/create', uploadProfilePicture.single('image'), validateCreateProduct, createProduct)
router.get('/', getProducts)
router.get('/redeemable', getRedeemableProducts)
router.get('/:id', validateProductId, getProductById)
router.put('/:id', uploadProfilePicture.single('image'), validateProductId, validateUpdateProduct, updateProduct)
router.delete('/:id', validateProductId, deleteProduct)

export default router