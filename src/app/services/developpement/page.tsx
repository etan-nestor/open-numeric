'use client';

import { useState } from 'react';
import { useTheme } from '../../components/context/ThemeContext';
import Head from 'next/head';
import {
    Smartphone,
    Monitor,
    Link2,
    Wrench,
    Ruler,
    FlaskConical,
    Code,
    UploadCloud,
    ChartCandlestick,
} from 'lucide-react';
import { motion } from 'framer-motion';

const DevelopmentPage = () => {
    const { theme } = useTheme();
    const [activeTech, setActiveTech] = useState('frontend');
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


    // Technologies et frameworks
    const technologies = {
        frontend: [
            { name: 'React / Next.js', image: '/images/react.png', description: 'Frameworks performants SSR, ISR et SSG.' },
            { name: 'Angular', image: '/images/angular1.png', description: 'Architecture solide et scalable.' },
            { name: 'Vue / Nuxt', image: '/images/vue.png', description: 'Rendu rapide avec UX soignée.' },
            { name: 'Astro', image: '/images/astro.png', description: 'Sites statiques ultra-rapides.' },
            { name: 'SolidJS', image: '/images/solid.png', description: ' Performance brute, JSX, fine-grained reactivity.' },
            { name: 'Qwik', image: '/images/qwik.png', description: 'Démarrage quasi-instantané, optimal pour SEO.' },
            { name: 'Svelte / SvelteKit', image: '/images/svelte.png', description: ' Ultra léger, réactif, simple, excellent DX.' },
            { name: 'Remix', image: '/images/remix.jpg', description: 'API-first, progressive enhancement, performant et robuste' },
        ],

        backend: [
            { name: 'Node.js / NestJS', image: '/images/nest.png', description: 'API TypeScript scalable et maintenable.' },
            { name: 'Express / Fastify', image: '/images/node.png', description: 'APIs rapides et simples à déployer.' },
            { name: 'Python / Django / FastAPI', image: '/images/python.png', description: 'Backend rapide, propre et typé.' },
            { name: 'Spring Boot (Java)', image: '/images/spring.png', description: 'Systèmes complexes sécurisés et solides.' },
        ],

        fullstack: [
            { name: 'T3 Stack (Next, TRPC, Tailwind, Prisma)', image: '/images/T3.png', description: 'Architecture fullstack typée, rapide et testable.' },
            { name: 'Mongo Express React Node ++', image: '/images/mern.jfif', description: 'Séparation des responsabilités,modularité et scalabilité.' },
            { name: 'Angular Spring ++', image: '/images/angSpg.jfif', description: 'Gestion efficace de projets multi-packages.' },
            { name: 'Mongo Express Angular Node ++', image: '/images/mean.jfif', description: 'Séparation des responsabilités et scalabilité.' },
        ],

        mobile: [
            { name: 'React Native', image: '/images/react-native.png', description: 'Développement mobile rapide et cross-platform.' },
            { name: 'Flutter', image: '/images/flutter.png', description: 'UI performantes et design uniforme.' },
            { name: 'Swift / Kotlin', image: '/images/swift1.png', description: 'Apps natives iOS / Android.' },
            { name: 'Ionic', image: '/images/ionic.png', description: 'PWA + Capacitor, intégration fluide avec Firebase' },

        ],

        devops: [
            { name: 'Docker / Kubernetes', image: '/images/docker.png', description: 'Conteneurisation et orchestration.' },
            { name: 'CI/CD (GitHub Actions, GitLab, etc.)', image: '/images/github.png', description: 'Livraison continue automatisée.' },
            { name: 'Cloud (AWS, GCP, Firebase)', image: '/images/cloud.png', description: 'Infra scalable et intégrée.' },
            { name: 'Nginx / Traefik', image: '/images/nginx.png', description: 'Reverse proxies et gestion de trafic.' },
        ],

        databases: [
            { name: 'PostgreSQL / MySQL', image: '/images/postgres.png', description: 'Bases relationnelles puissantes et fiables.' },
            { name: 'MongoDB / Firebase', image: '/images/mongo.png', description: 'NoSQL cloud-ready pour apps modernes.' },
            { name: 'Prisma / TypeORM', image: '/images/prisma.png', description: 'ORM modernes pour bases SQL.' },
            { name: 'SQLite / Dexie.js', image: '/images/sqlite.png', description: 'Bases locales et embarquées.' },
        ],

        testing: [
            { name: 'Jest / Vitest', image: '/images/jest.png', description: 'Tests unitaires rapides et fiables.' },
            { name: 'Playwright / Cypress', image: '/images/e2e.png', description: 'Tests end-to-end pour UX solide.' },
            { name: 'ESLint / Prettier', image: '/images/eslint.png', description: 'Code propre et formaté automatiquement.' },
            { name: 'Testing Library', image: '/images/testing.png', description: 'Tests orientés utilisateur pour une meilleure accessibilité.' },
        ],

        tooling: [
            { name: 'Vite / Webpack', image: '/images/vite.png', description: 'Bundlers ultra-rapides pour dev moderne.' },
            { name: 'ESBuild / SWC', image: '/images/esbuild.png', description: 'Compilateurs JS/TS nouvelle génération.' },
            { name: 'Zod / Yup', image: '/images/zod.png', description: 'Validation de schémas côté client et serveur.' },
            { name: 'Nx / Turborepo', image: '/images/monorepo.png', description: 'Gestion efficace de monorepos JS/TS.' },
        ],
    };

    // Services de développement
    const services = [
        {
            title: 'Développement Web Sur Mesure',
            description: 'Nous créons des applications web performantes et évolutives adaptées à vos besoins spécifiques.',
            features: [
                'Architecture moderne (Micro-frontends, Monorepo)',
                'Optimisation des performances (Lazy loading, Code splitting)',
                'SEO avancé (SSR, ISR, SSG)',
                'Accessibilité (WCAG AA)',
                'Tests automatisés (Jest, Cypress)'
            ],
            icon: Monitor,
            gradient: 'from-blue-500 to-cyan-500'
        },
        {
            title: 'Applications Mobile Cross-Platform',
            description: 'Des applications natives performantes pour iOS et Android avec une seule base de code.',
            features: [
                'Performance proche du natif',
                'Accès aux APIs du device',
                'Animations fluides',
                'Publication sur les stores',
                'Mises à jour OTA'
            ],
            icon: Smartphone,
            gradient: 'from-purple-500 to-pink-500'
        },
        {
            title: 'APIs & Microservices',
            description: 'Architectures backend modulaires et scalables pour supporter votre croissance.',
            features: [
                'REST & GraphQL',
                'Authentification (JWT, OAuth2)',
                'Bases de données (SQL & NoSQL)',
                'Cache (Redis)',
                'Documentation Swagger/OpenAPI'
            ],
            icon: Link2,
            gradient: 'from-green-500 to-emerald-500'
        },
        {
            title: 'Refactoring & Optimisation',
            description: 'Amélioration de votre code existant pour plus de performance et de maintenabilité.',
            features: [
                'Audit de code',
                'Dette technique réduite',
                'Meilleures pratiques',
                'Tests unitaires/intégration',
                'Documentation technique'
            ],
            icon: Wrench,
            gradient: 'from-orange-500 to-amber-500'
        }
    ];

    // Processus de développement
    const processSteps = [
        {
            title: "Conception",
            description: "Analyse des besoins et définition de l'architecture technique",
            icon: Ruler
        },
        {
            title: "Prototypage",
            description: "Validation des concepts avec des MVP interactifs",
            icon: ChartCandlestick
        },
        {
            title: "Développement",
            description: "Implémentation avec revues de code régulières",
            icon: Code
        },
        {
            title: "Tests",
            description: "Validation qualité automatisée et manuelle",
            icon: FlaskConical
        },
        {
            title: "Déploiement",
            description: "Mise en production avec monitoring",
            icon: UploadCloud
        }
    ];

    return (
        <div className={`min-h-screen ${getBgColor()} ${getTextColor()} transition-colors duration-300`}>
            <Head>
                <title>Expertise en Développement | Open Numeric</title>
                <meta name="description" content="Découvrez notre expertise en développement web, mobile et backend avec les dernières technologies." />
            </Head>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
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
                            <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                                Expertise en Développement
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                            Des solutions technologiques sur mesure pour propulser votre entreprise vers l'avenir.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Technologies Section */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Technologies Maîtrisées</h2>
                        <p className={`text-xl max-w-3xl mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                            Nous utilisons les meilleures technologies pour livrer des produits exceptionnels.
                        </p>
                    </motion.div>

                    <div className="flex justify-center mb-8">
                        <div className="inline-flex rounded-xl p-1" style={{
                            background: theme === 'light' ? 'rgba(243, 244, 246, 0.8)' : 'rgba(31, 41, 55, 0.8)'
                        }}>
                            {Object.keys(technologies).map((tech) => (
                                <button
                                    key={tech}
                                    onClick={() => setActiveTech(tech)}
                                    className={`px-5 py-3 rounded-lg font-medium capitalize transition-all mx-1 ${activeTech === tech
                                        ? `bg-gradient-to-r ${theme === 'light' ? 'from-blue-500 to-blue-600' : 'from-blue-400 to-blue-500'} text-white shadow-lg`
                                        : `${theme === 'light' ? 'bg-white/0 hover:bg-gray-100 text-gray-700' : 'bg-gray-900/0 hover:bg-gray-800 text-gray-300'}`}`}
                                >
                                    {tech}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {technologies[activeTech as keyof typeof technologies].map((tech, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5 }}
                                className={`p-6 rounded-xl border ${getBorderColor()} ${getCardBg()} transition-all duration-300 hover:shadow-lg`}
                            >
                                <div className="mb-4">
                                    <img
                                        src={tech.image}
                                        alt={tech.name}
                                        className="w-10 h-10 object-contain mx-auto"
                                    />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{tech.name}</h3>
                                <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>{tech.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className={`py-16 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800/20'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Services de Développement</h2>
                        <p className={`text-xl max-w-3xl mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                            Des solutions complètes pour tous vos besoins technologiques.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {services.map((service, index) => (
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
                                        <div className={`text-4xl mr-6 flex-shrink-0 bg-gradient-to-br ${service.gradient} rounded-lg w-16 h-16 flex items-center justify-center text-white`}>
                                            <service.icon className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                                            <p className={`mb-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>{service.description}</p>

                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{
                                                    height: hoveredCard === index ? 'auto' : 0,
                                                    opacity: hoveredCard === index ? 1 : 0
                                                }}
                                                className="overflow-hidden"
                                            >
                                                <ul className="space-y-2 mb-6">
                                                    {service.features.map((feature, i) => (
                                                        <li key={i} className="flex items-start">
                                                            <svg className={`w-5 h-5 mt-0.5 mr-2 flex-shrink-0 ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                                <span>En savoir plus</span>
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

            {/* Process Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Notre Processus de Développement</h2>
                        <p className={`text-xl max-w-3xl mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                            Une méthodologie rigoureuse pour des résultats exceptionnels.
                        </p>
                    </motion.div>

                    <div className="relative">
                        <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-blue-500 to-cyan-500"></div>

                        <div className="space-y-8">
                            {processSteps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className={`relative flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                                >
                                    <div className={`w-full md:w-1/2 p-6 rounded-2xl border ${getBorderColor()} ${getCardBg()} shadow-lg`}>
                                        <div className="flex items-center mb-4">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-500 text-white mr-4`}>
                                                <span className="text-xl">
                                                    <step.icon className="w-8 h-8" />
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold">{step.title}</h3>
                                        </div>
                                        <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>{step.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
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
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 -z-10"></div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">Prêt à concrétiser votre projet ?</h2>
                        <p className={`text-xl mb-8 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                            Contactez-nous pour discuter de vos besoins en développement.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                Discuter avec un expert
                            </button>
                            <button className={`px-6 py-3 rounded-lg font-medium ${theme === 'light' ? 'bg-white hover:bg-gray-100 border border-gray-200' : 'bg-gray-800 hover:bg-gray-700 border border-gray-700'} transition-all flex items-center justify-center`}>
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Demander un devis
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default DevelopmentPage;