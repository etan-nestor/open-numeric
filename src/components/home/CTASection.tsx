'use client'

import { useTheme } from "@/components/context/ThemeContext";

export function CTASection() {
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

    const getTextColorClasses = () => {
        switch (theme) {
            case 'light': return 'text-gray-600';
            default: return 'text-gray-400';
        }
    };

    const getButtonClasses = (primary = true) => {
        if (primary) {
            return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-blue-500/30';
        } else {
            return 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-orange-500/20';
        }
    };

    return (
        <section className={`py-16 md:py-20 bg-gradient-to-br transition-colors duration-300 ${theme === 'light' ? 'from-blue-50 to-blue-100' : 'from-gray-900 to-gray-950'}`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-orange-500 rounded-lg blur opacity-25"></div>
                    <div className={`relative ${theme === 'light' ? 'bg-white' : 'bg-gray-900/80'} backdrop-blur-sm border ${getBorderClasses()} rounded-lg p-6 md:p-8 lg:p-12 transition-colors duration-300`}>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
                            Prêt à <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">transformer</span> votre entreprise ?
                        </h2>
                        <p className={`text-base md:text-lg lg:text-xl ${getTextColorClasses()} mb-6 md:mb-8`}>
                            Contactez-nous dès aujourd&apos;hui pour discuter de votre projet et découvrir comment nous pouvons vous aider à atteindre vos objectifs numériques.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/contact"
                                className={`px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold transition-all ${getButtonClasses(true)} text-sm md:text-base`}
                                aria-label="Nous contacter"
                            >
                                Nous contacter
                            </a>
                            <a
                                href="/devis"
                                className={`px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold transition-all ${getButtonClasses(false)} text-sm md:text-base`}
                                aria-label="Demander un devis"
                            >
                                Demander un devis
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}