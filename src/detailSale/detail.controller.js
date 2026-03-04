'use strict'

import Detail from './detail.model.js'

export const createDetail = async (req, res) => {
    try {
        const detailData = { ...(req.body || {}) }

        const detail = new Detail(detailData)
        await detail.save()

        return res.status(201).json({
            success: true,
            message: 'Detail created successfully',
            detail
        })

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const getDetails = async (req, res) => {
    try {
        const details = await Detail.find()
            .populate('saleId')
            .populate('productId')
        return res.status(200).json({ success: true, details })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ success: false, message: 'Error getting details', err })
    }
}

export const getDetailsBySale = async (req, res) => {
    try {
        const { saleId } = req.params
        if (!saleId) {
            return res.status(400).json({ success: false, message: 'Sale ID is required' })
        }

        const details = await Detail.find({ saleId })
            .populate('saleId')
            .populate('productId')
        return res.status(200).json({ success: true, details })

    } catch (err) {
        console.error(err)
        return res.status(500).json({ success: false, message: 'Error getting details', err })
    }
}

export const getDetailById = async (req, res) => {
    try {
        const { id } = req.params
        const detail = await Detail.findById(id)
            .populate('saleId')
            .populate('productId')
        if (!detail) {
            return res.status(404).json({ success: false, message: 'Detail not found' })
        }
        return res.status(200).json({ success: true, detail })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ success: false, message: 'Error getting detail', err })
    }
}

export const updateDetail = async (req, res) => {
    try {
        const { id } = req.params
        const updateData = { ...(req.body || {}) }

        const detail = await Detail.findByIdAndUpdate(id, updateData, { new: true })
        if (!detail) {
            return res.status(404).json({ success: false, message: 'Detail not found' })
        }
        return res.status(200).json({ success: true, message: 'Detail updated', detail })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ success: false, message: 'Error updating detail', err })
    }
}

export const deleteDetail = async (req, res) => {
    try {
        const { id } = req.params
        const detail = await Detail.findByIdAndDelete(id)
        if (!detail) {
            return res.status(404).json({ success: false, message: 'Detail not found' })
        }
        return res.status(200).json({ success: true, message: 'Detail deleted' })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ success: false, message: 'Error deleting detail', err })
    }
}
