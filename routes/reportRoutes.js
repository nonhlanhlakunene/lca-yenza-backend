import express from 'express'

import {
    createReportController,
    getAllReportsController,
    getReportController,
    updateReportStatusController
} from '../controllers/reportController.js'

const router = express.Router()

router.post('/', createReportController)

router.get('/', getAllReportsController)

router.get('/:id', getReportController)

router.patch('/:id', updateReportStatusController)

export default router