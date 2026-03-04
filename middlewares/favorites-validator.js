'use strict';

import mongoose from 'mongoose';
import Product from '../src/product/product.model.js';
import Service from '../src/service/service.model.js';
import Haircut from '../src/haircut/haircut.model.js';
import Barber from '../src/barber/barber.model.js';

// Middleware que valida que referenceId exista según typeFavorite
export const validateFavoriteReference = async (req, res, next) => {
  try {
    const { typeFavorite, referenceId } = req.body;

    if (!typeFavorite) {
      return res.status(400).json({ success: false, message: 'typeFavorite is required' });
    }

    if (!referenceId) {
      return res.status(400).json({ success: false, message: 'referenceId is required' });
    }

    // validar ObjectId
    if (!mongoose.Types.ObjectId.isValid(referenceId)) {
      return res.status(400).json({ success: false, message: 'referenceId must be a valid ObjectId' });
    }

    let Model = null;
    switch (typeFavorite) {
      case 'PRODUCT':
        Model = Product;
        break;
      case 'SERVICE':
        Model = Service;
        break;
      case 'HAIRCUT':
        Model = Haircut;
        break;
      case 'BARBER':
        Model = Barber;
        break;
      default:
        return res.status(400).json({ success: false, message: `Unsupported typeFavorite: ${typeFavorite}` });
    }

    const exists = await Model.findById(referenceId).lean();
    if (!exists) {
      return res.status(400).json({ success: false, message: `referenceId does not reference an existing ${typeFavorite.toLowerCase()}` });
    }

    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default validateFavoriteReference;
