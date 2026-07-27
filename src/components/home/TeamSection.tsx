'use client'

import { useState, useEffect } from 'react';
import Image from "next/image";
import { useTheme } from "@/components/context/ThemeContext";
import type { TeamMember } from './types';

export function TeamSection() {
    const { theme } = useTheme();
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const response = await fetch('/api/team?isVisible=true');
                const data = await response.json();
                if (data.success) {
                    // Transformer les données pour correspondre au format attendu
                    const formattedMembers = data.data.map((m: any) => ({
                        id: m.id,
                        name: m.name,
                        position: m.position,
                        bio: m.bio,
                        img: m.imageUrl,
                        isVisible: m.isVisible
                    }));
                    setMembers(formattedMembers);
                }
            } catch (error) {
                console.error('Error fetching team:', error);
                // Fallback sur les données statiques
                setMembers([
                    {
                        name: "Nestor COMPAORE",
                        position: "CEO & Développeur Principal",
                        bio: "Expert en développement full-stack avec 4 ans d'expérience dans la création de solutions complexes.",
                        img: "/images/dev.jpg"
                    },
                    {
                        name: "Sophie Martin",
                        position: "Designer UX/UI",
                        bio: "Spécialiste en design d'interface et expérience utilisateur, passionnée par les designs intuitifs.",
                        img: "/images/designer.jpg"
                    },
                    {
                        name: "Thomas Leroy",
                        position: "Responsable Formation",
                        bio: "Formateur certifié avec une approche pédagogique adaptée à tous les niveaux.",
                        img: "/images/formateur.jpg"
                    },
                    {
                        name: "Camille Petit",
                        position: "Responsable Support Technique",
                        bio: "Garant de la qualité et de la réactivité de notre support client.",
                        img: "/images/maintient.jpg"
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchTeam();
    }, []);

    const getCardClasses = () => {
        const baseClasses = 'rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl';
        switch (theme) {
            case 'light': return `${baseClasses} bg-white border border-gray-200 hover:border-gray-300`;
            case 'violet-dark': return `${baseClasses} bg-violet-800/70 border border-violet-700 hover:border-violet-600`;
            case 'pink-dark': return `${baseClasses} bg-pink-800/70 border border-pink-700 hover:border-pink-600`;
            case 'blue-dark': return `${baseClasses} bg-blue-800/70 border border-blue-700 hover:border-blue-600`;
            default: return `${baseClasses} bg-gray-800/50 border border-gray-700 hover:border-gray-600`;
        }
    };

    const getTextColorClasses = () => {
        switch (theme) {
            case 'light': return 'text-gray-600';
            default: return 'text-gray-400';
        }
    };

    if (loading) {
        return (
            <section className="py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold">
                            Notre <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">Équipe</span>
                        </h2>
                        <p className={`mt-4 max-w-2xl text-lg md:text-xl ${getTextColorClasses()} mx-auto`}>
                            Rencontrez les experts passionnés qui donnent vie à vos projets.
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>
                </div>
            </section>
        );
    }

    const visibleMembers = members.filter(m => m.isVisible !== false);

    return (
        <section className="py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Notre <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">Équipe</span>
                    </h2>
                    <p className={`mt-4 max-w-2xl text-lg md:text-xl ${getTextColorClasses()} mx-auto`}>
                        Rencontrez les experts passionnés qui donnent vie à vos projets.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {visibleMembers.map((member) => (
                        <div
                            key={member.id || member.name}
                            className={getCardClasses()}
                        >
                            <div className="relative h-48 sm:h-56 w-full">
                                <Image
                                    src={member.img}
                                    alt={`${member.name} - ${member.position}`}
                                    fill
                                    className="object-cover transition-transform duration-500 hover:scale-105"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                />
                            </div>
                            <div className="p-5 md:p-6">
                                <h3 className="text-lg md:text-xl font-bold mb-1">{member.name}</h3>
                                <p className={`text-xs md:text-sm mb-3 md:mb-4 ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`}>{member.position}</p>
                                <p className={`text-sm md:text-base ${getTextColorClasses()}`}>{member.bio}</p>
                                <div className="mt-3 md:mt-4 flex space-x-2 md:space-x-3">
                                    <a href="#" className="text-blue-400 hover:text-blue-300" aria-label={`LinkedIn de ${member.name}`}>
                                        <span className="sr-only">LinkedIn</span>
                                        <svg className="h-4 w-4 md:h-5 md:w-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                        </svg>
                                    </a>
                                    <a href="#" className="text-blue-400 hover:text-blue-300" aria-label={`Twitter de ${member.name}`}>
                                        <span className="sr-only">Twitter</span>
                                        <svg className="h-4 w-4 md:h-5 md:w-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}