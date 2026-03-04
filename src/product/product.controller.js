'use strict'

import Product from './product.model.js'
import { cloudinary } from '../../middlewares/file-uploader.js'

// Crear producto
export const createProduct = async (req, res) => {
    try {
        // If a file was uploaded with field 'image' (Cloudinary storage), attach its secure URL to the product
        if (req.file) {
            // multer-storage-cloudinary exposes the uploaded file URL in `req.file.path`
            req.body.image = req.file.path || null
        }

        const product = new Product(req.body)
        await product.save()

        return res.status(201).json({
            success: true,
            message: 'Producto creado exitosamente',
            data: product
        })

    } catch (error) {
        // Si hubo un archivo subido, eliminarlo de Cloudinary para evitar archivos huérfanos
        if (req.file && req.file.filename) {
            try {
                await cloudinary.uploader.destroy(req.file.filename)
                console.log('Imagen eliminada de Cloudinary tras error en create product:', req.file.filename)
            } catch (destroyErr) {
                console.error('Error al eliminar imagen de Cloudinary tras fallo en producto:', destroyErr)
            }
        }

        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: 'ID de producto ya existe'
            })
        }

        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// Obtener todos
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find()

        return res.status(200).json({
            success: true,
            data: products
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// Obtener por ID
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params

        const product = await Product.findById(id)
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            })
        }

        return res.status(200).json({
            success: true,
            data: product
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// Actualizar
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params

        // If a file was uploaded with field 'image' (Cloudinary storage), attach its secure URL to the product
        if (req.file) {
            req.body.image = req.file.path || null
        }

        const product = await Product.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        )

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Producto actualizado',
            data: product
        })

    } catch (error) {
        // Si hubo un archivo subido, eliminarlo de Cloudinary para evitar archivos huérfanos
        if (req.file && req.file.filename) {
            try {
                await cloudinary.uploader.destroy(req.file.filename)
                console.log('Imagen eliminada de Cloudinary tras error en update product:', req.file.filename)
            } catch (destroyErr) {
                console.error('Error al eliminar imagen de Cloudinary tras fallo en update product:', destroyErr)
            }
        }

        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// Eliminar
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params

        const product = await Product.findByIdAndDelete(id)

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Producto eliminado'
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}