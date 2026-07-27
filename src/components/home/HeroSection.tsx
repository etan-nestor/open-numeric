'use client'

import Image from "next/image";
import { useState, useEffect } from 'react';
import { useTheme } from "@/components/context/ThemeContext";

const heroImages = Array.from({ length: 6 }, (_, i) => `/images/on/${i + 1}.png`);

export function HeroSection() {
    const { theme } = useTheme();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
                setIsTransitioning(false);
            }, 500);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const getButtonClasses = (primary = true) => {
        if (primary) {
            return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-blue-500/30';
        } else {
            return `border-2 ${theme === 'light' ? 'border-blue-400/50 text-blue-600 hover:border-blue-500' : 'border-blue-400/50 text-blue-300 hover:border-blue-400 hover:text-white hover:bg-blue-500/10'}`;
        }
    };

    return (
        <section className="relative pt-10 pb-20 md:pt-14 md:pb-14 overflow-hidden">
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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                            Solutions Numériques <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">Sur Mesure</span>
                        </h1>
                        <p className={`text-xl md:text-2xl ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} mb-8 max-w-lg mx-auto md:mx-0`}>
                            Développement, design, formation et maintenance - tout ce dont vous avez besoin pour réussir votre transformation digitale.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <a
                                href="/services"
                                className={`px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold transition-all ${getButtonClasses()} text-sm md:text-base text-center`}
                                aria-label="Découvrir nos services"
                            >
                                Découvrir nos services
                            </a>
                            <a
                                href="/contact"
                                className={`px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold transition-all ${getButtonClasses(false)} text-sm md:text-base text-center`}
                                aria-label="Nous contacter"
                            >
                                Nous contacter
                            </a>
                        </div>
                    </div>
                    <div className="mt-12 md:mt-0 relative">
                        <div className="relative">
                            <div className={`absolute -inset-4 rounded-2xl blur-xl transition-colors duration-300 ${theme === 'light' ? 'bg-blue-200/50' : 'bg-blue-500/30'}`}></div>
                            <div className="relative w-full max-w-md mx-auto">
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
                                    {heroImages.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                setIsTransitioning(true);
                                                setTimeout(() => {
                                                    setCurrentImageIndex(index);
                                                    setIsTransitioning(false);
                                                }, 500);
                                            }}
                                            className={`w-2 h-2 rounded-full transition-all duration-300 ${currentImageIndex === index ? 'bg-blue-500 w-6' : 'bg-white/50 hover:bg-white/75'}`}
                                            aria-label={`Aller à l'image ${index + 1}`}
                                        />
                                    ))}
                                </div>
                                <div className="relative overflow-hidden rounded-lg">
                                    <div className={`transition-all duration-500 ease-in-out ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                                        <Image
                                            className="relative w-full h-auto rounded-lg"
                                            src={heroImages[currentImageIndex]}
                                            alt={`Solutions numériques sur mesure - Image ${currentImageIndex + 1}`}
                                            width={500}
                                            height={300}
                                            priority
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}