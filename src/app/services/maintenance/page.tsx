'use client';

import { useState } from 'react';
import { useTheme } from '../../components/context/ThemeContext';
import Head from 'next/head';
import {
    Axe,
    Cpu,
    HardDrive,
    Printer,
    Wrench,
    Network,
    Monitor,
    Shield,
    Zap,
    Clock,
    Settings
} from 'lucide-react';
import { motion } from 'framer-motion';

const MaintenancePage = () => {
    const { theme } = useTheme();
    const [activeCategory, setActiveCategory] = useState('repair');
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

    // Catégories de maintenance
    const maintenanceCategories = {
        repair: [
            { name: 'Réparation PC/Mac', icon: Cpu, description: 'Diagnostic et réparation complète des ordinateurs.' },
            { name: 'Réparation Périphériques', icon: Printer, description: 'Imprimantes, scanners et autres équipements.' },
            { name: 'Remplacement Écrans', icon: Monitor, description: 'Remplacement d\'écrans LCD/LED endommagés.' },
            { name: 'Récupération Données', icon: HardDrive, description: 'Sauvetage de données sur disques défectueux.' },
        ],
        network: [
            { name: 'Dépannage Réseau', icon: Network, description: 'Résolution des problèmes de connectivité.' },
            { name: 'Configuration WiFi', icon: Zap, description: 'Optimisation du signal et couverture.' },
            { name: 'Sécurité Réseau', icon: Shield, description: 'Protection contre les intrusions.' },
            { name: 'Câblage Structuré', icon: Settings, description: 'Installation réseau filaire professionnelle.' },
        ],
        preventive: [
            { name: 'Nettoyage Interne', icon: Axe, description: 'Élimination poussière pour refroidissement optimal.' },
            { name: 'Mises à Jour', icon: Clock, description: 'Maintenance logicielle et firmware.' },
            { name: 'Diagnostic Complet', icon: Wrench, description: 'Vérification approfondie du matériel.' },
            { name: 'Contrats Maintenance', icon: Shield, description: 'Programmes de suivi personnalisés.' },
        ]
    };

    // Services de maintenance
    const services = [
        {
            title: 'Réparation Matérielle',
            description: 'Diagnostic et réparation de tous vos équipements informatiques.',
            features: [
                'Ordinateurs fixes et portables',
                'Imprimantes et photocopieurs',
                'Remplacement de composants',
                'Réparation d\'écrans',
                'Récupération de données'
            ],
            icon: Cpu,
            gradient: 'from-amber-500 to-orange-500'
        },
        {
            title: 'Maintenance Préventive',
            description: 'Entretien régulier pour prolonger la durée de vie de vos équipements.',
            features: [
                'Nettoyage interne complet',
                'Vérification des composants',
                'Optimisation des performances',
                'Mises à jour logicielles',
                'Contrats annuels'
            ],
            icon: Axe,
            gradient: 'from-blue-500 to-cyan-500'
        },
        {
            title: 'Dépannage Réseau',
            description: 'Résolution des problèmes de connectivité et configuration.',
            features: [
                'Diagnostic réseau complet',
                'Configuration routeurs/switchs',
                'Optimisation WiFi',
                'Sécurisation du réseau',
                'Câblage structuré'
            ],
            icon: Network,
            gradient: 'from-green-500 to-emerald-500'
        },
        {
            title: 'Installation & Configuration',
            description: 'Mise en service de nouveaux équipements et logiciels.',
            features: [
                'Installation poste de travail',
                'Configuration logicielle',
                'Migration de données',
                'Sauvegarde initiale',
                'Formation utilisateur'
            ],
            icon: Settings,
            gradient: 'from-purple-500 to-pink-500'
        }
    ];

    // Processus d'intervention
    const interventionSteps = [
        {
            title: "Diagnostic",
            description: "Analyse précise de la panne ou du besoin",
            icon: Wrench
        },
        {
            title: "Devis",
            description: "Proposition détaillée avec options de réparation",
            icon: Axe
        },
        {
            title: "Réparation",
            description: "Intervention par nos techniciens certifiés",
            icon: Cpu
        },
        {
            title: "Test",
            description: "Validation complète du bon fonctionnement",
            icon: Zap
        },
        {
            title: "Livraison",
            description: "Remise de l'équipement avec garantie",
            icon: Shield
        }
    ];

    // Équipements couverts
    const coveredEquipment = [
        { name: 'PC Fixes', icon: '/images/desktop.png' },
        { name: 'PC Portables', icon: '/images/laptop.png' },
        { name: 'Imprimantes', icon: '/images/printer.png' },
        { name: 'Serveurs', icon: '/images/server.png' },
        { name: 'Réseau', icon: '/images/network.png' },
        { name: 'Périphériques', icon: '/images/peripherals.png' },
        { name: 'Photocopieurs', icon: '/images/copier.png' },
        { name: 'Tablettes', icon: '/images/tablet.png' },
        { name: 'Smartphones', icon: '/images/smartphone.png' },
        { name: 'Écrans', icon: '/images/monitor.png' }
    ];

    return (
        <div className={`min-h-screen ${getBgColor()} ${getTextColor()} transition-colors duration-300`}>
            <Head>
                <title>Maintenance Informatique | Open Numeric</title>
                <meta name="description" content="Services complets de maintenance, réparation et dépannage pour tous vos équipements informatiques." />
            </Head>

            {/* Hero Section */}
            <section className="relative pt-12 pb-20 overflow-hidden">
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
                            <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
                                Maintenance Informatique Expert
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                            Réparation, dépannage et entretien pour tous vos équipements informatiques.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="mt-16 flex justify-center"
                    >
                        <div className="relative w-full max-w-4xl h-64 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 opacity-30 blur-xl"></div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Axe className="w-32 h-32 text-white opacity-80" />
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
                                <Wrench className="w-8 h-8 text-white" />
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
                                <Cpu className="w-10 h-10 text-white" />
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
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Services de Maintenance</h2>
                        <p className={`text-xl max-w-3xl mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                            Des solutions complètes pour tous vos besoins techniques.
                        </p>
                    </motion.div>

                    <div className="flex justify-center mb-8">
                        <div className="inline-flex rounded-xl p-1" style={{
                            background: theme === 'light' ? 'rgba(243, 244, 246, 0.8)' : 'rgba(31, 41, 55, 0.8)'
                        }}>
                            {Object.keys(maintenanceCategories).map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-5 py-3 rounded-lg font-medium capitalize transition-all mx-1 ${activeCategory === category
                                        ? `bg-gradient-to-r ${theme === 'light' ? 'from-amber-500 to-orange-500' : 'from-amber-400 to-orange-400'} text-white shadow-lg`
                                        : `${theme === 'light' ? 'bg-white/0 hover:bg-gray-100 text-gray-700' : 'bg-gray-900/0 hover:bg-gray-800 text-gray-300'}`}`}
                                >
                                    {category === 'repair' ? 'Réparation' : 
                                     category === 'network' ? 'Réseau' : 'Maintenance Préventive'}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {maintenanceCategories[activeCategory as keyof typeof maintenanceCategories].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5 }}
                                className={`p-6 rounded-xl border ${getBorderColor()} ${getCardBg()} transition-all duration-300 hover:shadow-lg flex flex-col items-center text-center`}
                            >
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-amber-500 to-orange-500 text-white mb-4`}>
                                    <item.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                                <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>{item.description}</p>
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
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Offres de Maintenance</h2>
                        <p className={`text-xl max-w-3xl mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                            Des interventions rapides et efficaces par des techniciens certifiés.
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
                                                            <svg className={`w-5 h-5 mt-0.5 mr-2 flex-shrink-0 ${theme === 'light' ? 'text-amber-500' : 'text-amber-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Notre Processus d'Intervention</h2>
                        <p className={`text-xl max-w-3xl mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                            Une méthodologie rigoureuse pour des réparations efficaces.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {interventionSteps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5 }}
                                className={`p-6 rounded-2xl border ${getBorderColor()} ${getCardBg()} transition-all duration-300 hover:shadow-lg flex flex-col items-center text-center`}
                            >
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-amber-500 to-orange-500 text-white mb-4`}>
                                    <step.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Equipment Section */}
            <section className={`py-16 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800/20'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Équipements Pris en Charge</h2>
                        <p className={`text-xl max-w-3xl mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                            Nous intervenons sur tous types d'équipements informatiques.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {coveredEquipment.map((equipment, index) => (
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
                                    <img src={equipment.icon} alt={equipment.name} className="w-full h-full object-contain" />
                                </div>
                                <h3 className="text-lg font-medium">{equipment.name}</h3>
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
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 -z-10"></div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">Besoin d'une intervention rapide ?</h2>
                        <p className={`text-xl mb-8 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                            Notre équipe est disponible pour résoudre vos problèmes techniques.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                Demander un dépannage
                            </button>
                            <button className={`px-6 py-3 rounded-lg font-medium ${theme === 'light' ? 'bg-white hover:bg-gray-100 border border-gray-200' : 'bg-gray-800 hover:bg-gray-700 border border-gray-700'} transition-all flex items-center justify-center`}>
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Souscrire un contrat
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default MaintenancePage;