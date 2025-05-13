'use client'

import Image from "next/image";
import Head from 'next/head';
import { useTheme } from './components/context/ThemeContext';

import hero from './images/hero.jpg';

// For teams
import dev from './images/dev.jpg';
import design from './images/designer.jpg';
import trainer from './images/formateur.jpg';
import repair from './images/maintient.jpg';


// Données pour les sections
const teamMembers = [
  {
    name: "Nestor COMPAORE",
    role: "CEO & Développeur Principal",
    bio: "Expert en développement full-stack avec 4 ans d'expérience dans la création de solutions complexes.",
    img: dev
  },
  {
    name: "Sophie Martin",
    role: "Designer UX/UI",
    bio: "Spécialiste en design d'interface et expérience utilisateur, passionnée par les designs intuitifs.",
    img: design
  },
  {
    name: "Thomas Leroy",
    role: "Responsable Formation",
    bio: "Formateur certifié avec une approche pédagogique adaptée à tous les niveaux.",
    img: trainer
  },
  {
    name: "Camille Petit",
    role: "Responsable Support Technique",
    bio: "Garant de la qualité et de la réactivité de notre support client.",
    img: repair
  }
];


// For Clients
import custo1 from './images/custo1.png';
import custo2 from './images/custo2.png';
import custo3 from './images/custo3.jpg';
import custo4 from './images/custo4.jpg';
import custo5 from './images/custo5.jpg';

const clients = [
  { name: "TechCorp", logo: custo1 },
  { name: "Innovate", logo: custo2 },
  { name: "DigitalSphere", logo: custo3 },
  { name: "WebSolutions", logo: custo4 },
  { name: "FutureNow", logo: custo5 }
];

//For Testi
import test1 from './images/test1.jpg';
import test2 from './images/test2.jpg';
import test3 from './images/test3.jpg';


const testimonials = [
  {
    quote: "Open Numeric a transformé notre présence en ligne avec une application sur mesure qui a boosté nos ventes de 40%.",
    author: "Jean Lambert",
    company: "CEO, TechCorp",
    img: test2
  },
  {
    quote: "Leur équipe de design a créé une identité visuelle qui représente parfaitement nos valeurs et attire nos clients cibles.",
    author: "Marie Dubois",
    company: "Directrice Marketing, Innovate",
    img: test1
  },
  {
    quote: "Les formations étaient parfaitement adaptées à nos besoins et ont permis à nos équipes de gagner en productivité.",
    author: "Pierre Garnier",
    company: "DRH, DigitalSphere",
    img: test3
  }
];

const services = [
  {
    name: "Développement",
    description: "Applications mobiles, logiciels sur mesure, API et services web conçus pour votre entreprise.",
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
  },
  {
    name: "Design",
    description: "Identité visuelle, interfaces utilisateur et expériences digitales mémorables pour vos clients.",
    icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
  },
  {
    name: "Formations",
    description: "Modules de formation adaptés pour maîtriser les outils et technologies numériques.",
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
  },
  {
    name: "Maintenance",
    description: "Support technique, réparation et configuration de vos équipements informatiques.",
    icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
  }
];

export default function Home() {
  const { theme } = useTheme();
  
  // Classes dynamiques en fonction du thème
  const getSectionClasses = () => {
    switch(theme) {
      case 'light':
        return 'bg-white text-gray-800';
      case 'violet-dark':
        return 'bg-violet-900 text-violet-100';
      case 'pink-dark':
        return 'bg-pink-900 text-pink-100';
      case 'blue-dark':
        return 'bg-blue-900 text-blue-100';
      default: // dark
        return 'bg-gray-900 text-gray-100';
    }
  };

  const getBorderClasses = () => {
    switch(theme) {
      case 'light':
        return 'border-gray-200';
      case 'violet-dark':
        return 'border-violet-800';
      case 'pink-dark':
        return 'border-pink-800';
      case 'blue-dark':
        return 'border-blue-800';
      default: // dark
        return 'border-gray-800';
    }
  };

  const getCardClasses = () => {
    switch(theme) {
      case 'light':
        return 'bg-white border-gray-200 hover:border-gray-300';
      case 'violet-dark':
        return 'bg-violet-800/70 border-violet-700 hover:border-violet-600';
      case 'pink-dark':
        return 'bg-pink-800/70 border-pink-700 hover:border-pink-600';
      case 'blue-dark':
        return 'bg-blue-800/70 border-blue-700 hover:border-blue-600';
      default: // dark
        return 'bg-gray-800/50 border-gray-700 hover:border-gray-600';
    }
  };

  return (
    <div className={getSectionClasses()}>
      <Head>
        <title>Open Numeric - Solutions Numériques Complètes</title>
        <meta name="description" content="Open Numeric propose des services de développement, design, formation et maintenance pour vos besoins numériques." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 to-gray-950"></div>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-gradient-radial from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Solutions Numériques <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">Sur Mesure</span>
              </h1>
              <p className={`text-xl md:text-2xl ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} mb-8 max-w-lg mx-auto md:mx-0`}>
                Développement, design, formation et maintenance - tout ce dont vous avez besoin pour réussir votre transformation digitale.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
                <a
                  href="/services"
                  className="px-8 py-4 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-blue-500/30 text-center"
                >
                  Découvrir nos services
                </a>
                <a
                  href="/contact"
                  className="px-8 py-4 rounded-lg border-2 border-blue-400/50 text-blue-300 font-semibold hover:border-blue-400 hover:text-white hover:bg-blue-500/10 transition-all text-center"
                >
                  Nous contacter
                </a>
              </div>
            </div>
            <div className="mt-12 md:mt-0 relative">
              <div className="relative">
                <div className="absolute -inset-4 bg-blue-500/30 rounded-2xl blur-xl"></div>
                <Image className="relative w-full h-auto max-w-md mx-auto rounded-lg" src={hero} alt="Solutions" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={`py-20 backdrop-blur-sm border-y ${getBorderClasses()}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Nos <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">Services</span>
            </h2>
            <p className={`mt-4 max-w-2xl text-xl ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} mx-auto`}>
              Une gamme complète de services numériques pour répondre à tous vos besoins.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <div
                key={service.name}
                className={`rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border ${getCardClasses()}`}
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/20 text-blue-400 mb-6 group-hover:from-blue-500/30 group-hover:to-blue-600/30 transition-all">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={service.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-3">{service.name}</h3>
                <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>
                  {service.description}
                </p>
                <div className="mt-4">
                  <a
                    href={`/services/${service.name.toLowerCase()}`}
                    className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    En savoir plus
                    <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="/services"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-blue-500/30"
            >
              Voir tous nos services
              <svg className="ml-3 -mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Notre <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">Équipe</span>
            </h2>
            <p className={`mt-4 max-w-2xl text-xl ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} mx-auto`}>
              Rencontrez les experts passionnés qui donnent vie à vos projets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div 
                key={member.name}
                className={`rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl ${getCardClasses()}`}
              >
                <div className="relative h-64 w-full">
                  <Image 
                    src={member.img} 
                    alt={member.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className={`text-sm mb-4 ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`}>{member.role}</p>
                  <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>{member.bio}</p>
                  <div className="mt-4 flex space-x-3">
                    <a href="#" className="text-blue-400 hover:text-blue-300">
                      <span className="sr-only">LinkedIn</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                    <a href="#" className="text-blue-400 hover:text-blue-300">
                      <span className="sr-only">Twitter</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className={`py-16 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800/30'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ils nous <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">font confiance</span>
            </h2>
            <p className={`mt-4 max-w-2xl text-xl ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} mx-auto`}>
              Des entreprises innovantes qui nous ont choisi pour leurs projets numériques.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-center">
            {clients.map((client) => (
              <div key={client.name} className="flex items-center justify-center p-4">
                <div className="relative h-16 w-32">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    layout="fill"
                    objectFit="contain"
                    className={`opacity-70 hover:opacity-100 transition-opacity ${theme === 'light' ? 'filter brightness-0' : ''}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Témoignages <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">Clients</span>
            </h2>
            <p className={`mt-4 max-w-2xl text-xl ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} mx-auto`}>
              Ce que nos clients disent de notre travail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`rounded-xl p-8 shadow-lg ${getCardClasses()}`}
              >
                <div className="mb-6">
                  <svg className="h-8 w-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                </div>
                <blockquote className="mb-6">
                  <p className={theme === 'light' ? 'text-gray-700' : 'text-gray-300'}>{testimonial.quote}</p>
                </blockquote>
                <div className="flex items-center">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.img}
                      alt={testimonial.author}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 bg-gradient-to-br ${theme === 'light' ? 'from-blue-50 to-blue-100' : 'from-gray-900 to-gray-950'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-orange-500 rounded-lg blur opacity-25"></div>
            <div className={`relative ${theme === 'light' ? 'bg-white' : 'bg-gray-900/80'} backdrop-blur-sm border ${getBorderClasses()} rounded-lg p-8 md:p-12`}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Prêt à <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">transformer</span> votre entreprise ?
              </h2>
              <p className={`text-xl ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} mb-8`}>
                Contactez-nous dès aujourd'hui pour discuter de votre projet et découvrir comment nous pouvons vous aider à atteindre vos objectifs numériques.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <a
                  href="/contact"
                  className="px-8 py-4 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-blue-500/30 text-center"
                >
                  Nous contacter
                </a>
                <a
                  href="/devis"
                  className="px-8 py-4 rounded-lg bg-gradient-to-r from-orange-500 to-orangered-500 text-white font-semibold hover:from-orange-600 hover:to-orangered-600 transition-all shadow-lg hover:shadow-orange-500/20 text-center"
                >
                  Demander un devis
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}