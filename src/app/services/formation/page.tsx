'use client';

import { useState } from 'react';
import { useTheme } from '../../components/context/ThemeContext';
import Head from 'next/head';
import {
    BookOpen,
    GraduationCap,
    Code,
    Smartphone,
    Server,
    Cloud,
    Users,
    Globe,
    Book,
    Presentation,
    Monitor,
    Database
} from 'lucide-react';
import { motion } from 'framer-motion';

const TrainingPage = () => {
    const { theme } = useTheme();
    const [activeCategory, setActiveCategory] = useState('tech');
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    // Couleurs dynamiques en fonction du thème
    const getBgColor = () => {
        switch (theme) {
            case 'light': return 'bg-white';
            case 'violet-dark': return 'bg-violet-900';
            case 'pink-dark': return 'bg-pink-900';
            case 'blue-dark': return 'bg-blue-900';
            default: return 'bg-gray-900';
        }
    };

    const getTextColor = () => {
        switch (theme) {
            case 'light': return 'text-gray-800';
            case 'violet-dark': return 'text-violet-100';
            case 'pink-dark': return 'text-pink-100';
            case 'blue-dark': return 'text-blue-100';
            default: return 'text-gray-200';
        }
    };

    const getCardBg = () => {
        switch (theme) {
            case 'light': return 'bg-gray-50';
            case 'violet-dark': return 'bg-violet-800/30';
            case 'pink-dark': return 'bg-pink-800/30';
            case 'blue-dark': return 'bg-blue-800/30';
            default: return 'bg-gray-800/30';
        }
    };

    const getBorderColor = () => {
        switch (theme) {
            case 'light': return 'border-gray-200';
            case 'violet-dark': return 'border-violet-700';
            case 'pink-dark': return 'border-pink-700';
            case 'blue-dark': return 'border-blue-700';
            default: return 'border-gray-700';
        }
    };

    // Catégories de formation
    const trainingCategories = {
        tech: [
            { name: 'Formations Frontend', icon: Monitor, description: 'Maîtrisez React, Angular, Vue et les frameworks modernes.' },
            { name: 'Formations Backend', icon: Server, description: 'Node.js, Python, Java et architectures serveur.' },
            { name: 'Mobile & Cross-platform', icon: Smartphone, description: 'Développez des apps avec React Native, Flutter.' },
            { name: 'Cloud & DevOps', icon: Cloud, description: 'Docker, Kubernetes, CI/CD et déploiements cloud.' },
        ],
        education: [
            { name: 'Initiation au codage', icon: Code, description: 'Découverte ludique de la programmation pour débutants.' },
            { name: 'Outils collaboratifs', icon: Users, description: 'Maîtrise des plateformes éducatives numériques.' },
            { name: 'Gestion de classe numérique', icon: Book, description: 'Optimisez votre enseignement avec le numérique.' },
            { name: 'Ressources pédagogiques', icon: Presentation, description: 'Création de contenus éducatifs interactifs.' },
        ]
    };

    // Programmes de formation
    const programs = [
        {
            title: 'Formations Frontend Avancées',
            description: 'Maîtrise complète des écosystèmes React, Angular et Vue avec les bonnes pratiques.',
            features: [
                'React/Next.js (SSR, ISR, SSG)',
                'State management avancé',
                'Performance optimisation',
                'Tests automatisés',
                'Architecture modulaire'
            ],
            icon: Monitor,
            gradient: 'from-blue-500 to-cyan-500'
        },
        {
            title: 'Ateliers Backend & API',
            description: 'Développement d\'APIs robustes et sécurisées avec les technologies modernes.',
            features: [
                'Node.js/NestJS/Express',
                'GraphQL & REST',
                'Authentification JWT/OAuth',
                'Bases de données SQL/NoSQL',
                'Optimisation des performances'
            ],
            icon: Server,
            gradient: 'from-green-500 to-emerald-500'
        },
        {
            title: 'Mobile Cross-platform',
            description: 'Développement d\'applications natives avec React Native et Flutter.',
            features: [
                'Architecture des apps mobiles',
                'Accès aux APIs natives',
                'Animations fluides',
                'Publication sur les stores',
                'Tests sur devices'
            ],
            icon: Smartphone,
            gradient: 'from-purple-500 to-pink-500'
        },
        {
            title: 'Parcours DevOps',
            description: 'Automatisation des déploiements et infrastructure cloud scalable.',
            features: [
                'Docker & Kubernetes',
                'CI/CD (GitHub Actions, GitLab)',
                'Infrastructure as Code',
                'Monitoring & logging',
                'Sécurité cloud'
            ],
            icon: Cloud,
            gradient: 'from-orange-500 to-amber-500'
        }
    ];

    // Méthodologie pédagogique
    const methodology = [
        {
            title: "Évaluation des besoins",
            description: "Analyse des prérequis et objectifs d'apprentissage",
            icon: BookOpen
        },
        {
            title: "Contenu sur mesure",
            description: "Adaptation du programme aux besoins spécifiques",
            icon: GraduationCap
        },
        {
            title: "Apprentissage pratique",
            description: "Exercices concrets et projets réels",
            icon: Code
        },
        {
            title: "Support continu",
            description: "Ressources et accompagnement post-formation",
            icon: Users
        },
        {
            title: "Validation des acquis",
            description: "Certification et évaluation des compétences",
            icon: Presentation
        }
    ];

    // Technologies couvertes
    const techStack = [
        { name: 'React', icon: '/images/react.png' },
        { name: 'Node.js', icon: '/images/node.png' },
        { name: 'Flutter', icon: '/images/flutter.png' },
        { name: 'Docker', icon: '/images/docker.png' },
        { name: 'Python', icon: '/images/python.png' },
        { name: 'Angular', icon: '/images/angular1.png' },
        { name: 'Kubernetes', icon: '/images/kubernetes.png' },
        { name: 'AWS', icon: '/images/aws.png' },
        { name: 'GraphQL', icon: '/images/graphql.png' },
        { name: 'Firebase', icon: '/images/firebase.png' }
    ];

    return (
        <div className={`min-h-screen ${getBgColor()} ${getTextColor()} transition-colors duration-300`}>
            <Head>
                <title>Formations en Informatique | Open Numeric</title>
                <meta name="description" content="Découvrez nos programmes de formation en développement web, mobile et technologies cloud." />
            </Head>

            {/* Hero Section */}
            <section className="relative pt-14 pb-20 overflow-hidden">
                <div className="absolute inset-0 -z-10">
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
                            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                Formations Expertes en Tech
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                            Montez en compétences avec nos programmes complets et formateurs expérimentés.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="mt-16 flex justify-center"
                    >
                        <div className="relative w-full max-w-4xl h-64 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 opacity-30 blur-xl"></div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Code className="w-32 h-32 text-white opacity-80" />
                            </div>
                            <motion.div
                                animate={{
                                    x: [0, 20, 0, -20, 0],
                                    y: [0, 10, 0, -10, 0],
                                    rotate: [0, 5, 0, -5, 0]
                                }}
                                transition={{
                                    duration: 15,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute top-1/4 left-1/4 w-16 h-16 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
                            >
                                <BookOpen className="w-8 h-8 text-white" />
                            </motion.div>
                            <motion.div
                                animate={{
                                    x: [0, -15, 0, 15, 0],
                                    y: [0, -15, 0, 15, 0],
                                    rotate: [0, -3, 0, 3, 0]
                                }}
                                transition={{
                                    duration: 12,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 0.5
                                }}
                                className="absolute bottom-1/4 right-1/4 w-20 h-20 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
                            >
                                <GraduationCap className="w-10 h-10 text-white" />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Domaines de Formation</h2>
                        <p className={`text-xl max-w-3xl mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                            Des programmes adaptés à tous les niveaux et besoins.
                        </p>
                    </motion.div>

                    <div className="flex justify-center mb-8">
                        <div className="inline-flex rounded-xl p-1" style={{
                            background: theme === 'light' ? 'rgba(243, 244, 246, 0.8)' : 'rgba(31, 41, 55, 0.8)'
                        }}>
                            {Object.keys(trainingCategories).map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-5 py-3 rounded-lg font-medium capitalize transition-all mx-1 ${activeCategory === category
                                        ? `bg-gradient-to-r ${theme === 'light' ? 'from-cyan-500 to-blue-500' : 'from-cyan-400 to-blue-400'} text-white shadow-lg`
                                        : `${theme === 'light' ? 'bg-white/0 hover:bg-gray-100 text-gray-700' : 'bg-gray-900/0 hover:bg-gray-800 text-gray-300'}`}`}
                                >
                                    {category === 'tech' ? 'Formations Tech' : 'Éducation Numérique'}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {trainingCategories[activeCategory as keyof typeof trainingCategories].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5 }}
                                className={`p-6 rounded-xl border ${getBorderColor()} ${getCardBg()} transition-all duration-300 hover:shadow-lg flex flex-col items-center text-center`}
                            >
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-500 text-white mb-4`}>
                                    <item.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                                <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Programs Section */}
            <section className={`py-16 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800/20'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Programmes Tech</h2>
                        <p className={`text-xl max-w-3xl mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                            Des formations intensives pour maîtriser les technologies modernes.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {programs.map((program, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5 }}
                                onHoverStart={() => setHoveredCard(index)}
                                onHoverEnd={() => setHoveredCard(null)}
                                className={`rounded-2xl overflow-hidden border ${getBorderColor()} ${getCardBg()} transition-all duration-300 hover:shadow-xl relative`}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br opacity-10 from-transparent to-transparent"></div>
                                <div className="p-8 relative">
                                    <div className="flex items-start">
                                        <div className={`text-4xl mr-6 flex-shrink-0 bg-gradient-to-br ${program.gradient} rounded-lg w-16 h-16 flex items-center justify-center text-white`}>
                                            <program.icon className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold mb-2">{program.title}</h3>
                                            <p className={`mb-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>{program.description}</p>

                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{
                                                    height: hoveredCard === index ? 'auto' : 0,
                                                    opacity: hoveredCard === index ? 1 : 0
                                                }}
                                                className="overflow-hidden"
                                            >
                                                <ul className="space-y-2 mb-6">
                                                    {program.features.map((feature, i) => (
                                                        <li key={i} className="flex items-start">
                                                            <svg className={`w-5 h-5 mt-0.5 mr-2 flex-shrink-0 ${theme === 'light' ? 'text-cyan-500' : 'text-cyan-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                            </svg>
                                                            <span>{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </motion.div>

                                            <button
                                                className={`px-5 py-2 rounded-lg font-medium ${theme === 'light'
                                                    ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                                    : 'bg-gray-800 hover:bg-gray-700 text-gray-300'} transition-all flex items-center`}
                                            >
                                                <span>Voir le programme détaillé</span>
                                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Methodology Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Notre Méthodologie Pédagogique</h2>
                        <p className={`text-xl max-w-3xl mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                            Une approche pratique et adaptée pour un apprentissage efficace.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {methodology.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5 }}
                                className={`p-6 rounded-2xl border ${getBorderColor()} ${getCardBg()} transition-all duration-300 hover:shadow-lg flex flex-col items-center text-center`}
                            >
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-500 text-white mb-4`}>
                                    <step.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech Stack Section */}
            <section className={`py-16 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800/20'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Technologies Couvertes</h2>
                        <p className={`text-xl max-w-3xl mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                            Nous formons sur les technologies les plus demandées du marché.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {techStack.map((tech, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05 }}
                                className={`p-4 rounded-xl border ${getBorderColor()} ${getCardBg()} transition-all duration-300 hover:shadow-lg flex flex-col items-center`}
                            >
                                <div className="w-16 h-16 mb-3 flex items-center justify-center">
                                    <img src={tech.icon} alt={tech.name} className="w-full h-full object-contain" />
                                </div>
                                <h3 className="text-lg font-medium">{tech.name}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className={`p-8 rounded-2xl shadow-xl ${getCardBg()} border ${getBorderColor()} relative overflow-hidden`}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 -z-10"></div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">Prêt à développer vos compétences ?</h2>
                        <p className={`text-xl mb-8 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                            Contactez-nous pour discuter de vos besoins en formation.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                Discuter avec un formateur
                            </button>
                            <button className={`px-6 py-3 rounded-lg font-medium ${theme === 'light' ? 'bg-white hover:bg-gray-100 border border-gray-200' : 'bg-gray-800 hover:bg-gray-700 border border-gray-700'} transition-all flex items-center justify-center`}>
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Demander un programme
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default TrainingPage;