import React from "react";
import Header from "../components/Header";
import UiButton from "../components/UiButton";
import { useNavigate } from "react-router-dom";


import {
  Import,
  Brain,
  FilePlusCorner,
  File,
  Keyboard,
  Eye,
  Headphones,
  Accessibility,
  Lock,
  Shield 
} from "lucide-react";

export default function LabIALanding() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-raspberry-50 text-gray-800">
     
      {/* Header */}
      <Header />

      {/* Skip to main content link */}

      {/* Hero */}
      <main id="main-content" className="bg-raspberry-50" role="main" aria-label="Contenu principal de Lab'IA">
       <section className="mx-auto mt-12 px-6 py-16 grid md:grid-cols-2 gap-10 items-center" aria-labelledby="hero-title">
  <div className="flex flex-col gap-4">
    <h1 id="hero-title" aria-label="Comprendre vos résultats médicaux plus facilement avec Lab'IA" className="text-4xl font-semibold text-raspberry-900">
      Comprendre vos résultats médicaux plus facilement avec Lab'IA
    </h1>

    <p aria-label="Lab'IA utilise l'intelligence artificielle pour traduire les rapports médicaux complexes en explications simples et compréhensibles. Aucun diplôme médical n'est nécessaire." className="text-base font-normal text-raspberry-700 max-w-xl">
      Lab'IA utilise l'intelligence artificielle pour traduire les
      rapports médicaux complexes en explications simples et
      compréhensibles. Aucun diplôme médical n'est nécessaire.
    </p>

    <div className="flex flex-col gap-2 text-base text-green-600" role="list" aria-label="Avantages de Lab'IA">
      <span role="listitem" aria-label="Sécurisé et conforme au RGPD">✔ Sécurisé et conforme au RGPD</span>
      <span role="listitem" aria-label="Complètement accessible">✔ Complètement accessible</span>
      <span role="listitem" aria-label="Gratuit et simple d'utilisation">✔ Gratuit et simple d'utilisation</span>
    </div>

    <UiButton
      bg="raspberry"
      text="white"
      onClick={() => navigate("/analysis")}
      className="mt-4 w-max"
      aria-label="Commencer l'analyse de vos résultats médicaux"
    >
      Commencez
    </UiButton>
  </div>

  <img
    src="https://images.unsplash.com/photo-1606206591513-adbfbdd7a177?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    alt="Laboratoire médical avec équipements scientifiques"
    className="rounded-lg shadow"
    aria-label="Image illustrant un laboratoire médical"
  />
</section>


        {/* How it works */}
        <section id="how" className="bg-white py-16" aria-labelledby="how-title">
          <h2 id="how-title" className="text-center text-2xl font-bold mb-10 text-raspberry-900" aria-label="Comment fonctionne Lab'IA">
            Comment ça marche ?
          </h2>
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6" role="list" aria-label="Trois étapes pour utiliser Lab'IA">
            <article 
              className="flex flex-col border rounded-xl p-6 text-center items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-raspberry-700 transition-all cursor-pointer hover:shadow-lg"
              tabIndex="0"
              role="listitem"
              aria-label="Étape 1 : Téléchargez vos résultats médicaux au format PDF ou saisissez les valeurs manuellement"
            >
              {
                <Import
                  size={48}
                  className="text-raspberry-700 bg-raspberry-300 rounded-2xl m-4 p-2"
                  aria-hidden="true"
                />
              }
              <h3 className="font-semibold mb-2" aria-label="Téléchargez vos résultats">Téléchargez vos résultats</h3>
              <p className="text-sm text-gray-600" aria-label="Téléchargez vos résultats de tests médicaux au format PDF ou saisissez les valeurs manuellement. Vos données sont cryptées et sécurisées.">
                Téléchargez vos résultats de tests médicaux au format PDF ou saisissez les valeurs manuellement. Vos données sont cryptées et sécurisées.
              </p>
            </article>
            <article 
              className="flex flex-col border rounded-xl p-6 text-center items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700 transition-all cursor-pointer hover:shadow-lg"
              tabIndex="0"
              role="listitem"
              aria-label="Étape 2 : Notre IA analyse vos résultats et les compare aux plages de référence"
            >
              {
                <Brain
                  size={48}
                  className="text-green-800 bg-green-300 rounded-2xl m-4 p-2"
                  aria-hidden="true"
                />
              }
              <h3 className="font-semibold mb-2" aria-label="Analyse par l'IA">Analyse par l'IA</h3>
              <p className="text-sm text-gray-600" aria-label="Notre IA analyse vos résultats et les compare aux plages de référence.">
                Notre IA analyse vos résultats et les compare aux plages de référence.
              </p>
            </article>
            <article 
              className="flex flex-col border rounded-xl p-6 text-center items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 transition-all cursor-pointer hover:shadow-lg"
              tabIndex="0"
              role="listitem"
              aria-label="Étape 3 : Recevez des explications simples en langage courant avec des visuels et des options audio"
            >
              {
                <FilePlusCorner
                  size={48}
                  className="text-blue-800 bg-blue-300 rounded-2xl m-4 p-2"
                  aria-hidden="true"
                />
              }
              <h3 className="font-semibold mb-2" aria-label="Recevez des explications claires">Recevez des explications claires</h3>
              <p className="text-sm text-gray-600" aria-label="Recevez des explications simples en langage courant, avec des visuels et des options audio.">
                Recevez des explications simples en langage courant, avec des visuels et
                des options audio.
              </p>
            </article>
          </div>
        </section>

        {/* Accessibility */}
        <section id="accessibility" className="bg-gray-50 py-16" aria-labelledby="accessibility-title">
          <h2 id="accessibility-title" className="text-center text-2xl font-bold mb-6 text-raspberry-900" aria-label="Conçu pour tous, accessibilité Lab'IA">
            Conçu pour tous
          </h2>
          <p className="text-center mb-6" aria-label="Conçu selon les normes d'accessibilité WCAG 2.2 AA et RGAA">
            Conçu selon les normes d'accessibilité WCAG 2.2 AA et RGAA
          </p>
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-6" role="list" aria-label="Quatre fonctionnalités d'accessibilité de Lab'IA">
            <article 
              className="flex flex-col border rounded-xl p-6 text-center bg-white items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-raspberry-700 transition-all cursor-pointer hover:shadow-lg"
              tabIndex="0"
              role="listitem"
              aria-label="Accessibilité visuelle : Fonctionnalités visuelles conformes à WCAG 2.2"
            >
              {
                <Eye
                  size={48}
                  className="text-raspberry-800 bg-raspberry-300 rounded-2xl m-4 p-2"
                  aria-hidden="true"
                />
              }
              <h3 className="font-semibold" aria-label="Accessibilité visuelle">Accessibilité visuelle</h3>
              <p className="text-sm text-gray-600 mt-2" aria-label="Fonctionnalités d'accessibilité conformes à la norme WCAG 2.2.">
                Fonctionnalités d'accessibilité conformes à la norme WCAG 2.2.
              </p>
            </article>
            <article 
              className="flex flex-col border rounded-xl p-6 text-center bg-white items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-700 transition-all cursor-pointer hover:shadow-lg"
              tabIndex="0"
              role="listitem"
              aria-label="Assistance audio : Lecteur audio pour écouter les explications"
            >
              {
                <Headphones
                  size={48}
                  className="text-orange-800 bg-orange-300 rounded-2xl m-4 p-2"
                  aria-hidden="true"
                />
              }
              <h3 className="font-semibold" aria-label="Assistance audio">Assistance audio </h3>
              <p className="text-sm text-gray-600 mt-2" aria-label="Fonctionnalités d'accessibilité conformes à la norme WCAG 2.2.">
                Fonctionnalités d'accessibilité conformes à la norme WCAG 2.2.
              </p>
            </article>
            <article 
              className="flex flex-col border rounded-xl p-6 text-center bg-white items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 transition-all cursor-pointer hover:shadow-lg"
              tabIndex="0"
              role="listitem"
              aria-label="Navigation clavier : Accès complet via le clavier"
            >
              {
                <Keyboard
                  size={48}
                  className="text-blue-800 bg-blue-300 rounded-2xl m-4 p-2"
                  aria-hidden="true"
                />
              }
              <h3 className="font-semibold" aria-label="Navigation clavier">Navigation Clavier</h3>
              <p className="text-sm text-gray-600 mt-2" aria-label="Fonctionnalités d'accessibilité conformes à la norme WCAG 2.2.">
                Fonctionnalités d'accessibilité conformes à la norme WCAG 2.2.
              </p>
            </article>
            <article 
              className="flex flex-col border rounded-xl p-6 text-center bg-white items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700 transition-all cursor-pointer hover:shadow-lg"
              tabIndex="0"
              role="listitem"
              aria-label="Design inclusif : Conception pour tous les utilisateurs"
            >
              {
                <Accessibility
                  size={48}
                  className="text-green-800 bg-green-300 rounded-2xl m-4 p-2"
                  aria-hidden="true"
                />
              }
              <h3 className="font-semibold" aria-label="Design inclusif">Design Inclusif</h3>
              <p className="text-sm text-gray-600 mt-2" aria-label="Fonctionnalités d'accessibilité conformes à la norme WCAG 2.2.">
                Fonctionnalités d'accessibilité conformes à la norme WCAG 2.2.
              </p>
            </article>
          </div>
        </section>

        {/* Security */}
        <section id="security" className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
            <img
              src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Medical data security"
              className="rounded-lg"
            />
            <div>
              <h2 className="text-2xl font-bold mb-4 text-raspberry-900">
                Vos données de santé sont protégées
              </h2>
              <ul className="flex flex-col text-sm text-gray-600">
                <li className="flex items-center" tabIndex="0" role="region" aria-label="GDPR Compliant feature">
                  {
                    <Shield
                      size={40}
                      className="text-green-800 bg-green-300 rounded-2xl m-4 p-2"
                    />
                  }
                  <p>Conforme au RGPD</p>
                </li>
                <li className="flex items-center" tabIndex="0" role="region" aria-label="End-to-End Encryption feature">
                  {
                    <Lock
                      size={40}
                      className="text-blue-800 bg-blue-300 rounded-2xl m-4 p-2"
                    />
                  }
                  <p>Chiffrement de bout en bout</p>
                </li>
                <li className="flex items-center" tabIndex="0" role="region" aria-label="Full Data Control feature">
                  {
                    <File
                      size={40}
                      className="text-purple-800 bg-purple-300 rounded-2xl m-4 p-2"
                    />
                  }
                  <p> Contrôle total des données</p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-raspberry-500 text-white py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Prêt à comprendre mieux votre santé ?
          </h2>
          <p className="mb-6">Rejoignez des milliers d'utilisateurs qui font confiance à Lab'IA.</p>
          <UiButton
                      bg="white"
                      text="raspberry"
                      onClick={() => navigate("/analysis")}
                    >
                      Commencer
                    </UiButton>
        </section>
      </main>
{/* Footer */}
<footer className="bg-white text-raspberry-900 text-sm py-10 border-t border-raspberry-900">
  <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">
    <div className="max-w-xs mx-auto">
      <h4 className="font-semibold mb-2">Lab'IA</h4>
      <p>Rendre les résultats médicaux compréhensibles pour tous.</p>
    </div>

    <div>
      <h4 className="font-semibold mb-2">Légal</h4>
      <ul className="space-y-1">
        <li>
          <a className="text-raspberry-900 hover:underline" href="#">
            Conditions d'utilisation
          </a>
        </li>
        <li>
          <a className="text-raspberry-900 hover:underline" href="#">
            Politique de confidentialité
          </a>
        </li>
        <li>
          <a className="text-raspberry-900 hover:underline" href="#">
            Politique des cookies
          </a>
        </li>
      </ul>
    </div>

    <div>
      <h4 className="font-semibold mb-2">Contact</h4>
      <p>contact@labia.com</p>
    </div>
  </div>

  <p className="text-center mt-8 text-xs">
    © 2025 Lab'IA. Tous droits réservés.
  </p>
</footer>

    </div>
  );
}
