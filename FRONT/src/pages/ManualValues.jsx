import { useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import FooterAnalysis from "../components/FooterAnalisys";
import UiButton from "../components/UiButton";
import TestValueCard from "../components/TestValueCard";
import { analyzeManual } from "../services/api";

export default function ManualValues() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const initialTests = state?.tests || [];

  // State for all test values
  const [testValues, setTestValues] = useState(
    initialTests.map(testName => ({
      name: testName,
      value: "",
      unit: "",
      min: "",
      max: ""
    }))
  );

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);

  const handleValueChange = (index, newData) => {
    setTestValues(prev => {
      const newValues = [...prev];
      newValues[index] = { ...newValues[index], ...newData };
      return newValues;
    });
  };

  const handleAnalysis = async () => {
    // Validate that at least one value is entered
    const hasValues = testValues.some(t => t.value);

    if (!hasValues) {
      setError("Veuillez entrer au moins une valeur pour lancer l'analyse.");
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      // Prepare data for API
      const testsToAnalyze = testValues
        .filter(t => t.value) // Only send tests with values
        .map(t => {
          const testObj = {
            name: t.name,
            value: t.value,
            unit: t.unit || undefined
          };

          if (t.min || t.max) {
            testObj.referenceRange = `${t.min || '?'} - ${t.max || '?'}`;
          }

          return testObj;
        });

      const result = await analyzeManual(testsToAnalyze);

      if (result.success && result.analysis) {
        navigate("/results", {
          state: {
            analysisData: result.analysis,
            source: 'manual'
          }
        });
      } else {
        throw new Error("Format de réponse invalide");
      }
    } catch (err) {
      console.error("Erreur d'analyse:", err);
      setError(err.message || "Une erreur est survenue lors de l'analyse. Veuillez réessayer.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-raspberry-50 flex flex-col">
      <Header />

      <main
        id="main-content"
        role="main"
        aria-labelledby="page-title"
        tabIndex={-1}
        className="flex-1 flex justify-center px-4 pt-28 scroll-mt-28"
      >
        <div className="max-w-180 w-full flex flex-col gap-6">

          {/* En-tête */}
          <header className="flex items-start gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              aria-label="Revenir à la liste des tests"
              className="focus:outline-none focus:ring-2 focus:ring-raspberry-500 rounded"
              disabled={isAnalyzing}
            >
              <ArrowLeft
                className="text-raspberry-900"
                aria-hidden="true"
              />
            </button>

            <div>
              <h1
                id="page-title"
                className="text-base font-normal text-raspberry-900"
              >
                Entrez vos valeurs de test
              </h1>

              <p className="text-base font-normal text-raspberry-700">
                Renseignez les valeurs de votre rapport de laboratoire pour chaque test ajouté.
              </p>
            </div>
          </header>

          {error && (
            <div
              role="alert"
              className="bg-red-50 border-l-4 border-red-500 p-4 rounded text-red-700"
            >
              <p className="font-bold">Erreur</p>
              <p>{error}</p>
            </div>
          )}

          {/* Liste des tests */}
          <section
            aria-labelledby="test-values-title"
            className="flex flex-col gap-4"
          >
            <h2 id="test-values-title" className="sr-only">
              Formulaire de saisie des valeurs de test
            </h2>

            <ul
              className="flex flex-col gap-4"
              aria-live="polite"
              aria-label="Liste des tests à renseigner"
            >
              {testValues.map((test, index) => (
                <li key={`${test.name}-${index}`}>
                  <TestValueCard
                    name={test.name}
                    value={test.value}
                    unit={test.unit}
                    min={test.min}
                    max={test.max}
                    onChange={(newData) => handleValueChange(index, newData)}
                  />
                </li>
              ))}
            </ul>
          </section>

          {/* Bouton final */}
          <UiButton
            bg="raspberry"
            text="white"
            aria-label={isAnalyzing ? "Analyse en cours..." : "Lancer l’analyse des résultats"}
            className="w-full py-3 text-base flex justify-center items-center gap-2"
            onClick={handleAnalysis}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Analyse en cours...
              </>
            ) : (
              "Analyser les résultats"
            )}
          </UiButton>

        </div>
      </main>

      <FooterAnalysis />
    </div>
  );
}