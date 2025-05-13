'use client'

import { useState } from 'react';
import { useTheme } from '../components/context/ThemeContext';
import Head from 'next/head';
import Image from 'next/image';

const ContactPage = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Traitement du formulaire ici
    console.log('Form submitted:', formData);
  };

  // Classes dynamiques en fonction du thème
  const getBgColor = () => {
    switch(theme) {
      case 'light': return 'bg-white';
      case 'violet-dark': return 'bg-violet-900';
      case 'pink-dark': return 'bg-pink-900';
      case 'blue-dark': return 'bg-blue-900';
      default: return 'bg-gray-900';
    }
  };

  const getTextColor = () => {
    switch(theme) {
      case 'light': return 'text-gray-700';
      case 'violet-dark': return 'text-violet-100';
      case 'pink-dark': return 'text-pink-100';
      case 'blue-dark': return 'text-blue-100';
      default: return 'text-gray-300';
    }
  };

  const getCardBg = () => {
    switch(theme) {
      case 'light': return 'bg-gray-50';
      case 'violet-dark': return 'bg-violet-800/50';
      case 'pink-dark': return 'bg-pink-800/50';
      case 'blue-dark': return 'bg-blue-800/50';
      default: return 'bg-gray-800/50';
    }
  };

  const getBorderColor = () => {
    switch(theme) {
      case 'light': return 'border-gray-200';
      case 'violet-dark': return 'border-violet-700';
      case 'pink-dark': return 'border-pink-700';
      case 'blue-dark': return 'border-blue-700';
      default: return 'border-gray-700';
    }
  };

  const getInputClasses = () => {
    return `w-full px-4 py-3 rounded-lg border ${getBorderColor()} ${theme === 'light' ? 'bg-white' : 'bg-gray-800/20'} ${getTextColor()} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`;
  };

  return (
    <div className={`min-h-screen ${getBgColor()} ${getTextColor()}`}>
      <Head>
        <title>Contactez Open Numeric - Support Professionnel</title>
        <meta name="description" content="Contactez notre équipe pour des solutions numériques sur mesure. Nous sommes disponibles pour répondre à vos questions et discuter de vos projets." />
      </Head>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className={`absolute inset-0 opacity-10 ${theme === 'light' ? 'bg-gray-900' : 'bg-white'}`}></div>
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_70%,black)]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Contactez-nous</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Discutons de votre projet et trouvons ensemble la meilleure solution numérique pour votre entreprise.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formulaire de contact */}
            <div className={`p-8 rounded-2xl shadow-xl ${getCardBg()} border ${getBorderColor()}`}>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 relative pb-2">
                Envoyez-nous un message
                <span className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full"></span>
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-2 font-medium">Votre nom</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={getInputClasses()}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2 font-medium">Votre email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={getInputClasses()}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block mb-2 font-medium">Sujet</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={getInputClasses()}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block mb-2 font-medium">Votre message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={getInputClasses()}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Envoyer le message
                </button>
              </form>
            </div>

            {/* Informations de contact */}
            <div>
              <div className={`p-8 rounded-2xl shadow-xl ${getCardBg()} border ${getBorderColor()} mb-8`}>
                <h2 className="text-2xl md:text-3xl font-bold mb-6 relative pb-2">
                  Nos coordonnées
                  <span className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-orange-500 to-orange-300 rounded-full"></span>
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 p-3 rounded-full bg-blue-500/10 text-blue-500">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold">Adresse</h3>
                      <p className="mt-1">SOMGANDE, Ouagadougou, Burkina Faso</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 p-3 rounded-full bg-blue-500/10 text-blue-500">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold">Téléphone</h3>
                      <p className="mt-1">+226 65 03 37 42</p>
                      <p className="mt-1">+226 61 78 03 91</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 p-3 rounded-full bg-blue-500/10 text-blue-500">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold">Email</h3>
                      <p className="mt-1">tech00.02in@gmail.com</p>
                      <p className="mt-1">etannestor45@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Horaires d'ouverture */}
              <div className={`p-8 rounded-2xl shadow-xl ${getCardBg()} border ${getBorderColor()}`}>
                <h2 className="text-2xl md:text-3xl font-bold mb-6 relative pb-2">
                  Horaires d'ouverture
                  <span className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-orangered-500 to-orangered-300 rounded-full"></span>
                </h2>

                <ul className="space-y-4">
                  {[
                    { day: 'Lundi - Vendredi', hours: '08:00 - 18:00' },
                    { day: 'Samedi', hours: '09:00 - 14:00' },
                    { day: 'Dimanche', hours: 'Fermé' }
                  ].map((item, index) => (
                    <li key={index} className="flex justify-between">
                      <span className="font-medium">{item.day}</span>
                      <span>{item.hours}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Réseaux sociaux</h3>
                  <div className="flex space-x-4">
                    {[
                      { name: 'Facebook', icon: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z', color: 'text-blue-600' },
                      { name: 'Twitter', icon: 'M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84', color: 'text-blue-400' },
                      { name: 'LinkedIn', icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z', color: 'text-blue-700' },
                      { name: 'Instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z', color: 'text-pink-600' }
                    ].map((social, index) => (
                      <a
                        key={index}
                        href="#"
                        className={`p-3 rounded-full ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'} hover:bg-opacity-80 transition-all ${social.color}`}
                        aria-label={social.name}
                      >
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d={social.icon} clipRule="evenodd" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Carte Google Maps */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`rounded-2xl overflow-hidden shadow-xl border ${getBorderColor()}`}>
            <div className="aspect-w-16 aspect-h-9 w-full h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.0286000000003!2d-1.5190854!3d12.8447144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDUwJzQxLjAiTiAxwrAzMScwOC43Ilc!5e0!3m2!1sen!2sbf!4v1620000000000!5m2!1sen!2sbf"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="rounded-2xl"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;