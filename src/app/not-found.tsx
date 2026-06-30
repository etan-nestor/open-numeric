// app/not-found.tsx
'use client'

import Link from 'next/link';
import { useTheme } from "@/components/context/ThemeContext";
import Head from 'next/head';

export default function NotFound() {
    const { theme } = useTheme();

    // Classes dynamiques en fonction du thème (copiées de votre page)
    const getSectionClasses = () => {
        const baseClasses = 'transition-colors duration-300 ease-in-out';

        switch (theme) {
            case 'light':
                return `${baseClasses} bg-white text-gray-800`;
            case 'violet-dark':
                return `${baseClasses} bg-violet-900 text-violet-100`;
            case 'pink-dark':
                return `${baseClasses} bg-pink-900 text-pink-100`;
            case 'blue-dark':
                return `${baseClasses} bg-blue-900 text-blue-100`;
            default: // dark
                return `${baseClasses} bg-gray-900 text-gray-100`;
        }
    };


    const getCardClasses = () => {
        const baseClasses = 'transition-all duration-300 ease-in-out border';

        switch (theme) {
            case 'light':
                return `${baseClasses} bg-white border-gray-200`;
            case 'violet-dark':
                return `${baseClasses} bg-violet-800/70 border-violet-700`;
            case 'pink-dark':
                return `${baseClasses} bg-pink-800/70 border-pink-700`;
            case 'blue-dark':
                return `${baseClasses} bg-blue-800/70 border-blue-700`;
            default: // dark
                return `${baseClasses} bg-gray-800/50 border-gray-700`;
        }
    };

    const getTextColorClasses = () => {
        switch (theme) {
            case 'light':
                return 'text-gray-600';
            default:
                return 'text-gray-400';
        }
    };

    const getButtonClasses = (primary = true) => {
        if (primary) {
            return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-blue-500/30';
        } else {
            return `border-2 ${theme === 'light' ? 'border-blue-400/50 text-blue-600 hover:border-blue-500' : 'border-blue-400/50 text-blue-300 hover:border-blue-400 hover:text-white hover:bg-blue-500/10'}`;
        }
    };

    return (
        <div className={`min-h-screen ${getSectionClasses()}`}>
            <Head>
                <title>404 - Page Non Trouvée | Open Numeric</title>
                <meta name="description" content="Désolé, la page que vous recherchez n'existe pas ou a été déplacée." />
            </Head>

            {/* Background décoratif similaire à votre hero section */}
            <div className={`absolute inset-0 -z-10 transition-colors duration-300 ${theme === 'light' ? 'bg-gradient-to-b from-blue-50 to-white' : 'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 to-gray-950'}`}>
                {theme !== 'light' && (
                    <>
                        <div className="absolute inset-0 opacity-20">
                            <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-gradient-radial from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
                    </>
                )}
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
                <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
                    {/* Left column - Error info */}
                    <div className="text-center md:text-left">
                        <h1 className="text-8xl md:text-9xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                            404
                        </h1>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Page Non Trouvée
                        </h2>
                        <p className={`text-lg md:text-xl ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} mb-8 max-w-lg mx-auto md:mx-0`}>
                            Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
                            Vous pouvez retourner à l&apos;accueil ou explorer nos services.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Link
                                href="/"
                                className={`px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold transition-all ${getButtonClasses()} text-sm md:text-base text-center`}
                                aria-label="Retour à l'accueil"
                            >
                                Retour à l&apos;accueil
                            </Link>
                            <Link
                                href="/services"
                                className={`px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold transition-all ${getButtonClasses(false)} text-sm md:text-base text-center`}
                                aria-label="Voir nos services"
                            >
                                Voir nos services
                            </Link>
                        </div>
                    </div>

                    {/* Right column - Creative error illustration */}
                    <div className="mt-12 md:mt-0 relative">
                        <div className="relative">
                            <div className={`absolute -inset-4 rounded-2xl blur-xl transition-colors duration-300 ${theme === 'light' ? 'bg-blue-200/50' : 'bg-blue-500/30'}`}></div>
                            <div className={`relative rounded-lg p-8 text-center ${getCardClasses()}`}>
                                <div className="flex justify-center mb-6">
                                    <div className={`relative h-32 w-32 md:h-40 md:w-40 rounded-full ${theme === 'light' ? 'bg-blue-100' : 'bg-blue-500/20'} flex items-center justify-center`}>
                                        <svg className="h-16 w-16 md:h-20 md:w-20 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Oups ! Page introuvable</h3>
                                <p className={`text-sm ${getTextColorClasses()}`}>
                                    Le lien que vous avez suivi semble brisé ou la page a été supprimée.
                                </p>

                                {/* Suggestions rapides */}
                                <div className="mt-8 pt-6 border-t ${getBorderClasses()}">
                                    <p className={`text-xs font-medium uppercase tracking-wider ${getTextColorClasses()} mb-4`}>
                                        Pages populaires
                                    </p>
                                    <div className="grid grid-cols-2 gap-3">
                                        <Link href="/services" className={`text-sm ${theme === 'light' ? 'text-blue-600 hover:text-blue-700' : 'text-blue-400 hover:text-blue-300'} transition-colors`}>
                                            → Services
                                        </Link>
                                        <Link href="/team" className={`text-sm ${theme === 'light' ? 'text-blue-600 hover:text-blue-700' : 'text-blue-400 hover:text-blue-300'} transition-colors`}>
                                            → Équipe
                                        </Link>
                                        <Link href="/contact" className={`text-sm ${theme === 'light' ? 'text-blue-600 hover:text-blue-700' : 'text-blue-400 hover:text-blue-300'} transition-colors`}>
                                            → Contact
                                        </Link>
                                        <Link href="/devis" className={`text-sm ${theme === 'light' ? 'text-blue-600 hover:text-blue-700' : 'text-blue-400 hover:text-blue-300'} transition-colors`}>
                                            → Devis
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}