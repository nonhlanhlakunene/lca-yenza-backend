import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import db from './config/db.js';
// import bookingRoutes from './routes/bookingRoutes.js'; // ⚠️ match your actual filename

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
//app.use('/api/services', servicesRoutes);
app.get('/', (req, res) => {
    res.send('Your backend server is running successfully!');
});

app.get('/api/health', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT 1 AS connected');

        res.json({
            success: true,
            database: rows[0].connected === 1
        });
    } catch (error) {
        console.error('Database connection failed', error);

        res.status(500).json({
            success: false,
            database: false
        });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running smoothly on port ${PORT}`);
});