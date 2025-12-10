const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const followRoutes = require('./routes/followRoutes');
const AppError = require('./utils/errors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4001;
const DB = process.env.DATABASE;

if (!DB) {
    console.error('FATAL ERROR: DATABASE environment variable is not defined.');
    process.exit(1);
}

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/v1', followRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
});

// Database Connection and Server Start
mongoose
    .connect(DB)
    .then(() => {
        console.log('DB connection successful');
        app.listen(PORT, () => {
            console.log(`Follow Service running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('DB Connection Failed:', err);
        process.exit(1);
    });
