import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import './theme.css';
import Navbar from './components/NavBar/Navbar';
import Footer from './components/Footer/Footer';
import { ThemeProvider } from "./components/context/ThemeContext";

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
        <div className="min-h-screen flex flex-col">
          <ThemeProvider>
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}