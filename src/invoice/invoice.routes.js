import express from 'express'
import { downloadInvoice } from './invoice.controller.js'

const router = express.Router()

router.get('/pdf/:saleId', downloadInvoice)

export default router