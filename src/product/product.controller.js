'use strict'

import Product from './product.model.js'

// Crear producto
export const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body)
        await product.save()

        return res.status(201).json({
            success: true,
            message: 'Producto creado exitosamente',
            data: product
        })

    } catch (error) {
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