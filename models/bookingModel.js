import db from '../config/db.js'

export const createBooking = async ({
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
}) => {
    const [result] = await db.execute(
        `INSERT INTO bookings
        (
            customer_id,
            professional_id,
            service_id,
            booking_date,
            booking_time,
            service_address,
            city,
            province,
            postal_code,
            notes
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            customerId,
            professionalId,
            serviceId,
            bookingDate,
            bookingTime,
            serviceAddress,
            city,
            province,
            postalCode,
            notes || null
        ]
    )

    return result.insertId

}



export const getBookingById = async (bookingId) => {
    const [rows] = await db.execute(
        `SELECT
            b.booking_id,
            b.customer_id,
            b.professional_id,
            b.service_id,
            b.booking_date,
            b.booking_time,
            b.service_address,
            b.city,
            b.province,
            b.postal_code,
            b.notes,
            b.status,
            b.created_at,
            b.updated_at,

            CONCAT(u.first_name, ' ', u.last_name) AS customer_name,

            p.bio AS professional_bio,
            p.hourly_rate AS professional_rate,

            u2.first_name AS professional_first_name,
            u2.last_name AS professional_last_name,

            s.name AS service_name

        FROM bookings b

        JOIN users u
            ON b.customer_id = u.user_id

        JOIN professionals p
            ON b.professional_id = p.professional_id

        JOIN users u2
            ON p.user_id = u2.user_id

        JOIN services s
            ON b.service_id = s.id

        WHERE b.booking_id = ?`,
        [bookingId]
    )
    return rows[0]
}

