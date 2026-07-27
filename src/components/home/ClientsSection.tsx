'use client'

import { useState, useEffect } from 'react';
import Image from "next/image";
import { useTheme } from "@/components/context/ThemeContext";
import type { Client } from './types';

const fallbackClients = [
    { name: "TechCorp", logo: "/images/custo1.png" },
    { name: "Innovate", logo: "/images/custo2.png" },
    { name: "DigitalSphere", logo: "/images/custo3.jpg" },
    { name: "WebSolutions", logo: "/images/custo4.jpg" },
    { name: "FutureNow", logo: "/images/custo5.jpg" }
];

export function ClientsSection() {
    const { theme } = useTheme();
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentClientIndex, setCurrentClientIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch('/api/partners?isVisible=true');
                const data = await response.json();
                
                if (data.success && data.data && data.data.length > 0) {
                    const formattedClients = data.data.map((p: any) => ({
                        id: p.id,
                        name: p.name,
                        logo: p.logoUrl,
                        isVisible: p.isVisible
                    }));
                    setClients(formattedClients);
                } else {
                    setClients(fallbackClients);
                }
            } catch (error) {
                console.error('Error fetching clients:', error);
                setClients(fallbackClients);
            } finally {
                setLoading(false);
            }
        };

        fetchClients();
    }, []);

    useEffect(() => {
        if (clients.length === 0) return;
        const interval = setInterval(() => {
            setCurrentClientIndex((prevIndex) => (prevIndex + 1) % clients.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [clients.length]);

    const getTextColorClasses = () => {
        switch (theme) {
            case 'light': return 'text-gray-600';
            default: return 'text-gray-400';
        }
    };

    if (loading) {
        return (
            <section className={`py-12 md:py-16 transition-colors duration-300 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800/30'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10 md:mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold">
                            Ils nous <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">font confiance</span>
                        </h2>
                        <p className={`mt-4 max-w-2xl text-lg md:text-xl ${getTextColorClasses()} mx-auto`}>
                            Des entreprises innovantes qui nous ont choisi pour leurs projets numériques.
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>
                </div>
            </section>
        );
    }

    if (clients.length === 0) {
        return null;
    }

    const visibleClients = clients.filter(c => c.isVisible !== false);

    if (visibleClients.length === 0) {
        return null;
    }

    return (
        <section className={`py-12 md:py-16 transition-colors duration-300 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800/30'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10 md:mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Ils nous <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">font confiance</span>
                    </h2>
                    <p className={`mt-4 max-w-2xl text-lg md:text-xl ${getTextColorClasses()} mx-auto`}>
                        Des entreprises innovantes qui nous ont choisi pour leurs projets numériques.
                    </p>
                </div>

                <div className="relative overflow-hidden">
                    <div className="flex items-center justify-center py-4 animate-carousel">
                        {[...visibleClients, ...visibleClients].map((client, index) => (
                            <div
                                key={`${client.id || client.name}-${index}`}
                                className="flex-shrink-0 px-4 sm:px-6 md:px-8 transition-transform duration-300"
                                style={{
                                    transform: `translateX(-${currentClientIndex * 100}%)`,
                                    transition: 'transform 0.5s ease-in-out'
                                }}
                            >
                                <div className="relative h-12 w-24 sm:h-16 sm:w-32">
                                    <Image
                                        src={client.logo}
                                        alt={client.name}
                                        fill
                                        className={`object-contain opacity-70 hover:opacity-100 transition-opacity ${theme === 'light' ? 'filter brightness-0' : ''}`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes carousel {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-carousel {
                    animation: carousel ${isMobile ? '15s' : '20s'} linear infinite;
                    display: flex;
                    width: 200%;
                }
            `}</style>
        </section>
    );
}