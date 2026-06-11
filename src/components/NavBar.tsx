import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Menu, X, Sparkles } from "lucide-react";

interface NavBarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  onOpenQuote: () => void;
}

export default function NavBar({ onNavigate, activeSection, onOpenQuote }: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Inicio", id: "inicio" },
    { label: "Quiénes somos", id: "quienes-somos" },
    { label: "Servicios", id: "servicios" },
    { label: "Por qué elegirnos", id: "por-que-elegirnos" },
    { label: "Testimonios", id: "testimonios" },
    { label: "Contacto", id: "contacto" },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <nav
      id="main-navbar"
      // Se han movido 'bg-brand-white/95' y 'backdrop-blur-md' fuera de la condición
      // para que estén siempre presentes. El padding (py), la sombra y el borde siguen siendo dinámicos.
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-brand-white/95 backdrop-blur-md ${
        scrolled
          ? "shadow-sm border-b border-line py-3"
          : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand */}
          <div
            className="flex items-center cursor-pointer group"
            onClick={() => handleItemClick("inicio")}
          >
  <img 
  src="/assets/img/voyDisney_logo.svg" 
  alt="Logo Voy Disney" 
  className="h-20 w-auto transition-transform duration-300 group-hover:scale-105"
/>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`font-sans text-sm font-medium transition-colors hover:text-disney-pink-deep relative py-1 ${
                    activeSection === item.id ? "text-disney-pink" : "text-ink-soft"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-disney-pink rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0 4px 18px rgba(222, 138, 168, 0.15)" }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenQuote}
              className="bg-disney-pink text-brand-white font-sans font-medium px-6 py-2.5 rounded-full flex items-center space-x-2 text-sm shadow-sm transition-colors hover:bg-disney-pink-deep cursor-pointer"
            >
              <span>Cotizar mi viaje</span>
              <Sparkles className="w-3.5 h-3.5" />
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-full text-ink-soft hover:text-disney-pink hover:bg-disney-pink-light focus:outline-none focus:ring-2 focus:ring-inset focus:ring-disney-pink"
            >
              <span className="sr-only">Abrir menú</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="lg:hidden bg-brand-white/95 backdrop-blur-md border-b border-line shadow-md"
        >
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-sm font-sans text-base font-medium transition-colors ${
                  activeSection === item.id
                    ? "bg-disney-pink-light/60 text-disney-pink-deeper"
                    : "text-ink-soft hover:bg-disney-pink-wash hover:text-disney-pink-deep"
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 px-4">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenQuote();
                }}
                className="w-full bg-disney-pink text-brand-white font-sans font-medium px-5 py-3 rounded-full flex items-center justify-center space-x-2 text-base shadow-sm hover:bg-disney-pink-deep"
              >
                <span>Cotizar mi viaje</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}