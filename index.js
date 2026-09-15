import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/db.js'

// Initialize configurations
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
// const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Your first API test route
app.get('/', (req, res) => {
    res.send('Your lca-yenza-backend server is running successfully with ES Modules!');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running smoothly on port ${PORT}`);
});
