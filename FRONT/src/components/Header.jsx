import { useNavigate, useLocation } from "react-router-dom";
import UiButton from "./UiButton";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isAnalysisPage = location.pathname === "/results";


  return (
    <>
      <a
        href="#main-content"
        className="absolute top-0 left-0 z-100 -translate-y-full focus:translate-y-0 transition-transform bg-white text-raspberry-900 px-4 py-2 rounded-br-md shadow-lg focus:outline-none focus:ring-2 focus:ring-raspberry-500"
      >
        Aller au contenu principal
      </a>

      <header
        role="banner"
        className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-md border-b-2 border-raspberry-700 z-50"
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-2xl font-black text-raspberry-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-raspberry-500"
            aria-label="Retour à l’accueil – Assistant d’analyse de résultats médicaux"
          >
            <img
              src="./logo.png"
              alt=""
              className="h-14 w-auto mr-4"
              aria-hidden="true"
            />
          </button>

          <div
            className="flex flex-col text-left"
            aria-labelledby="site-title site-description"
          >
            <h1
              id="site-title"
              className="text-xl font-black text-raspberry-900"
            >
              Assistant d’analyse de résultats médicaux
            </h1>

            <p
              id="site-description"
              className="text-sm text-raspberry-700 font-medium"
            >
              Une analyse simple et claire de vos données de santé
            </p>
          </div>
        </div>

        <nav
          className="flex items-center gap-4"
          aria-label="Actions principales de l’en-tête"
        >
          

          {isAnalysisPage && (
            <UiButton
              bg="raspberry"
              text="white"
              aria-current="page"
              aria-label="Page analyse – lancer une nouvelle analyse médicale"
              onClick={() => navigate("/")}
            >
              Nouvelle analyse
            </UiButton>
          )}
        </nav>
      </header>
    </>
  );
}
