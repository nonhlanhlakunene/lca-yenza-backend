import {
    createBooking,
    getBookingById
} from '../models/bookingModel.js'

export const createBookingController = async (req, res) => {
    try {
        const {
            customerId,
            professionalId,
            serviceId,
            bookingDate,
            bookingTime,
            serviceAddress,
            city,
            province,
            postalCode,
            notes
        } = req.body

        if (
            !customerId ||
            !professionalId ||
            !serviceId ||
            !bookingDate ||
            !bookingTime ||
            !serviceAddress ||
            !city
        ) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required booking information'
            })
        }

        const bookingId = await createBooking({
            customerId,
            professionalId,
            serviceId,
            bookingDate,
            bookingTime,
            serviceAddress,
            city,
            province,
            postalCode,
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