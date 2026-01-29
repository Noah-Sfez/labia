import { Mistral } from '@mistralai/mistralai';
import dotenv from 'dotenv';

dotenv.config();

const client = new Mistral({
    apiKey: process.env.MISTRAL_API_KEY
});

/**
 * Analyze lab results using Mistral AI
 * @param {Array} tests - Array of test objects with name, value, unit, and optionally referenceRange
 * @param {string} additionalContext - Optional additional context from PDF
 * @returns {Promise<Object>} Analysis results
 */
export async function analyzeLabResults(tests, additionalContext = '') {
    try {
        const prompt = `Tu es un assistant médical expert qui analyse des résultats de laboratoire. 
Ton rôle est d'expliquer les résultats de manière claire et accessible, tout en rappelant que ces informations sont à but informatif uniquement.

IMPORTANT : Toutes tes explications doivent être écrites en FALC (Facile À Lire et à Comprendre).

Règles FALC à respecter :
- Utilise des phrases courtes (maximum 12-15 mots)
- Un seul message par phrase
- Utilise des mots simples du quotidien
- Si tu utilises un mot médical, explique-le immédiatement
- Utilise le présent de l'indicatif
- Privilégie la voix active
- Évite les négations quand possible
- Structure tes explications avec des listes à puces
- Parle directement au lecteur (vous/votre)

${additionalContext ? `Contexte additionnel du rapport:\n${additionalContext}\n\n` : ''}

Résultats de laboratoire à analyser:
${tests.map(test => {
            let line = `- ${test.name}: ${test.value} ${test.unit || ''}`;
            if (test.referenceRange) {
                line += ` (plage de référence: ${test.referenceRange})`;
            }
            return line;
        }).join('\n')}

IMPORTANT: Pour déterminer si un résultat est normal ou anormal:
1. Si une plage de référence est fournie, utilise-la OBLIGATOIREMENT
2. Si pas de plage de référence, utilise les valeurs médicales standard connues
3. Pour les valeurs avec ">" ou "<", respecte strictement ces limites

Exemples:
- Si HDL cholestérol = 0.95 mmol/L et référence > 1.30, alors c'est ANORMAL (trop bas)
- Si sodium = 138 mmol/L et référence 136 à 145, alors c'est NORMAL

Pour chaque test, fournis une explication en FALC :

Exemple de bonne explication FALC :
"Votre taux de cholestérol HDL est bas.
Le cholestérol HDL est le bon cholestérol.
Il protège votre cœur.
Un taux trop bas peut augmenter le risque de maladie du cœur.
Vous pouvez améliorer ce taux en faisant du sport régulièrement.
Vous pouvez aussi manger plus de poisson."

IMPORTANT: Réponds UNIQUEMENT avec un objet JSON valide (pas de markdown, pas de \`\`\`json) dans ce format exact:
{
  "summary": {
    "normalCount": <nombre de valeurs normales>,
    "abnormalCount": <nombre de valeurs anormales>,
    "overallMessage": "<message général encourageant en FALC sur l'ensemble des résultats>"
  },
  "results": [
    {
      "name": "<nom du test>",
      "value": "<valeur>",
      "status": "<normal|abnormal|borderline>",
      "explanation": "<explication détaillée en FALC - phrases courtes et mots simples>",
      "icon": "<emoji approprié>"
    }
  ]
}`;

        const response = await client.chat.complete({
            model: 'mistral-large-latest',
            messages: [
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.3,
            maxTokens: 2000
        });

        const content = response.choices[0].message.content;

        // Parse the JSON response
        let analysisResult;
        try {
            // Remove markdown code blocks if present
            const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            analysisResult = JSON.parse(cleanContent);
        } catch (parseError) {
            console.error('Failed to parse Mistral response:', content);
            throw new Error('Invalid response format from AI');
        }

        return analysisResult;
    } catch (error) {
        console.error('Mistral AI Error:', error);
        throw new Error(`Erreur lors de l'analyse IA: ${error.message}`);
    }
}
