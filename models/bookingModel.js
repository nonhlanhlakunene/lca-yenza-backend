import db from '../config/db.js'

export const createBooking = async ({
    userId,
    handymanId,
    serviceId,
    bookingDate,
    bookingTime,
    serviceAddress,
    notes
}) => {
    const [result] = await db.execute(
        `INSERT INTO bookings
        (user_id, handyman_id, service_id, booking_date, booking_time, service_address, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            userId,
            handymanId,
            serviceId,
            bookingDate,
            bookingTime,
            serviceAddress,
            notes || null
        ]
    )

    return result.insertId

}



export const getBookingById = async (bookingId) => {
    const [rows] = await db.execute(
        `SELECT
            b.*,
            h.name AS handyman_name,
            s.name AS service_name
        FROM bookings b
        JOIN handymen h ON b.handyman_id = h.id
        JOIN services s ON b.service_id = s.id
        WHERE b.id = ?`
        [bookingId]
    )
    return rows[0]
}

