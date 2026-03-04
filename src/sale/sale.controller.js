'use strict'

import Sale from './sale.model.js'
import Detail from '../detailSale/detail.model.js'
import Product from '../product/product.model.js'
import Service from '../service/service.model.js'
import increasePointsForSale from '../../middlewares/pointPerSale.js'

export const createSale = async (req, res) => {
    try {
        const saleData = { ...(req.body || {}) }

        const normalizeDetailIds = (input) => {
            if (!input) return []

            if (Array.isArray(input)) {
                return input.flatMap((item) => normalizeDetailIds(item))
            }

            if (typeof input === 'string') {
                const trimmed = input.trim()
                if (!trimmed) return []

                try {
                    const parsed = JSON.parse(trimmed)
                    return normalizeDetailIds(parsed)
                } catch (error) {
                    return trimmed
                        .split(',')
                        .map((value) => value.replace(/[\[\]"'{}]/g, '').trim())
                        .filter(Boolean)
                }
            }

            return [input]
        }

        if (!saleData.clientId && req.user && req.user.uid) {
            saleData.clientId = req.user.uid
        }

        if (typeof saleData.clientId === 'string') {
            saleData.clientId = saleData.clientId.replace(/[,\s]+$/g, '').trim()
        }

        const detailIds = normalizeDetailIds(saleData.detailId)
        saleData.detailId = detailIds

        if (!detailIds || detailIds.length === 0) {
            return res.status(400).json({ success: false, message: 'Detail IDs are required' })
        }

        const details = await Detail.find({ _id: { $in: detailIds } })
        if (!details || details.length === 0) {
            return res.status(404).json({ success: false, message: 'Details not found' })
        }

        let total = 0
        for (const detail of details) {
            const quantity = Number(detail.quantity) || 0
            if (quantity <= 0) continue

            if (detail.detailType === 'SERVICE') {
                const service = await Service.findById(detail.referenceId).select('price')
                if (!service) {
                    return res.status(404).json({ success: false, message: 'Service reference not found' })
                }
                total += Number(service.price) * quantity
            } else if (detail.detailType === 'PRODUCT') {
                const product = await Product.findById(detail.referenceId).select('price')
                if (!product) {
                    return res.status(404).json({ success: false, message: 'Product reference not found' })
                }
                total += Number(product.price) * quantity
            } else {
                return res.status(400).json({ success: false, message: 'Invalid detail type' })
            }
        }

    saleData.total = total
    const pointsToAdd = Number((total * 0.1).toFixed(2))
    saleData.pointsMessage = `Se te agregaron ${pointsToAdd} puntos a tu cuenta`

        const sale = new Sale(saleData)
        await sale.save()

        await increasePointsForSale({
            clientId: sale.clientId,
            detailIds: sale.detailId,
            saleTotal: sale.total
        })

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
        const sales = await Sale.find()
            .populate('clientId')
            .populate('detailId')
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

        const sales = await Sale.find({ clientId })
            .populate('clientId')
            .populate('detailId')
        return res.status(200).json({ success: true, sales })

    } catch (err) {
        console.error(err)
        return res.status(500).json({ success: false, message: 'Error getting sales', err })
    }
}

export const getSaleById = async (req, res) => {
    try {
        const { id } = req.params
        const sale = await Sale.findById(id)
            .populate('clientId')
            .populate('detailId')
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


