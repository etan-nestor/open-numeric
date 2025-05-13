'use client'

import { useState } from 'react';
import { useTheme } from '../components/context/ThemeContext';
import Head from 'next/head';
import { motion } from 'framer-motion';

const QuotePage = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    timeline: '',
    description: ''
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Envoyer les données du formulaire ici
    console.log('Devis soumis:', formData);
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

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

  const projectTypes = [
    'Site Web Vitrine',
    'Application Web',
    'Application Mobile',
    'E-commerce',
    'Refonte de Site',
    'SEO/Marketing',
    'Design UI/UX',
    'Autre'
  ];

  const budgetRanges = [
    'Moins de 2 000 €',
    '2 000 - 5 000 €',
    '5 000 - 10 000 €',
    '10 000 - 20 000 €',
    '20 000 - 50 000 €',
    'Plus de 50 000 €'
  ];

  const timelineOptions = [
    'Moins de 1 mois',
    '1-3 mois',
    '3-6 mois',
    '6-12 mois',
    'Plus de 12 mois',
    'Non déterminé'
  ];

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className={`min-h-screen ${getBgColor()} ${getTextColor()}`}>
      <Head>
        <title>Demande de Devis | Open Numeric</title>
        <meta name="description" content="Obtenez un devis personnalisé pour votre projet digital. Notre équipe vous répond sous 24h." />
      </Head>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className={`absolute inset-0 opacity-10 ${theme === 'light' ? 'bg-gray-900' : 'bg-white'}`}></div>
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_70%,black)]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Demandez un devis</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Remplissez ce formulaire pour recevoir une estimation personnalisée de votre projet sous 24 heures.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="relative">
          <div className={`h-2 rounded-full ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'}`}>
            <motion.div 
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
              initial={{ width: '0%' }}
              animate={{ width: `${(currentStep / 3) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="flex justify-between mt-4">
            {[1, 2, 3].map(step => (
              <div key={step} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= step ? 'bg-blue-600 text-white' : theme === 'light' ? 'bg-gray-200 text-gray-600' : 'bg-gray-700 text-gray-300'}`}>
                  {step}
                </div>
                <span className={`mt-2 text-sm ${currentStep === step ? 'font-bold' : ''}`}>
                  {step === 1 ? 'Informations' : step === 2 ? 'Projet' : 'Finalisation'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {isSubmitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={`p-8 rounded-2xl shadow-xl text-center ${getCardBg()} border ${getBorderColor()}`}
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Merci pour votre demande !</h2>
              <p className="text-lg mb-6">
                Nous avons bien reçu votre demande de devis. Notre équipe l'analyse et reviendra vers vous avec une proposition personnalisée sous 24 heures.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentStep(1);
                  setFormData({
                    name: '',
                    company: '',
                    email: '',
                    phone: '',
                    projectType: '',
                    budget: '',
                    timeline: '',
                    description: ''
                  });
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-xl"
              >
                Nouvelle demande
              </button>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={`p-8 rounded-2xl shadow-xl ${getCardBg()} border ${getBorderColor()}`}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 relative pb-2">
                {currentStep === 1 && 'Vos coordonnées'}
                {currentStep === 2 && 'Détails du projet'}
                {currentStep === 3 && 'Résumé & Envoi'}
                <span className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full"></span>
              </h2>
              
              <form onSubmit={handleSubmit}>
                {/* Étape 1: Coordonnées */}
                {currentStep === 1 && (
                  <motion.div variants={itemVariants} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block mb-2 font-medium">Nom complet *</label>
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
                      <label htmlFor="company" className="block mb-2 font-medium">Entreprise</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className={getInputClasses()}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className="block mb-2 font-medium">Email *</label>
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
                        <label htmlFor="phone" className="block mb-2 font-medium">Téléphone</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={getInputClasses()}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Étape 2: Détails du projet */}
                {currentStep === 2 && (
                  <motion.div variants={itemVariants} className="space-y-6">
                    <div>
                      <label htmlFor="projectType" className="block mb-2 font-medium">Type de projet *</label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className={getInputClasses()}
                        required
                      >
                        <option value="">Sélectionnez un type de projet</option>
                        {projectTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="budget" className="block mb-2 font-medium">Budget estimé *</label>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className={getInputClasses()}
                          required
                        >
                          <option value="">Sélectionnez une fourchette</option>
                          {budgetRanges.map(range => (
                            <option key={range} value={range}>{range}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="timeline" className="block mb-2 font-medium">Délai souhaité *</label>
                        <select
                          id="timeline"
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleChange}
                          className={getInputClasses()}
                          required
                        >
                          <option value="">Sélectionnez un délai</option>
                          {timelineOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="description" className="block mb-2 font-medium">Description du projet *</label>
                      <textarea
                        id="description"
                        name="description"
                        rows={5}
                        value={formData.description}
                        onChange={handleChange}
                        className={`${getInputClasses()} min-h-[150px]`}
                        placeholder="Décrivez votre projet en détail, vos objectifs, vos besoins spécifiques..."
                        required
                      ></textarea>
                    </div>
                  </motion.div>
                )}

                {/* Étape 3: Récapitulatif */}
                {currentStep === 3 && (
                  <motion.div variants={itemVariants} className="space-y-6">
                    <div className={`p-6 rounded-xl ${theme === 'light' ? 'bg-blue-50' : 'bg-blue-900/20'} border border-blue-500/30`}>
                      <h3 className="text-lg font-bold mb-4 text-blue-500">Récapitulatif de votre demande</h3>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between border-b pb-2 border-blue-500/20">
                          <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Nom</span>
                          <span className="font-medium">{formData.name}</span>
                        </div>
                        
                        {formData.company && (
                          <div className="flex justify-between border-b pb-2 border-blue-500/20">
                            <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Entreprise</span>
                            <span className="font-medium">{formData.company}</span>
                          </div>
                        )}
                        
                        <div className="flex justify-between border-b pb-2 border-blue-500/20">
                          <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Email</span>
                          <span className="font-medium">{formData.email}</span>
                        </div>
                        
                        {formData.phone && (
                          <div className="flex justify-between border-b pb-2 border-blue-500/20">
                            <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Téléphone</span>
                            <span className="font-medium">{formData.phone}</span>
                          </div>
                        )}
                        
                        <div className="flex justify-between border-b pb-2 border-blue-500/20">
                          <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Type de projet</span>
                          <span className="font-medium">{formData.projectType}</span>
                        </div>
                        
                        <div className="flex justify-between border-b pb-2 border-blue-500/20">
                          <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Budget estimé</span>
                          <span className="font-medium">{formData.budget}</span>
                        </div>
                        
                        <div className="flex justify-between border-b pb-2 border-blue-500/20">
                          <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Délai souhaité</span>
                          <span className="font-medium">{formData.timeline}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="consent"
                        required
                        className={`w-5 h-5 rounded ${getBorderColor()} ${theme === 'light' ? 'bg-white' : 'bg-gray-800/20'} focus:ring-blue-500`}
                      />
                      <label htmlFor="consent" className="ml-2 text-sm">
                        J'accepte que mes données soient utilisées pour traiter ma demande et j'ai pris connaissance de la politique de confidentialité.
                      </label>
                    </div>
                  </motion.div>
                )}

                {/* Navigation entre étapes */}
                <div className="flex justify-between mt-12">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className={`px-6 py-3 rounded-lg font-medium ${theme === 'light' ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-800 hover:bg-gray-700'} transition-all`}
                    >
                      Précédent
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-xl"
                      disabled={
                        (currentStep === 1 && (!formData.name || !formData.email)) ||
                        (currentStep === 2 && (!formData.projectType || !formData.budget || !formData.timeline || !formData.description))
                      }
                    >
                      Suivant
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-xl"
                    >
                      Envoyer la demande
                    </button>
                  )}
                </div>
              </form>
            </motion.div>
          )}
        </div>
      </section>

      {/* Assurance Section */}
      <section className={`py-16 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800/30'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
                title: 'Confidentialité assurée',
                description: 'Vos informations sont sécurisées et ne seront jamais partagées sans votre consentement.'
              },
              {
                icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
                title: 'Réponse sous 24h',
                description: 'Notre équipe s\'engage à vous répondre dans un délai maximum de 24 heures ouvrables.'
              },
              {
                icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
                title: 'Devis gratuit',
                description: 'Notre estimation est complètement gratuite et sans engagement de votre part.'
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className={`p-6 rounded-xl border ${getBorderColor()} ${getCardBg()} transition-all hover:shadow-lg`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${theme === 'light' ? 'bg-blue-100 text-blue-600' : 'bg-blue-900/30 text-blue-400'} mb-4`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>{item.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default QuotePage;