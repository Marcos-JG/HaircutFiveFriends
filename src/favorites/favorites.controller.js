'use strict';

import Favorites from './favorites.model.js';

export const createFavorite = async (req, res) => {
    try {
        const favorite = new Favorites(req.body);
        await favorite.save();
        return res.status(201).json({ success: true, data: favorite });
    } catch (error) {
        // handle duplicate key from unique index
        if (error.code === 11000) {
            return res.status(409).json({ success: false, message: 'Favorite already exists' });
        }
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const getFavorites = async (req, res) => {
    try {
        const { clientId, typeFavorite } = req.query;
        const filter = {};
        if (clientId) filter.clientId = clientId;
        if (typeFavorite) filter.typeFavorite = typeFavorite;

        const favorites = await Favorites.find(filter).populate('clientId');
        return res.status(200).json({ success: true, data: favorites });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const getFavoriteById = async (req, res) => {
    try {
        const { id } = req.params;
        const favorite = await Favorites.findById(id).populate('clientId');
        if (!favorite) return res.status(404).json({ success: false, message: 'Favorite not found' });
        return res.status(200).json({ success: true, data: favorite });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const updateFavorite = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Favorites.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) return res.status(404).json({ success: false, message: 'Favorite not found' });
        return res.status(200).json({ success: true, data: updated });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ success: false, message: 'Favorite already exists' });
        }
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const deleteFavorite = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Favorites.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ success: false, message: 'Favorite not found' });
        return res.status(200).json({ success: true, data: deleted });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}
