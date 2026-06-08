import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import TrustBar from "../components/TrustBar";
import AboutUs from "../components/AboutUs";
import Certifications from "../components/Certifications";
import Services from "../components/Services";
import PaymentMethods from "../components/PaymentMethods";
import WhyUs from "../components/WhyUs";
import Testimonials from "../components/Testimonials";
// import ContactForm from "../components/ContactForm";
import ContactFormulario from "../components/ContactFormulario";
import InstagramFeed from "../components/InstagramFeed";
import MagicCallToAction from "../components/MagicCallToAction";
// 1. IMPORTA EL MODAL AQUÍ
import ServiceModal from "../components/ServiceModal"; 
import { Sparkles, Heart, Instagram, MessageCircle, ShieldCheck } from "lucide-react";
// 2. AGREGA AnimatePresence A LA IMPORTACIÓN DE motion/react
import { motion, AnimatePresence } from "motion/react"; 
// Importa el tipo Service
import { Service } from "../types"; 
import Footer from "../components/Footer";

export default function Home() {
  const [activeSection, setActiveSection] = useState("inicio");
  
  // Define el estado para el servicio seleccionado (wiring ya correcto)
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Smooth scroll helper
  const navigateToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // offset for nav bar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      setActiveSection(sectionId);
    }
  };

  // Scroll spy to highlight active section in navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      const sections = ["inicio", "quienes-somos", "servicios", "por-que-elegirnos", "testimonios", "contacto"];

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div id="app-root" className="min-h-screen bg-disney-pink-wash/20 font-sans text-ink antialiased selection:bg-disney-pink-light selection:text-disney-pink-deep">
      
      {/* Premium Header/Navigation bar */}
      <NavBar
        activeSection={activeSection}
        onNavigate={navigateToSection}
        onOpenQuote={() => navigateToSection("contacto")}
      />

      {/* Main Core Layout Sections */}
      <main>
        {/* Hero Section */}
        <Hero
          onQuoteClick={() => navigateToSection("contacto")}
          onServicesClick={() => navigateToSection("servicios")}
        />

        {/* Feature & Trust Strip */}
        <TrustBar />

        {/* About Us (Agus & Marti) */}
        <AboutUs onHistoryClick={() => navigateToSection("contacto")} />

        {/* Verified Official Certifications */}
        <Certifications />

        {/* Interactive Services / Destinations Guide */}
        {/* Wiring correcto: Services actualizará selectedService al hacer click en una card */}
        <Services onSelectService={setSelectedService} />

        {/* Flexible Payment Methods Block */}
        <PaymentMethods />

        {/* Core Value Reasons */}
        <WhyUs />

        {/* Client Testimonials */}
        <Testimonials />

        {/* Cotizador Custom Contact Form */}
        {/* <ContactForm /> */}
        <ContactFormulario />

        {/* Instagram Feed Section */}
        <InstagramFeed />

        {/* Magic Call to Action Button */}
        <MagicCallToAction onQuoteClick={() => navigateToSection("contacto")} />
      </main>

      {/* Footer */}
      <Footer onNavigate={navigateToSection} />

      {/* Floating Magic Sticky Chat Circle */}
      {/* ... contenido del chat sin cambios ... */}

      {/* ========================================== */}
      {/* 3. AGREGA ESTE BLOQUE AQUÍ AL FINAL, FUERA DE <main> PERO DENTRO DEL <div> RAÍZ */}
      {/* AnimatePresence gestiona la animación de salida cuando selectedService vuelve a ser null */}
      <AnimatePresence>
        {/* Renderizado condicional: si selectedService no es null, muestra el modal */}
        {selectedService && (
          <ServiceModal 
            service={selectedService} 
            // Función para cerrar: seteamos el estado de vuelta a null
            onClose={() => setSelectedService(null)} 
          />
        )}
      </AnimatePresence>
      {/* ========================================== */}
      
    </div>
  );
}