import pdf from 'pdf-parse';
import fs from 'fs/promises';

/**
 * Extract text from a PDF file
 * @param {string} filePath - Path to the PDF file
 * @returns {Promise<string>} Extracted text content
 */
export async function extractTextFromPDF(filePath) {
    try {
        const dataBuffer = await fs.readFile(filePath);
        const data = await pdf(dataBuffer);

        // Keep original formatting to better detect patterns
        return data.text;
    } catch (error) {
        console.error('PDF Parsing Error:', error);
        throw new Error(`Erreur lors de la lecture du PDF: ${error.message}`);
    }
}

/**
 * Try to extract structured test data from PDF text
 * Improved to handle French medical lab report formats with reference ranges
 * @param {string} text - Extracted PDF text
 * @returns {Array} Array of potential test objects
 */
export function extractTestsFromText(text) {
    const tests = [];
    const lines = text.split('\n');

    console.log(`📄 PDF has ${lines.length} lines, extracting tests...`);

    // Enhanced patterns to also capture reference ranges
    const testPatterns = [
        // Pattern 1: Test with value and reference  "Test .......... value unit    > ref" or "ref1 à ref2"
        {
            regex: /^([A-Za-zÀ-ÿ\s\(\)À-ž']+?)\s*\.{3,}\s*(\d+[,.]?\d*)\s*(mg\/L|g\/dL|g\/L|mmol\/L|µmol\/L|%|\/µL|U\/L|mL\/min\/1\.73m²|ml\/min)?\s*([><]\s*\d+[,.]?\d*|\d+[,.]?\d*\s*à\s*\d+[,.]?\d*|Inf\s*à\s*\d+[,.]?\d*)?/i,
            hasRef: true
        },
        // Pattern 2: Simple dots separator without reference
        {
            regex: /^([A-Za-zÀ-ÿ\s\(\)À-ž']+?)\s*\.{3,}\s*(\d+[,.]?\d*)\s*(mg\/L|g\/dL|g\/L|mmol\/L|µmol\/L|%|\/µL|U\/L)?/i,
            hasRef: false
        },
        // Pattern 3: Colon or dash separator
        {
            regex: /^([A-Za-zÀ-ÿ\s\(\)À-ž']+)\s*[:\-]\s*(\d+[,.]?\d*)\s*(mg\/L|g\/dL|g\/L|mmol\/L|µmol\/L|%|\/µL|U\/L)?/i,
            hasRef: false
        },
    ];

    // Words to exclude
    const excludeWords = ['valeur', 'référence', 'antériorités', 'prélevé', 'prescrit', 'demande', 'biochemie', 'marqueurs', 'inflammation', 'sérum', 'enzymatique', 'colorimétrie', 'abbott', 'lisses', 'potentiométrie'];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (!line || line.length < 5) continue;

        for (const pattern of testPatterns) {
            const match = line.match(pattern.regex);
            if (match) {
                const testName = match[1].trim();
                const value = match[2].replace(',', '.');
                const unit = match[3] || '';
                const refRaw = pattern.hasRef && match[4] ? match[4].trim() : null;

                const shouldExclude = excludeWords.some(word =>
                    testName.toLowerCase().includes(word)
                );

                if (!shouldExclude && testName.length > 2 && testName.length < 100) {
                    const testObj = {
                        name: testName,
                        value: value,
                        unit: unit
                    };

                    // Parse reference range
                    if (refRaw) {
                        testObj.referenceRange = refRaw.replace(',', '.');
                    }

                    tests.push(testObj);
                    console.log(`  ✓ Found: ${testName} = ${value} ${unit}${refRaw ? ` (ref: ${refRaw})` : ''}`);
                    break;
                }
            }
        }
    }

    // Remove duplicates based on name (case insensitive)
    const uniqueTests = tests.filter((test, index, self) =>
        index === self.findIndex((t) => t.name.toLowerCase().trim() === test.name.toLowerCase().trim())
    );

    console.log(`✅ PDF Extraction complete: Found ${uniqueTests.length} unique tests`);

    return uniqueTests;
}
