'use client'

import { useState } from 'react';
import { useTheme } from '../components/context/ThemeContext';
import Head from 'next/head';
import Image from 'next/image';

const BlogPage = () => {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState('Tous');

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

  const getHoverEffect = () => {
    switch(theme) {
      case 'light': return 'hover:shadow-lg hover:-translate-y-1';
      case 'violet-dark': return 'hover:shadow-violet-900/30 hover:-translate-y-1';
      case 'pink-dark': return 'hover:shadow-pink-900/30 hover:-translate-y-1';
      case 'blue-dark': return 'hover:shadow-blue-900/30 hover:-translate-y-1';
      default: return 'hover:shadow-gray-900/30 hover:-translate-y-1';
    }
  };

  // Données des articles de blog
  const blogPosts = [
    {
      id: 1,
      title: "L'avenir de l'IA dans le développement web",
      excerpt: "Découvrez comment l'intelligence artificielle révolutionne la façon dont nous concevons et développons les applications web modernes.",
      category: "Technologie",
      date: "15 Mai 2024",
      readTime: "8 min",
      image: "/images/blog/ai-web.jpg",
      author: {
        name: "Jean Tech",
        avatar: "/images/authors/jean-tech.jpg"
      }
    },
    {
      id: 2,
      title: "Optimisation des performances React en 2024",
      excerpt: "Les meilleures pratiques et nouvelles fonctionnalités pour rendre vos applications React plus rapides et efficaces.",
      category: "Développement",
      date: "10 Mai 2024",
      readTime: "10 min",
      image: "/images/blog/react-opti.jpg",
      author: {
        name: "Marie Code",
        avatar: "/images/authors/marie-code.jpg"
      }
    },
    {
      id: 3,
      title: "Design System: Créer une cohérence visuelle",
      excerpt: "Comment implémenter un design system efficace pour vos projets et améliorer l'expérience utilisateur.",
      category: "Design",
      date: "5 Mai 2024",
      readTime: "6 min",
      image: "/images/blog/design-system.jpg",
      author: {
        name: "Paul Design",
        avatar: "/images/authors/paul-design.jpg"
      }
    },
    {
      id: 4,
      title: "SEO avancé pour les applications Next.js",
      excerpt: "Techniques avancées pour optimiser le référencement de vos applications Next.js et améliorer votre visibilité.",
      category: "Marketing",
      date: "28 Avril 2024",
      readTime: "12 min",
      image: "/images/blog/next-seo.jpg",
      author: {
        name: "Sophie SEO",
        avatar: "/images/authors/sophie-seo.jpg"
      }
    },
    {
      id: 5,
      title: "Gestion d'état avec Zustand",
      excerpt: "Pourquoi Zustand devient la solution de gestion d'état préférée des développeurs React en 2024.",
      category: "Développement",
      date: "20 Avril 2024",
      readTime: "7 min",
      image: "/images/blog/zustand.jpg",
      author: {
        name: "Thomas State",
        avatar: "/images/authors/thomas-state.jpg"
      }
    },
    {
      id: 6,
      title: "Accessibilité web: Au-delà des bases",
      excerpt: "Approfondissez vos connaissances en accessibilité web pour créer des expériences inclusives pour tous les utilisateurs.",
      category: "Design",
      date: "12 Avril 2024",
      readTime: "9 min",
      image: "/images/blog/accessibility.jpg",
      author: {
        name: "Emma Inclusive",
        avatar: "/images/authors/emma-inclusive.jpg"
      }
    }
  ];

  const categories = ['Tous', ...new Set(blogPosts.map(post => post.category))];

  const filteredPosts = activeCategory === 'Tous' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <div className={`min-h-screen ${getBgColor()} ${getTextColor()}`}>
      <Head>
        <title>Blog Open Numeric - Expertise et Actualités Numériques</title>
        <meta name="description" content="Découvrez nos articles experts sur le développement web, le design, le marketing digital et les dernières tendances technologiques." />
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
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Notre Blog</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Explorez nos articles experts et restez informé des dernières tendances en développement, design et stratégie numérique.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Catégories */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full font-medium transition-all ${activeCategory === category 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                  : `${theme === 'light' ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-800 hover:bg-gray-700'} ${getTextColor()}`}`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Articles de blog */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map(post => (
              <article 
                key={post.id} 
                className={`rounded-2xl overflow-hidden border ${getBorderColor()} ${getCardBg()} transition-all duration-300 ${getHoverEffect()}`}
              >
                <div className="relative h-60 w-full">
                  <Image 
                    src={post.image} 
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                    {post.category}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3 text-sm">
                    <span className={`${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>{post.date}</span>
                    <span className={`${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>{post.readTime} de lecture</span>
                  </div>
                  
                  <h2 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h2>
                  <p className={`mb-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} line-clamp-3`}>{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-700/20">
                    <div className="flex items-center">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                        <Image 
                          src={post.author.avatar}
                          alt={post.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-medium">{post.author.name}</span>
                    </div>
                    <button className={`px-4 py-2 rounded-lg font-medium ${theme === 'light' 
                      ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' 
                      : 'bg-gray-800 hover:bg-gray-700 text-gray-300'}`}>
                      Lire l'article
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-16">
            <nav className="flex items-center space-x-2">
              <button className={`p-2 rounded-lg ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'} ${getTextColor()}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className={`px-4 py-2 rounded-lg font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white`}>
                1
              </button>
              <button className={`px-4 py-2 rounded-lg font-medium ${theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-gray-800'} ${getTextColor()}`}>
                2
              </button>
              <button className={`px-4 py-2 rounded-lg font-medium ${theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-gray-800'} ${getTextColor()}`}>
                3
              </button>
              <span className={`px-2 ${getTextColor()}`}>...</span>
              <button className={`px-4 py-2 rounded-lg font-medium ${theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-gray-800'} ${getTextColor()}`}>
                8
              </button>
              <button className={`p-2 rounded-lg ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'} ${getTextColor()}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className={`py-16 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800/30'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`inline-flex items-center px-4 py-2 rounded-full mb-6 ${theme === 'light' ? 'bg-blue-50 text-blue-600' : 'bg-blue-900/30 text-blue-300'}`}>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Newsletter
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Restez informé</h2>
          <p className={`text-xl mb-8 max-w-2xl mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            Abonnez-vous à notre newsletter pour recevoir nos derniers articles et des conseils exclusifs directement dans votre boîte mail.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Votre email" 
              className={`flex-grow px-5 py-3 rounded-lg border ${getBorderColor()} ${theme === 'light' ? 'bg-white' : 'bg-gray-800/20'} ${getTextColor()} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
            <button 
              type="submit" 
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              S'abonner
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;