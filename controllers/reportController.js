import {
    createReport,
    getAllReports,
    getReportById,
    updateReportStatus
} from '../models/reportModel.js'

export const createReportController = async (req, res) => {
    try {
        const {
            reporterId,
            reportedUserId,
            bookingId,
            reason,
            description
        } = req.body

        if (!reporterId || !reportedUserId || !bookingId || !reason || !description) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required report information'
            })
        }

        const reportId = await createReport({
            reporterId,
            reportedUserId,
            bookingId,
            reason,
            description
        })

        res.status(201).json({
            success: true,
            message: 'Report submitted successfully',
            reportId
        })

    } catch (error) {
        console.error('Create report error:', error)

        res.status(500).json({
            success: false,
            message: 'Failed to submit report'
        })
    }
}

export const getAllReportsController = async (req, res) => {
    try {
        const reports = await getAllReports()

        res.json({
            success: true,
            reports
        })

    } catch (error) {
        console.error('Get reports error:', error)

        res.status(500).json({
            success: false,
            message: 'Failed to retrieve reports'
        })
    }
}

export const getReportController = async (req, res) => {
    try {
        const { id } = req.params

        const report = await getReportById(id)

        if (!report) {
            return res.status(404).json({
                success: false,
                message: 'Report not found'
            })
        }

        res.json({
            success: true,
            report
        })

    } catch (error) {
        console.error('Get report error:', error)

        res.status(500).json({
            success: false,
            message: 'Failed to retrieve report'
        })
    }
}

export const updateReportStatusController = async (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.body

        const allowedStatuses = ['pending', 'under_review', 'resolved', 'dismissed']

        if (!status || !allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: `status must be one of: ${allowedStatuses.join(', ')}`
            })
        }

        const affectedRows = await updateReportStatus(id, status)

        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Report not found'
            })
        }

        res.json({
            success: true,
            message: 'Report status updated'
        })

    } catch (error) {
        console.error('Update report status error:', error)

        res.status(500).json({
            success: false,
            message: 'Failed to update report status'
        })
    }
}