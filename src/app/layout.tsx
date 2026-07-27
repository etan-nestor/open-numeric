import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import './theme.css';
import { ThemeProvider } from "@/components/context/ThemeContext";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Open Numeric - Solutions Numériques Complètes",
  description: "Développement, design, formation et maintenance pour propulser votre entreprise à l'ère digitale",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}