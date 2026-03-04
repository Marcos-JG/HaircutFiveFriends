'use strict';

import express from 'express';
import { createFavorite, getFavorites, getFavoriteById, updateFavorite, deleteFavorite } from './favorites.controller.js';

const router = express.Router();

router.post('/', createFavorite);
router.get('/', getFavorites);
router.get('/:id', getFavoriteById);
router.put('/:id', updateFavorite);
router.delete('/:id', deleteFavorite);

export default router;
