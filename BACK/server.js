import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import analysisRoutes from './routes/analysis.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', analysisRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'LabIA Backend API is running',
        mistralConfigured: !!process.env.MISTRAL_API_KEY
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: err.message || 'Une erreur interne du serveur s\'est produite'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 LabIA Backend server running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);

    if (!process.env.MISTRAL_API_KEY) {
        console.warn('⚠️  WARNING: MISTRAL_API_KEY not configured. Please add it to your .env file');
    } else {
        console.log('✅ Mistral AI configured');
    }
});

export default app;
