'use client';

import { useState } from 'react';
import { useTheme } from '../../components/context/ThemeContext';
import Head from 'next/head';
import {
    ShoppingCart,
    Cpu,
    Monitor,
    Smartphone,
    HardDrive,
    Server,
    Cable,
    Wifi,
    BatteryCharging,
    Printer,
    Headphones,
    Mouse,
    Shield,
    Settings,
    Network,
    Wrench
} from 'lucide-react';
import { motion } from 'framer-motion';

const ShopPage = () => {
    const { theme } = useTheme();
    const [activeCategory, setActiveCategory] = useState('computers');
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

    // Catégories de produits
    const productCategories = {
        computers: [
            { name: 'PC Portables', icon: Laptop, description: 'Performants et légers pour tous usages' },
            { name: 'PC Bureaux', icon: Desktop, description: 'Puissance et modularité' },
            { name: 'Mini PC', icon: Server, description: 'Compact et économe en énergie' },
            { name: 'Workstations', icon: Cpu, description: 'Pour professionnels exigeants' },
        ],
        peripherals: [
            { name: 'Écrans', icon: Monitor, description: 'Full HD, 4K et écrans incurvés' },
            { name: 'Claviers/Souris', icon: Mouse, description: 'Gaming, bureau et ergonomiques' },
            { name: 'Imprimantes', icon: Printer, description: 'Jet d\'encre, laser et multifonctions' },
            { name: 'Casques', icon: Headphones, description: 'Audio professionnel et gaming' },
        ],
        networking: [
            { name: 'Box Internet', icon: Wifi, description: 'Routeurs haut débit' },
            { name: 'Switch/Routers', icon: Network, description: 'Professionnels et entreprises' },
            { name: 'Câbles', icon: Cable, description: 'RJ45, HDMI, USB et adaptateurs' },
            { name: 'NAS', icon: HardDrive, description: 'Stockage réseau sécurisé' },
        ],
        accessories: [
            { name: 'Chargeurs', icon: BatteryCharging, description: 'Adaptateurs universels' },
            { name: 'Batteries', icon: Battery, description: 'Remplacements originaux' },
            { name: 'Hubs USB', icon: Usb, description: 'Connectique multi-ports' },
            { name: 'Support PC', icon: MonitorStand, description: 'Ergonomie poste de travail' },
        ]
    };

    // Produits phares
    const featuredProducts = [
        {
            id: 1,
            name: 'PC Portable EliteBook 840 G8',
            category: 'computers',
            price: 1299,
            discount: 1199,
            description: 'Intel Core i7, 16GB RAM, 512GB SSD, 14" FHD',
            image: '/images/laptop-elitebook.jpg',
            rating: 4.8,
            stock: 15,
            features: ['Processeur i7-1165G7', '16 Go DDR4', 'SSD 512 Go', 'Windows 11 Pro']
        },
        {
            id: 2,
            name: 'Écran 27" 4K Ultra HD',
            category: 'peripherals',
            price: 399,
            discount: 349,
            description: 'IPS, HDR10, 99% sRGB, HDMI/DisplayPort',
            image: '/images/monitor-4k.jpg',
            rating: 4.6,
            stock: 8,
            features: ['Résolution 3840x2160', '1ms MPRT', 'Ports HDMI 2.0', 'Pivot réglable']
        },
        {
            id: 3,
            name: 'Box WiFi 6 AX5400',
            category: 'networking',
            price: 199,
            discount: 179,
            description: 'Dual-band, 8 streams, couverture large',
            image: '/images/wifi6-router.jpg',
            rating: 4.7,
            stock: 12,
            features: ['WiFi 6 (802.11ax)', '5400 Mbps', '8 antennes', 'Parental controls']
        },
        {
            id: 4,
            name: 'Chargeur USB-C 65W',
            category: 'accessories',
            price: 49,
            discount: 39,
            description: 'Charge rapide pour PC portables et smartphones',
            image: '/images/usb-c-charger.jpg',
            rating: 4.5,
            stock: 25,
            features: ['65W Power Delivery', 'Compact et pliable', 'Compatibilité universelle']
        },
        {
            id: 5,
            name: 'Souris Ergonomique Verticale',
            category: 'peripherals',
            price: 59,
            discount: null,
            description: 'Réduit les tensions du poignet, 4000DPI',
            image: '/images/vertical-mouse.jpg',
            rating: 4.3,
            stock: 18,
            features: ['Design ergonomique', 'Capteur 4000DPI', 'Boutons programmables']
        },
        {
            id: 6,
            name: 'NAS 2 Baies 8To',
            category: 'networking',
            price: 499,
            discount: 459,
            description: 'Stockage réseau sécurisé RAID',
            image: '/images/nas-2bay.jpg',
            rating: 4.9,
            stock: 5,
            features: ['8To (2x4To)', 'RAID 0/1', 'Double port Gigabit', 'Sauvegarde automatique']
        }
    ];

    // Services associés
    const services = [
        {
            title: 'Configuration Professionnelle',
            description: 'Installation et paramétrage complet de vos équipements',
            price: 49,
            icon: Settings,
            features: [
                'Installation OS et logiciels',
                'Optimisation performances',
                'Sauvegarde initiale',
                'Test complet hardware'
            ]
        },
        {
            title: 'Maintenance Express',
            description: 'Nettoyage et vérification complète de votre matériel',
            price: 79,
            icon: Wrench,
            features: [
                'Nettoyage interne/externe',
                'Diagnostic complet',
                'Application pâte thermique',
                'Test de stabilité'
            ]
        },
        {
            title: 'Installation Réseau',
            description: 'Mise en place de votre infrastructure réseau',
            price: 99,
            icon: Network,
            features: [
                'Configuration routeur/switch',
                'Test de débit',
                'Sécurisation WiFi',
                'Câblage structuré'
            ]
        },
        {
            title: 'Garantie Étendue',
            description: 'Protection supplémentaire pour vos équipements',
            price: 'À partir de 29€/an',
            icon: Shield,
            features: [
                'Extension garantie constructeur',
                'Remplacement express',
                'Assistance prioritaire',
                'Couverture complète'
            ]
        }
    ];

    return (
        <div className={`min-h-screen ${getBgColor()} ${getTextColor()} transition-colors duration-300`}>
            <Head>
                <title>Boutique Informatique | Open Numeric</title>
                <meta name="description" content="Découvrez notre sélection de matériel informatique et services associés. Prix compétitifs et qualité professionnelle." />
            </Head>

            {/* Hero Section */}
            <section className="relative pt-12 pb-20 overflow-hidden">
                <div className="absolute inset-0 -z-10">
                    <div className={`absolute inset-0 opacity-10 ${theme === 'light' ? 'bg-gray-900' : 'bg-white'}`}></div>
                    <div className="absolute inset-0 bg-[url('/images/grid-dots.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_70%,black)]"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent">
                                Boutique Professionnelle
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                            Matériel informatique de qualité et services experts à prix compétitifs.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="mt-16 flex justify-center"
                    >
                        <div className="relative w-full max-w-4xl h-64 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-amber-500/20"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-red-500 to-amber-500 opacity-30 blur-xl"></div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <ShoppingCart className="w-32 h-32 text-white opacity-80" />
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
                                <Cpu className="w-8 h-8 text-white" />
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
                                <Monitor className="w-10 h-10 text-white" />
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
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Catégories de Produits</h2>
                        <p className={`text-xl max-w-3xl mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                            Tout le matériel informatique professionnel dont vous avez besoin.
                        </p>
                    </motion.div>

                    <div className="flex justify-center mb-8">
                        <div className="inline-flex rounded-xl p-1" style={{
                            background: theme === 'light' ? 'rgba(243, 244, 246, 0.8)' : 'rgba(31, 41, 55, 0.8)'
                        }}>
                            {Object.keys(productCategories).map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-5 py-3 rounded-lg font-medium capitalize transition-all mx-1 ${activeCategory === category
                                        ? `bg-gradient-to-r ${theme === 'light' ? 'from-red-500 to-amber-500' : 'from-red-400 to-amber-400'} text-white shadow-lg`
                                        : `${theme === 'light' ? 'bg-white/0 hover:bg-gray-100 text-gray-700' : 'bg-gray-900/0 hover:bg-gray-800 text-gray-300'}`}`}
                                >
                                    {category === 'computers' ? 'Ordinateurs' : 
                                     category === 'peripherals' ? 'Périphériques' : 
                                     category === 'networking' ? 'Réseau' : 'Accessoires'}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {productCategories[activeCategory as keyof typeof productCategories].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5 }}
                                className={`p-6 rounded-xl border ${getBorderColor()} ${getCardBg()} transition-all duration-300 hover:shadow-lg flex flex-col items-center text-center`}
                            >
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-red-500 to-amber-500 text-white mb-4`}>
                                    <item.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                                <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className={`py-16 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800/20'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Produits Phares</h2>
                        <p className={`text-xl max-w-3xl mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                            Sélection de nos meilleurs produits aux prix les plus compétitifs.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5 }}
                                className={`rounded-2xl overflow-hidden border ${getBorderColor()} ${getCardBg()} transition-all duration-300 hover:shadow-xl relative`}
                            >
                                {product.discount && (
                                    <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full z-10">
                                        -{Math.round((1 - product.discount/product.price)*100)}%
                                    </div>
                                )}
                                <div className="h-48 bg-gray-100 relative overflow-hidden">
                                    <img 
                                        src={product.image} 
                                        alt={product.name} 
                                        className="w-full h-full object-contain p-4"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="text-xl font-bold">{product.name}</h3>
                                        <div className="flex items-center text-amber-500">
                                            <Star className="w-5 h-5 fill-current" />
                                            <span className="ml-1">{product.rating}</span>
                                        </div>
                                    </div>
                                    <p className={`mb-4 text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>{product.description}</p>
                                    
                                    <div className="mb-4">
                                        {product.features.map((feature, i) => (
                                            <div key={i} className="flex items-start mb-1">
                                                <Check className={`w-4 h-4 mt-0.5 mr-2 flex-shrink-0 ${theme === 'light' ? 'text-red-500' : 'text-red-400'}`} />
                                                <span className="text-sm">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between mt-4">
                                        <div>
                                            {product.discount ? (
                                                <>
                                                    <span className="text-2xl font-bold">{product.discount}€</span>
                                                    <span className="ml-2 line-through text-gray-400">{product.price}€</span>
                                                </>
                                            ) : (
                                                <span className="text-2xl font-bold">{product.price}€</span>
                                            )}
                                        </div>
                                        <button className={`px-4 py-2 rounded-lg font-medium flex items-center ${theme === 'light' 
                                            ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                                            : 'bg-amber-500 hover:bg-amber-600 text-gray-900'}`}>
                                            <ShoppingCart className="w-5 h-5 mr-2" />
                                            <span>Ajouter</span>
                                        </button>
                                    </div>
                                    <div className="mt-2 text-sm text-right">
                                        {product.stock > 5 ? (
                                            <span className="text-green-500">En stock</span>
                                        ) : product.stock > 0 ? (
                                            <span className="text-amber-500">Plus que {product.stock} disponibles</span>
                                        ) : (
                                            <span className="text-red-500">Rupture de stock</span>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <button className={`px-6 py-3 rounded-lg font-medium border ${theme === 'light' 
                            ? 'bg-white hover:bg-gray-100 border-gray-300 text-gray-800' 
                            : 'bg-gray-800 hover:bg-gray-700 border-gray-600 text-gray-200'}`}>
                            Voir tous les produits
                        </button>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Services Associés</h2>
                        <p className={`text-xl max-w-3xl mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                            Des services professionnels pour compléter vos achats.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5 }}
                                className={`p-6 rounded-2xl border ${getBorderColor()} ${getCardBg()} transition-all duration-300 hover:shadow-lg`}
                            >
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-red-500 to-amber-500 text-white mb-4`}>
                                    <service.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                                <p className={`mb-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>{service.description}</p>
                                
                                <div className="mb-4">
                                    {service.features.map((feature, i) => (
                                        <div key={i} className="flex items-start mb-1">
                                            <Check className={`w-4 h-4 mt-0.5 mr-2 flex-shrink-0 ${theme === 'light' ? 'text-red-500' : 'text-red-400'}`} />
                                            <span className="text-sm">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4">
                                    <span className="text-xl font-bold">{service.price}</span>
                                    {typeof service.price === 'number' && <span className="text-sm ml-1">(TTC)</span>}
                                </div>
                                <button className={`w-full mt-4 px-4 py-2 rounded-lg font-medium flex items-center justify-center ${theme === 'light' 
                                    ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                                    : 'bg-amber-500 hover:bg-amber-600 text-gray-900'}`}>
                                    <span>Commander</span>
                                </button>
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
                        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-amber-500/10 -z-10"></div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">Besoin de conseils personnalisés ?</h2>
                        <p className={`text-xl mb-8 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                            Nos experts sont à votre disposition pour vous guider.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button className="px-6 py-3 bg-gradient-to-r from-red-500 to-amber-500 hover:from-red-600 hover:to-amber-600 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                Contactez un expert
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

export default ShopPage;

// Icônes supplémentaires nécessaires
function Star({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
    );
}

function Check({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
    );
}

function Laptop({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    );
}

function Desktop({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    );
}

function Battery({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
    );
}

function Usb({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
    );
}

function MonitorStand({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
    );
}