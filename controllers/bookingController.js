import {
    createBooking,
    getBookingById
} from '../models/bookingModel.js'

export const createBookingController = async (req, res) => {
    try {
        const {
            userId,
            handymanId,
            serviceId,
            bookingDate,
            bookingTime,
            serviceAddress,
            notes
        } = req.body

        if (
            !userId ||
            !handymanId ||
            !serviceId ||
            !bookingDate ||
            !bookingTime ||
            !serviceAddress
        ) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required booking information'
            })
        }

        const bookingId = await createBooking({
            userId,
            handymanId,
            serviceId,
            bookingDate,
            bookingTime,
            serviceAddress,
            notes
        })

        res.status(201).json({
            success: true,
            message: 'Booking created successfully',
            bookingId
        })

    } catch (error) {
        console.error('Create booking error:', error)

        res.status(500).json({
            success: false,
            message: 'Failed to create booking'
        })
    }
}

export const getBookingController = async (req, res) => {
    try {
        const { id } = req.params

        const booking = await getBookingById(id)

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            })
        }

        res.json({
            success: true,
            booking
        })

    } catch (error) {
        console.error('Get booking error:', error)

        res.status(500).json({
            success: false,
            message: 'Failed to retrieve booking'
        })
    }
}