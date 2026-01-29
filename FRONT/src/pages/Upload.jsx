import { useRef, useState } from "react";
import { X, UploadCloud, CheckCircle, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import FooterAnalysis from "../components/FooterAnalisys";
import Card from "../components/Card";
import UiButton from "../components/UiButton";
import { analyzePDF } from "../services/api";

export default function Upload() {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleAnalysis = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const result = await analyzePDF(file);

      if (result.success && result.analysis) {
        navigate("/results", {
          state: {
            analysisData: result.analysis,
            source: 'pdf'
          }
        });
      } else {
        throw new Error("Format de réponse invalide");
      }
    } catch (err) {
      console.error("Erreur d'analyse PDF:", err);
      setError(err.message || "Une erreur est survenue lors de l'analyse du PDF. Veuillez réessayer.");
    } finally {
      setIsAnalyzing(false);
    }
  };



  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  return (
    <div className="min-h-screen bg-raspberry-50 flex flex-col">
      <Header />

      <main
        id="main-content"
        role="main"
        aria-labelledby="page-title"
        className="flex-1 flex items-center justify-center px-4"
      >
        <div className="max-w-140 w-full flex flex-col gap-6">

          <div className="flex items-center justify-between">
            <h1
              id="page-title"
              className="text-base font-normal text-raspberry-900"
            >
              Téléversez votre rapport de laboratoire
            </h1>

            <button
              type="button"
              onClick={() => navigate("/analysis")}
              aria-label="Fermer la page de téléversement"
              className="
                p-2
                rounded
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-raspberry-500
              "
            >
              <X className="text-raspberry-900" aria-hidden="true" />
            </button>
          </div>

          <Card
            onClick={!file ? handleClick : undefined}
            ariaLabel={
              file
                ? "Fichier chargé"
                : "Téléverser un fichier de rapport de laboratoire"
            }
            className="w-full h-62"
            icon={
              file ? (
                <CheckCircle
                  size={48}
                  className="text-green-600"
                  aria-hidden="true"
                />
              ) : (
                <UploadCloud
                  size={48}
                  className="text-raspberry-700"
                  aria-hidden="true"
                />
              )
            }
            title={
              file
                ? "Fichier téléchargé avec succès"
                : "Téléversez votre fichier"
            }
            description={
              file
                ? file.name
                : "Appuyez sur Entrée ou Espace pour parcourir les fichiers. Formats acceptés : PDF, CSV, TXT, PNG, JPG"
            }
          />

          <input
            ref={inputRef}
            id="file-upload"
            type="file"
            accept=".pdf,.csv,.txt,.png,.jpg,.jpeg"
            onChange={handleFileChange}
            className="sr-only"
            aria-label="Sélectionner un fichier de rapport de laboratoire"
            aria-describedby="file-upload-hint"
          />

          <p id="file-upload-hint" className="sr-only">
            Formats acceptés : PDF, CSV, TXT, PNG, JPG. Sélectionnez un fichier à analyser.
          </p>

          <div aria-live="polite" className="sr-only">
            {file ? `Fichier ${file.name} sélectionné` : ""}
          </div>

          {file && (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={removeFile}
                aria-label="Supprimer le fichier sélectionné"
                className="
                  text-sm
                  text-raspberry-700
                  underline
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-raspberry-500
                "
              >
                Supprimer le fichier
              </button>
            </div>
          )}

          {file && (
            <>
              {error && (
                <div
                  role="alert"
                  className="bg-red-50 border-l-4 border-red-500 p-4 rounded text-red-700 mb-4"
                >
                  <p className="font-bold">Erreur</p>
                  <p>{error}</p>
                </div>
              )}

              <UiButton
                bg="raspberry"
                text="white"
                aria-label={isAnalyzing ? "Analyse du rapport en cours..." : "Analyser le rapport sélectionné"}
                onClick={handleAnalysis}
                className="w-full py-3 text-base flex justify-center items-center gap-2"
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Analyse en cours...
                  </>
                ) : (
                  "Analyser ce rapport"
                )}
              </UiButton>
            </>
          )}

        </div>
      </main>

      <FooterAnalysis />
    </div>
  );
}
