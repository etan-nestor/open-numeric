'use client'

import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const { theme } = useTheme();

  // Classes dynamiques en fonction du thème
  const getBgColor = () => {
    switch(theme) {
      case 'light': return 'bg-white';
      case 'violet-dark': return 'bg-violet-900';
      case 'pink-dark': return 'bg-pink-900';
      case 'blue-dark': return 'bg-blue-900';
      default: return 'bg-gray-900'; // dark
    }
  };

  const getBorderColor = () => {
    switch(theme) {
      case 'light': return 'border-gray-200';
      case 'violet-dark': return 'border-violet-800';
      case 'pink-dark': return 'border-pink-800';
      case 'blue-dark': return 'border-blue-800';
      default: return 'border-gray-800'; // dark
    }
  };

  const getTextColor = () => {
    switch(theme) {
      case 'light': return 'text-gray-600';
      case 'violet-dark': return 'text-violet-100';
      case 'pink-dark': return 'text-pink-100';
      case 'blue-dark': return 'text-blue-100';
      default: return 'text-gray-400'; // dark
    }
  };

  return (
    <footer className={`${getBgColor()} border-t ${getBorderColor()} pt-16 pb-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Colonne 1 - A propos */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative pb-2">
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Open Numeric
              </span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full"></span>
            </h3>
            <p className={`${getTextColor()} mb-6 leading-relaxed`}>
              Votre partenaire en solutions numériques. Développement, design, formation et maintenance pour propulser votre entreprise à l'ère digitale.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className={`${getTextColor()} hover:text-blue-400 transition-all duration-300 hover:-translate-y-1`}
                aria-label="Facebook"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a 
                href="#" 
                className={`${getTextColor()} hover:text-orange-400 transition-all duration-300 hover:-translate-y-1`}
                aria-label="Twitter"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a 
                href="#" 
                className={`${getTextColor()} hover:text-orangered-400 transition-all duration-300 hover:-translate-y-1`}
                aria-label="LinkedIn"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
  
          {/* Colonne 2 - Services */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative pb-2">
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Nos Services
              </span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-orange-500 to-orange-300 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {[
                "Développement d'applications",
                "Création de sites web",
                "Développement d'API",
                "Design web & graphique",
                "Formations numériques",
                "Maintenance informatique",
                "Réparation d'équipements"
              ].map((service) => (
                <li key={service}>
                  <a 
                    href="#" 
                    className={`${getTextColor()} hover:text-orange-400 transition-all duration-300 flex items-start group`}
                  >
                    <span className="w-2 h-2 mt-2 mr-2 rounded-full bg-orange-500 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
  
          {/* Colonne 3 - Liens utiles */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative pb-2">
              <span className="bg-gradient-to-r from-orangered-400 to-orangered-600 bg-clip-text text-transparent">
                Liens Utiles
              </span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-orangered-500 to-orangered-300 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {[
                "À propos de nous",
                "Notre équipe",
                "Portfolio",
                "Blog",
                "Témoignages",
                "Politique de confidentialité",
                "Conditions d'utilisation"
              ].map((lien) => (
                <li key={lien}>
                  <a 
                    href="#" 
                    className={`${getTextColor()} hover:text-orangered-400 transition-all duration-300 flex items-start group`}
                  >
                    <span className="w-2 h-2 mt-2 mr-2 rounded-full bg-orangered-500 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                    {lien}
                  </a>
                </li>
              ))}
            </ul>
          </div>
  
          {/* Colonne 4 - Contact */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative pb-2">
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Contactez-nous
              </span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full"></span>
            </h3>
            <address className={`not-italic ${getTextColor()} space-y-4`}>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="ml-3">SOMGANDE, Ouagadougou, Burkina Faso</p>
              </div>
              <div className="flex items-center">
                <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <p className="ml-3">+226 65 03 37 42</p>
              </div>
              <div className="flex items-center">
                <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p className="ml-3">tech00.02in@gmail.com</p>
              </div>
            </address>
            <div className="mt-6">
              <a 
                href="/contact" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-orange-500 to-orangered-500 hover:from-orange-600 hover:to-orangered-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Formulaire de contact
                <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
  
        {/* Copyright */}
        <div className={`mt-16 pt-8 border-t ${getBorderColor()} flex flex-col md:flex-row justify-between items-center`}>
          <p className={`${getTextColor()} text-sm`}>
            &copy; {new Date().getFullYear()} Open Numeric. Tous droits réservés.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a 
              href="#" 
              className={`${getTextColor()} hover:text-blue-400 text-sm transition-all duration-300`}
            >
              Mentions légales
            </a>
            <a 
              href="#" 
              className={`${getTextColor()} hover:text-orange-400 text-sm transition-all duration-300`}
            >
              Politique de cookies
            </a>
            <a 
              href="#" 
              className={`${getTextColor()} hover:text-orangered-400 text-sm transition-all duration-300`}
            >
              CGV
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}