'use strict';

import Client from './client.model.js';

export const createClient = async (req, res) => {
    try {
        const client = new Client(req.body);
        await client.save();
        return res.status(201).json({ success: true, data: client });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const getClients = async (req, res) => {
    try {
        const clients = await Client.find();
        return res.status(200).json({ success: true, data: clients });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const getClientById = async (req, res) => {
    try {
        const { id } = req.params;
        const client = await Client.findById(id);
        if (!client) return res.status(404).json({ success: false, message: 'Client not found' });
        return res.status(200).json({ success: true, data: client });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        // Sólo permitir que el cliente edite estos campos
        const allowed = ['name', 'phone', 'email', 'profilePicture', 'faceshape'];
        const updates = {};
        allowed.forEach((field) => {
            if (Object.prototype.hasOwnProperty.call(req.body, field)) {
                updates[field] = req.body[field];
            }
        });

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ success: false, message: 'No editable fields provided' });
        }

        const updated = await Client.findByIdAndUpdate(id, updates, { new: true });
        if (!updated) return res.status(404).json({ success: false, message: 'Client not found' });
        return res.status(200).json({ success: true, data: updated });
    } catch (error) {
        // Manejar error de índice único (email duplicado)
        if (error && error.code === 11000) {
            return res.status(409).json({ success: false, message: 'Email already in use' });
        }
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const deleteClient = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Client.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ success: false, message: 'Client not found' });
        return res.status(200).json({ success: true, data: deleted });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}
