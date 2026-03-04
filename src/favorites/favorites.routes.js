'use strict';

import express from 'express';
import multer from 'multer';
import { createFavorite, getFavorites, getFavoriteById, updateFavorite, deleteFavorite } from './favorites.controller.js';
import validateFavoriteReference from '../../middlewares/favorites-validator.js';

const router = express.Router();
const upload = multer();

router.post('/', upload.none(), validateFavoriteReference, createFavorite);
router.get('/', getFavorites);
router.get('/:id', getFavoriteById);
router.put('/:id', upload.none(), validateFavoriteReference, updateFavorite);
router.delete('/:id', deleteFavorite);

export default router;
