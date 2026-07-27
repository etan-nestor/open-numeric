'use client'

import { useState, useEffect } from 'react';
import Image from "next/image";
import { useTheme } from "@/components/context/ThemeContext";
import type { Testimonial } from './types';

const fallbackTestimonials = [
    {
        name: "Jean Lambert",
        position: "CEO",
        company: "TechCorp",
        content: "Open Numeric a transformé notre présence en ligne avec une application sur mesure qui a boosté nos ventes de 40%.",
        imageUrl: "/images/test2.jpg",
        rating: 5
    },
    {
        name: "Marie Dubois",
        position: "Directrice Marketing",
        company: "Innovate",
        content: "Leur équipe de design a créé une identité visuelle qui représente parfaitement nos valeurs et attire nos clients cibles.",
        imageUrl: "/images/test1.jpg",
        rating: 5
    },
    {
        name: "Pierre Garnier",
        position: "DRH",
        company: "DigitalSphere",
        content: "Les formations étaient parfaitement adaptées à nos besoins et ont permis à nos équipes de gagner en productivité.",
        imageUrl: "/images/test3.jpg",
        rating: 5
    }
];

export function TestimonialsSection() {
    const { theme } = useTheme();
    const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await fetch('/api/testimonials?isVisible=true&isFeatured=true');
                const data = await response.json();
                if (data.success && data.data.length > 0) {
                    const formattedTestimonials = data.data.map((t: any) => ({
                        id: t.id,
                        name: t.name,
                        position: t.position,
                        company: t.company,
                        content: t.content,
                        rating: t.rating || 5,
                        imageUrl: t.imageUrl,
                        isVisible: t.isVisible,
                        isFeatured: t.isFeatured
                    }));
                    setTestimonials(formattedTestimonials);
                }
            } catch (error) {
                console.error('Error fetching testimonials:', error);
                // Garder les données de fallback
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    const getCardClasses = () => {
        const baseClasses = 'rounded-xl p-6 md:p-8 shadow-lg';
        switch (theme) {
            case 'light': return `${baseClasses} bg-white border border-gray-200`;
            case 'violet-dark': return `${baseClasses} bg-violet-800/70 border border-violet-700`;
            case 'pink-dark': return `${baseClasses} bg-pink-800/70 border border-pink-700`;
            case 'blue-dark': return `${baseClasses} bg-blue-800/70 border border-blue-700`;
            default: return `${baseClasses} bg-gray-800/50 border border-gray-700`;
        }
    };

    const getTextColorClasses = () => {
        switch (theme) {
            case 'light': return 'text-gray-600';
            default: return 'text-gray-400';
        }
    };

    const getSectionClasses = () => {
        switch (theme) {
            case 'light': return 'bg-white';
            default: return 'bg-gray-900';
        }
    };

    if (loading) {
        return (
            <section className={`py-16 md:py-20 ${getSectionClasses()}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold">
                            Témoignages <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">Clients</span>
                        </h2>
                        <p className={`mt-4 max-w-2xl text-lg md:text-xl ${getTextColorClasses()} mx-auto`}>
                            Ce que nos clients disent de notre travail.
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>
                </div>
            </section>
        );
    }

    const visibleTestimonials = testimonials.filter(t => t.isVisible !== false);

    return (
        <section className={`py-16 md:py-20 ${getSectionClasses()}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Témoignages <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">Clients</span>
                    </h2>
                    <p className={`mt-4 max-w-2xl text-lg md:text-xl ${getTextColorClasses()} mx-auto`}>
                        Ce que nos clients disent de notre travail.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {visibleTestimonials.map((testimonial, index) => (
                        <div key={testimonial.id || index} className={getCardClasses()}>
                            <div className="mb-4 md:mb-6">
                                <svg className="h-6 w-6 md:h-8 md:w-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                </svg>
                            </div>
                            <blockquote className="mb-4 md:mb-6">
                                <p className={`text-sm md:text-base ${getTextColorClasses()}`}>
                                    &quot;{testimonial.content}&quot;
                                </p>
                            </blockquote>
                            <div className="flex items-center">
                                <div className="relative h-10 w-10 md:h-12 md:w-12 rounded-full overflow-hidden mr-3 md:mr-4">
                                    <Image
                                        src={testimonial.imageUrl || '/images/default-avatar.jpg'}
                                        alt={`Photo de ${testimonial.name}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-medium text-sm md:text-base">{testimonial.name}</p>
                                    <p className={`text-xs md:text-sm ${getTextColorClasses()}`}>
                                        {testimonial.position} • {testimonial.company}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}