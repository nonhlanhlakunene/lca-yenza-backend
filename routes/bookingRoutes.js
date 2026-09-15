import express from 'express'

import {
    createBookingController,
    getBookingController
} from '../controllers/bookingController.js'

const router = express.Router()

router.post('/', createBookingController)

router.get('/:id', getBookingController)

export default router