import db from '../config/db.js'

export const createReport = async ({
    reporterId,
    reportedUserId,
    bookingId,
    reason,
    description
}) => {
    const [result] = await db.query(
       `INSERT INTO reports (reporter_id, reported_user_id, booking_id, reason, description) 
        VALUES (?, ?, ?, ?, ?)`,
        [reporterId, reportedUserId, bookingId, reason, description]
    )   
    return result.insertId
}

export const getAllReports = async () => {
    const [reports] = await db.query(
        `SELECT * FROM reports ORDER BY created_at DESC`
    )

    return reports
}

export const getReportById = async (id) => {
    const [rows] = await db.query(
        `SELECT * FROM reports WHERE id = ?`,
        [id]
    )

    return rows[0]
}

export const updateReportStatus = async (id, status) => {
    const [result] = await db.query(
        `UPDATE reports SET status = ? WHERE id = ?`,
        [status, id]
    )

    return result.affectedRows
}