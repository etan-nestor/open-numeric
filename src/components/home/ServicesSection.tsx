'use client'

import { useTheme } from "@/components/context/ThemeContext";

const services = [
    {
        name: "Développement",
        description: "Applications mobiles, logiciels sur mesure, API et services web conçus pour votre entreprise.",
        icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
        slug: "developpement"
    },
    {
        name: "Design",
        description: "Identité visuelle, interfaces utilisateur et expériences digitales mémorables pour vos clients.",
        icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
        slug: "design"
    },
    {
        name: "Formations",
        description: "Modules de formation adaptés pour maîtriser les outils et technologies numériques.",
        icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
        slug: "formations"
    },
    {
        name: "Maintenance",
        description: "Support technique, réparation et configuration de vos équipements informatiques.",
        icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
        slug: "maintenance"
    }
];

export function ServicesSection() {
    const { theme } = useTheme();

    const getBorderClasses = () => {
        switch (theme) {
            case 'light': return 'border-gray-200';
            case 'violet-dark': return 'border-violet-800';
            case 'pink-dark': return 'border-pink-800';
            case 'blue-dark': return 'border-blue-800';
            default: return 'border-gray-800';
        }
    };

    const getCardClasses = () => {
        const baseClasses = 'transition-all duration-300 ease-in-out border';
        switch (theme) {
            case 'light': return `${baseClasses} bg-white border-gray-200 hover:border-gray-300`;
            case 'violet-dark': return `${baseClasses} bg-violet-800/70 border-violet-700 hover:border-violet-600`;
            case 'pink-dark': return `${baseClasses} bg-pink-800/70 border-pink-700 hover:border-pink-600`;
            case 'blue-dark': return `${baseClasses} bg-blue-800/70 border-blue-700 hover:border-blue-600`;
            default: return `${baseClasses} bg-gray-800/50 border-gray-700 hover:border-gray-600`;
        }
    };

    const getTextColorClasses = () => {
        switch (theme) {
            case 'light': return 'text-gray-600';
            default: return 'text-gray-400';
        }
    };

    const getButtonClasses = () => {
        return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-blue-500/30';
    };

    return (
        <section className={`py-16 md:py-20 backdrop-blur-sm border-y ${getBorderClasses()} transition-colors duration-300`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Nos <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">Services</span>
                    </h2>
                    <p className={`mt-4 max-w-2xl text-lg md:text-xl ${getTextColorClasses()} mx-auto`}>
                        Une gamme complète de services numériques pour répondre à tous vos besoins.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {services.map((service) => (
                        <div
                            key={service.name}
                            className={`rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${getCardClasses()}`}
                        >
                            <div className={`flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/20 text-blue-400 mb-4 md:mb-6 group-hover:from-blue-500/30 group-hover:to-blue-600/30 transition-all`}>
                                <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={service.icon} />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium mb-2 md:mb-3">{service.name}</h3>
                            <p className={`text-sm md:text-base ${getTextColorClasses()}`}>
                                {service.description}
                            </p>
                            <div className="mt-3 md:mt-4">
                                <a
                                    href={`/services/${service.slug}`}
                                    className="inline-flex items-center text-xs md:text-sm text-blue-400 hover:text-blue-300 transition-colors"
                                    aria-label={`En savoir plus sur ${service.name}`}
                                >
                                    En savoir plus
                                    <svg className="ml-1 h-3 w-3 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10 md:mt-12 text-center">
                    <a
                        href="/services"
                        className={`inline-flex items-center px-5 py-2.5 md:px-6 md:py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all ${getButtonClasses()} text-sm md:text-base`}
                        aria-label="Voir tous nos services"
                    >
                        Voir tous nos services
                        <svg className="ml-2 md:ml-3 -mr-1 h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}