const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Analyze a PDF file
 * @param {File} file - The PDF file to analyze
 * @returns {Promise<Object>} Analysis results
 */
export async function analyzePDF(file) {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch(`${API_BASE_URL}/api/analyze-pdf`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Erreur lors de l\'analyse du PDF');
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

/**
 * Analyze manually entered test data
 * @param {Array} tests - Array of test objects with name, value, and optional unit
 * @returns {Promise<Object>} Analysis results
 */
export async function analyzeManual(tests) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/analyze-manual`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tests }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Erreur lors de l\'analyse des données');
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

/**
 * Check if the backend is healthy
 * @returns {Promise<Object>} Health status
 */
export async function checkHealth() {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        return await response.json();
    } catch (error) {
        console.error('Health Check Error:', error);
        return { status: 'error', message: 'Backend unreachable' };
    }
}
