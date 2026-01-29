import express from 'express';
import multer from 'multer';
import { extractTextFromPDF, extractTestsFromText } from '../services/pdfService.js';
import { analyzeLabResults } from '../services/mistralService.js';
import fs from 'fs/promises';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'lab-report-' + uniqueSuffix + '.pdf');
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Seuls les fichiers PDF sont acceptés'));
        }
    }
});

/**
 * POST /api/analyze-pdf
 * Analyze a PDF lab report
 */
router.post('/analyze-pdf', upload.single('file'), async (req, res) => {
    let filePath = null;

    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Aucun fichier fourni' });
        }

        filePath = req.file.path;

        // Extract text from PDF
        const pdfText = await extractTextFromPDF(filePath);

        // Try to extract structured test data
        const extractedTests = extractTestsFromText(pdfText);

        if (extractedTests.length === 0) {
            return res.status(400).json({
                error: 'Impossible d\'extraire des données de test du PDF. Veuillez utiliser la saisie manuelle.'
            });
        }

        // Analyze with Mistral AI
        const analysis = await analyzeLabResults(extractedTests, pdfText.substring(0, 500));

        // Clean up uploaded file
        await fs.unlink(filePath);

        res.json({
            success: true,
            extractedTests,
            analysis
        });
    } catch (error) {
        console.error('Error analyzing PDF:', error);

        // Clean up file if it exists
        if (filePath) {
            try {
                await fs.unlink(filePath);
            } catch (unlinkError) {
                console.error('Error deleting file:', unlinkError);
            }
        }

        res.status(500).json({
            error: error.message || 'Erreur lors de l\'analyse du PDF'
        });
    }
});

/**
 * POST /api/analyze-manual
 * Analyze manually entered lab results
 */
router.post('/analyze-manual', async (req, res) => {
    try {
        const { tests } = req.body;

        if (!tests || !Array.isArray(tests) || tests.length === 0) {
            return res.status(400).json({
                error: 'Données de test invalides ou manquantes'
            });
        }

        // Validate each test has required fields
        for (const test of tests) {
            if (!test.name || test.value === undefined || test.value === null || test.value === '') {
                return res.status(400).json({
                    error: 'Chaque test doit avoir un nom et une valeur'
                });
            }
        }

        // Analyze with Mistral AI
        const analysis = await analyzeLabResults(tests);

        res.json({
            success: true,
            analysis
        });
    } catch (error) {
        console.error('Error analyzing manual data:', error);
        res.status(500).json({
            error: error.message || 'Erreur lors de l\'analyse des données'
        });
    }
});

export default router;
