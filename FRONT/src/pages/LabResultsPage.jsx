import React, { useState, useEffect } from "react";
import UiButton from "../components/UiButton";
import { Smile, Frown, Meh, AlertCircle, CheckCircle2, HelpCircle } from "lucide-react";
import Header from "../components/Header";
import { useNavigate, useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default function LabResultsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [focusedResultId, setFocusedResultId] = useState(null);

  // Get data from location state (passed from Upload or ManualValues)
  const analysisData = location.state?.analysisData;
  const [results, setResults] = useState([]);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    if (analysisData) {
      if (analysisData.summary) {
        setSummary(analysisData.summary);
      }

      if (analysisData.results) {
        const mappedResults = analysisData.results.map((item, index) => {
          // Determine styles based on status
          let statusStyle = {
            color: "border-gray-400",
            bgColor: "bg-gray-50",
            statusColor: "bg-gray-100 text-gray-800",
            icon: <HelpCircle />,
            emoji: "❓"
          };

          const status = item.status?.toLowerCase() || "unknown";

          if (status === "normal") {
            statusStyle = {
              color: "border-green-400",
              bgColor: "bg-green-50",
              statusColor: "bg-green-100 text-green-800",
              icon: <Smile />,
              emoji: "✅"
            };
          } else if (status === "abnormal" || status === "high" || status === "low") {
            // Different visual for abnormal
            statusStyle = {
              color: "border-red-400",
              bgColor: "bg-red-50",
              statusColor: "bg-red-100 text-red-800",
              icon: <Frown />,
              emoji: "⚠️"
            };
          } else if (status === "borderline") {
            statusStyle = {
              color: "border-yellow-400",
              bgColor: "bg-yellow-50",
              statusColor: "bg-yellow-100 text-yellow-800",
              icon: <Meh />,
              emoji: "⚠️"
            };
          }

          return {
            id: index + 1,
            name: item.name,
            value: item.value,
            unit: item.unit,
            resultIcon: statusStyle.icon,
            status: status,
            color: statusStyle.color,
            bgColor: statusStyle.bgColor,
            statusColor: statusStyle.statusColor,
            icon: statusStyle.emoji,
            explanation: item.explanation
          };
        });
        setResults(mappedResults);
      }
    } else {
      // Fallback for demo/dev without data
      // Redirecting would be better in prod, but keeping empty for now
    }
  }, [analysisData]);

  const handlePDFExport = async () => {
    try {
      // Créer un élément temporaire pour l'export
      const exportElement = document.createElement("div");
      exportElement.style.position = "absolute";
      exportElement.style.left = "-9999px";
      exportElement.style.backgroundColor = "#ffffff";
      exportElement.style.padding = "30px";
      exportElement.style.width = "210mm";
      exportElement.style.fontFamily = "Arial, sans-serif";
      exportElement.style.lineHeight = "1.6";
      exportElement.style.color = "#333333";

      // Créer un titre
      const title = document.createElement("h1");
      title.textContent = "Résultats Médicaux - Lab'IA";
      title.style.fontSize = "28px";
      title.style.fontWeight = "bold";
      title.style.marginBottom = "10px";
      title.style.color = "#881337"; // Raspberry 900
      title.style.borderBottom = "3px solid #be123c"; // Raspberry 700
      title.style.paddingBottom = "10px";
      exportElement.appendChild(title);

      // Ajouter la date
      const dateElement = document.createElement("p");
      dateElement.textContent = `Date d'export: ${new Date().toLocaleDateString("fr-FR")}`;
      dateElement.style.marginBottom = "30px";
      dateElement.style.fontSize = "13px";
      dateElement.style.color = "#666666";
      exportElement.appendChild(dateElement);

      // Copier la section résumé
      const resultsSection = document.querySelector("[aria-label='Résumé des résultats']");
      if (resultsSection) {
        const summaryClone = resultsSection.cloneNode(true);
        // Clean up interactive elements from clone
        const buttons = summaryClone.querySelectorAll("button");
        buttons.forEach(b => b.remove());

        // Ajouter du style au résumé
        summaryClone.style.marginBottom = "30px";
        summaryClone.style.padding = "15px";
        summaryClone.style.backgroundColor = "#f9fafb";
        summaryClone.style.borderRadius = "8px";
        summaryClone.style.border = "1px solid #e5e7eb";

        const summaryTitle = summaryClone.querySelector("h2"); // Changed from h1 to h2
        if (summaryTitle) {
          summaryTitle.style.fontSize = "18px";
          summaryTitle.style.marginBottom = "15px";
          summaryTitle.style.color = "#1f2937";
        }

        exportElement.appendChild(summaryClone);
      }

      // Ajouter un titre pour les résultats détaillés
      const detailsTitle = document.createElement("h2");
      detailsTitle.textContent = "Détail des Analyses";
      detailsTitle.style.fontSize = "20px";
      detailsTitle.style.fontWeight = "bold";
      detailsTitle.style.marginTop = "30px";
      detailsTitle.style.marginBottom = "20px";
      detailsTitle.style.color = "#881337";
      exportElement.appendChild(detailsTitle);

      // Copier les cartes de résultats avec meilleure mise en forme
      const mainContent = document.querySelector("#main-content");
      if (mainContent) {
        const articles = mainContent.querySelectorAll("article");
        articles.forEach((article) => {
          const articleClone = article.cloneNode(true);

          // Appliquer des styles personnalisés
          articleClone.style.marginBottom = "20px";
          articleClone.style.padding = "20px";
          articleClone.style.border = "1px solid #e5e7eb";
          articleClone.style.borderRadius = "8px";
          articleClone.style.pageBreakInside = "avoid";
          articleClone.style.boxShadow = "none";
          articleClone.style.backgroundColor = "#ffffff";

          // Styliser les en-têtes des résultats
          const h3 = articleClone.querySelector("h3");
          if (h3) {
            h3.style.fontSize = "16px";
            h3.style.marginBottom = "5px";
            h3.style.color = "#1f2937";
          }

          // Styliser les valeurs
          const values = articleClone.querySelectorAll("span"); // Changed from p to span for values
          values.forEach((p) => {
            if (p.textContent.match(/^[\d.,]+/) || p.className.includes("text-3xl")) {
              p.style.fontSize = "24px";
              p.style.fontWeight = "bold";
              p.style.color = "#be123c"; // Raspberry
              p.style.margin = "10px 0";
            }
          });

          // Styliser les badges de statut
          const badges = articleClone.querySelectorAll("span");
          badges.forEach((badge) => {
            // Check if it's likely a badge wrapper
            if (badge.className.includes("rounded-full")) {
              badge.style.display = "inline-flex"; // Changed to inline-flex
              badge.style.alignItems = "center"; // Added for icon alignment
              badge.style.gap = "5px"; // Added for gap between icon and text
              badge.style.padding = "4px 10px";
              badge.style.borderRadius = "15px";
              badge.style.fontSize = "12px";
              badge.style.fontWeight = "bold";
              badge.style.marginBottom = "10px";

              const text = badge.textContent.toLowerCase();
              if (text.includes("normal") && !text.includes("abnormal")) {
                badge.style.backgroundColor = "#dcfce7"; // green-100
                badge.style.color = "#166534"; // green-800
              } else {
                // Abnormal / other
                badge.style.backgroundColor = "#fee2e2"; // red-100
                badge.style.color = "#991b1b"; // red-800
              }
            }
          });

          // Styliser les explications
          const explanations = articleClone.querySelectorAll("div");
          explanations.forEach((div) => {
            if (div.className.includes("bg-") && !div.className.includes("bg-white")) {
              div.style.backgroundColor = "#f3f4f6";
              div.style.padding = "10px";
              div.style.borderRadius = "6px";
              div.style.marginTop = "10px";
              div.style.fontSize = "12px";
            }
          });

          exportElement.appendChild(articleClone);
        });
      }

      // Ajouter un pied de page
      const footer = document.createElement("div");
      footer.style.marginTop = "40px";
      footer.style.paddingTop = "20px";
      footer.style.borderTop = "1px solid #e5e7eb";
      footer.style.fontSize = "10px";
      footer.style.color = "#9ca3af";
      footer.style.textAlign = "center";
      footer.innerHTML = `
        <p style="margin: 5px 0;"><strong>Avis Important:</strong> Ce document est généré par Lab'IA à titre informatif uniquement.</p>
        <p style="margin: 5px 0;">Il ne remplace pas un avis médical professionnel. Consultez toujours un médecin pour interpréter vos résultats.</p>
        <p style="margin: 5px 0;">Lab'IA - ${new Date().getFullYear()}</p>
      `;
      exportElement.appendChild(footer);

      document.body.appendChild(exportElement);

      const canvas = await html2canvas(exportElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        allowTaint: true,
        ignoreElements: (element) => {
          return element.tagName === "SCRIPT" || element.tagName === "STYLE";
        },
      });

      document.body.removeChild(exportElement);

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210; // Width of A4 in mm
      const pageHeight = 297; // Height of A4 in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("LabIA_Resultats.pdf");
    } catch (error) {
      console.error("Erreur lors de l'export PDF:", error);
      alert("Erreur lors de l'export PDF: " + error.message);
    }
  };

  const handleKeyDown = (e, resultId) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const resultIds = results.map(r => r.id);
      const currentIndex = resultIds.indexOf(resultId);
      if (e.key === "ArrowDown" && currentIndex < resultIds.length - 1) {
        const nextButton = document.querySelector(
          `[data-result-id="${resultIds[currentIndex + 1]}"]`,
        );
        nextButton?.focus();
      } else if (e.key === "ArrowUp" && currentIndex > 0) {
        const prevButton = document.querySelector(
          `[data-result-id="${resultIds[currentIndex - 1]}"]`,
        );
        prevButton?.focus();
      }
    }
  };

  if (!analysisData) {
    return (
      <div className="min-h-screen bg-raspberry-50 flex flex-col items-center justify-center p-6 text-center">
        <Header />
        <div className="max-w-md mt-20">
          <AlertCircle className="w-16 h-16 text-raspberry-700 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-raspberry-900 mb-2">Aucune donnée trouvée</h2>
          <p className="text-gray-700 mb-6">Veuillez effectuer une nouvelle analyse pour voir les résultats.</p>
          <div className="flex flex-col gap-3">
            <UiButton bg="raspberry" text="white" onClick={() => navigate("/analysis")}>
              Nouvelle analyse
            </UiButton>
            <UiButton bg="white" text="raspberry" onClick={() => navigate("/")}>
              Retour à l'accueil
            </UiButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen bg-raspberry-50">
      <Header />

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="w-full h-full">
          {/* Header - Spacer for Fixed Header */}

          {/* New Analysis Button */}
          <div className="mt-24 flex justify-between items-center">
            <h1 className="font-bold text-gray-900 text-3xl">
              Vos Résultats
            </h1>
            <a
              href="/help"
              className="px-6 py-2 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 transition"
              aria-label="Aide"
            >
              Aide
            </a>
          </div>

          {/* Results Summary */}
          <section className="bg-white rounded-xl shadow-sm border border-raspberry-100 p-6 mb-8" aria-label="Résumé des résultats">

            {summary && (
              <div
                className="space-y-4"
                role="region"
                aria-label="Résumé global de l'analyse"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-raspberry-100 rounded-lg">
                    <CheckCircle2 className="text-raspberry-700 w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-raspberry-900 mb-1">Résumé de l'analyse</h2>
                    <div className="flex gap-4 text-sm mb-3">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full font-medium">
                        {summary.normalCount} val. normales
                      </span>
                      {summary.abnormalCount > 0 && (
                        <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full font-medium">
                          {summary.abnormalCount} val. à surveiller
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {summary.overallMessage}
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-start gap-2 text-gray-500 bg-gray-50 p-3 rounded-lg text-xs mt-4"
                  role="note"
                >
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>
                    Important : Cette analyse est générée par une intelligence artificielle à titre informatif.
                    Elle ne remplace en aucun cas l'avis de votre médecin. Veuillez consulter un professionnel de santé pour une interprétation médicale.
                  </span>
                </div>
              </div>
            )}
          </section>

          {/* Results Cards */}
          <main id="main-content" className="space-y-4">
            <h2 className="sr-only">
              Détails des résultats médicaux
            </h2>
            {results.map((result) => (
              <article
                key={result.id}
                tabIndex={0}
                data-result-id={result.id}
                onKeyDown={(e) => handleKeyDown(e, result.id)}
                onFocus={() => setFocusedResultId(result.id)}
                onBlur={() => setFocusedResultId(null)}
                className={`border-l-4 ${result.color} bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition ${focusedResultId === result.id
                    ? "ring-2 ring-purple-500 ring-offset-2"
                    : ""
                  }`}
                role="region"
                aria-label={`Résultat pour ${result.name} : Valeur ${result.value} ${result.unit || ''}. Statut : ${result.status}`}
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                    <div>
                      <h3 className="font-bold text-gray-900 text-xl mb-2">
                        {result.name}
                      </h3>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-gray-900">
                          {result.value}
                        </span>
                        {result.unit && (
                          <span className="text-gray-600 font-medium">
                            {result.unit}
                          </span>
                        )}
                      </div>
                    </div>

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 ${result.statusColor}`}
                    >
                      <span aria-hidden="true" role="img">{result.resultIcon}</span>
                      <span className="capitalize">{result.status === 'normal' ? 'Normal' : result.status === 'abnormal' ? 'Anormal' : result.status}</span>
                    </span>
                  </div>

                  <div className={`${result.bgColor} p-4 rounded-lg`}>
                    <h4 className="font-semibold text-gray-900 text-sm mb-2 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4" />
                      Explication simple :
                    </h4>
                    <p className="text-gray-800 text-sm leading-relaxed">
                      {result.explanation}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </main>

          {/* Footer Buttons */}
          <nav
            className="flex flex-wrap gap-4 mt-12 mb-12"
            aria-label="Navigation des résultats"
          >
            <UiButton bg="raspberry" text="white" className="flex-1 md:flex-none">
              <a
                href="/"
                className="flex items-center justify-center gap-2 w-full h-full"
              >
                <span>←</span> Retour à l'accueil
              </a>
            </UiButton>

            <UiButton bg="white" text="raspberry" className="flex-1 md:flex-none" onClick={() => navigate("/analysis")}>
              Nouvelle analyse
            </UiButton>

            <div className="flex-1 md:flex-auto flex justify-end">
              <UiButton
                bg="raspberry"
                text="white"
                onClick={handlePDFExport}
                aria-label="Exporter les résultats en PDF"
                className="flex items-center gap-2"
              >
                <span>↓</span> Télécharger le rapport PDF
              </UiButton>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
