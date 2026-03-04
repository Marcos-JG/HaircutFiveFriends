'use strict';

import express from 'express';
import multer from 'multer';
import { createFavorite, getFavorites, getFavoriteById, updateFavorite, deleteFavorite } from './favorites.controller.js';

const router = express.Router();
const upload = multer();

router.post('/', upload.none(), createFavorite);
router.get('/', getFavorites);
router.get('/:id', getFavoriteById);
router.put('/:id', upload.none(), updateFavorite);
router.delete('/:id', deleteFavorite);

export default router;
