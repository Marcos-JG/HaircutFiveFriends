'use strict'

import Sale from './sale.model.js'

export const createSale = async (req, res) => {
    try {
        const saleData = { ...(req.body || {}) }

        if (!saleData.clientId && req.user && req.user.uid) {
            saleData.clientId = req.user.uid
        }

        const sale = new Sale(saleData)
        await sale.save()

        return res.status(201).json({
            success: true,
            message: 'Sale created successfully',
            sale
        })

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const getSales = async (req, res) => {
    try {
        const sales = await Sale.find().populate('clientId')
        return res.status(200).json({ success: true, sales })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ success: false, message: 'Error getting sales', err })
    }
}

export const getMySales = async (req, res) => {
    try {
        const clientId = req.user && req.user.uid
        if (!clientId) {
            return res.status(401).json({ success: false, message: 'Unauthorized' })
        }

        const sales = await Sale.find({ clientId }).populate('clientId')
        return res.status(200).json({ success: true, sales })

    } catch (err) {
        console.error(err)
        return res.status(500).json({ success: false, message: 'Error getting sales', err })
    }
}

export const getSaleById = async (req, res) => {
    try {
        const { id } = req.params
        const sale = await Sale.findById(id).populate('clientId')
        if (!sale) {
            return res.status(404).json({ success: false, message: 'Sale not found' })
        }
        return res.status(200).json({ success: true, sale })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ success: false, message: 'Error getting sale', err })
    }
}

export const updateSale = async (req, res) => {
    try {
        const { id } = req.params
        const updateData = { ...(req.body || {}) }

        const sale = await Sale.findByIdAndUpdate(id, updateData, { new: true })
        if (!sale) {
            return res.status(404).json({ success: false, message: 'Sale not found' })
        }
        return res.status(200).json({ success: true, message: 'Sale updated', sale })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ success: false, message: 'Error updating sale', err })
    }
}

export const deleteSale = async (req, res) => {
    try {
        const { id } = req.params
        const sale = await Sale.findByIdAndDelete(id)
        if (!sale) {
            return res.status(404).json({ success: false, message: 'Sale not found' })
        }
        return res.status(200).json({ success: true, message: 'Sale deleted' })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ success: false, message: 'Error deleting sale', err })
    }
}
