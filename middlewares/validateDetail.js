'use strict'

const validateDetail = async function(next) {
    try {
        if (!this.saleId) {
            throw new Error('Sale ID is required')
        }

        if (!this.productId) {
            throw new Error('Product ID is required')
        }

        if (!this.quantity || this.quantity <= 0) {
            throw new Error('Quantity must be a positive number')
        }

        if (!this.total || this.total <= 0) {
            throw new Error('Total must be a positive number')
        }

        if (!Number.isInteger(this.quantity)) {
            throw new Error('Quantity must be an integer')
        }

        next()
    } catch (error) {
        next(error)
    }
}

export default validateDetail
