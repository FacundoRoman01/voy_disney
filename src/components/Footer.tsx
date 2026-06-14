import React from "react";
import { ShieldCheck, Instagram, Heart } from "lucide-react";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-disney-pink-wash text-ink-soft py-16 border-t border-line px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Column 1 - Brand description */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center text-ink mb-2">
            {/* Logo de voyDisney */}
            <img 
              src="/assets/img/voyDisney_logo.svg" /* <-- REEMPLAZA ESTO CON LA RUTA REAL DE TU LOGO */
              alt="Voy Disney Logo" 
              className="h-20 sm:h-24 w-auto object-contain drop-shadow-sm"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-ink-soft font-light max-w-sm leading-relaxed">
            Agencia especializada en cumplir sueños en Disney World Orlando, Disneyland California, Cruceros Disney y Disneyland Paris. Diseñamos viajes a tu medida con dedicación mágica.
          </p>
          <div className="flex items-center space-x-3 text-emerald-600 text-xs font-semibold uppercase tracking-wide bg-brand-white py-2 px-3 border border-line rounded-sm w-fit shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>REGISTRADO & CERTIFICADO OFICIAL</span>
          </div>
        </div>

        {/* Column 2 - Links */}
        <div>
          <h4 className="text-ink text-xs font-bold uppercase tracking-widest mb-4">Navegación</h4>
          <ul className="space-y-2.5 text-sm font-light">
            <li>
              <button onClick={() => onNavigate("inicio")} className="hover:text-disney-pink text-ink-soft transition-colors cursor-pointer">
                Inicio
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate("quienes-somos")} className="hover:text-disney-pink text-ink-soft transition-colors cursor-pointer">
                Quiénes somos
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate("servicios")} className="hover:text-disney-pink text-ink-soft transition-colors cursor-pointer">
                Nuestros servicios
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate("por-que-elegirnos")} className="hover:text-disney-pink text-ink-soft transition-colors cursor-pointer">
                Por qué elegirnos
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3 - Social and Contacts */}
        <div>
          <h4 className="text-ink text-xs font-bold uppercase tracking-widest mb-4">Contacto</h4>
          <ul className="space-y-2 text-sm font-light">
            {/* AQUÍ SE HIZO EL CAMBIO DEL BOTÓN DE WHATSAPP */}
            <li className="flex items-center gap-2">
              <span className="font-semibold text-ink">WhatsApp:</span> 
              <a 
                href="https://wa.me/5491136903650" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-disney-pink transition-colors"
              >
                +54 9 11 3690-3650
              </a>
            </li>
  <li className="flex items-center gap-2">
  <span className="font-semibold text-ink">Email:</span> 
  <a 
    href="mailto:voydisney@magicfansagents.com"
    className="hover:text-disney-pink transition-colors"
  >
    voydisney@magicfansagents.com
  </a>
</li>
            <li className="flex items-center gap-2 mt-4 pt-4 border-t border-line">
              <a
                href="https://instagram.com/voydisney"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-brand-white hover:bg-disney-pink-light border border-line text-disney-pink shadow-sm transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <span className="text-xs text-ink-soft font-medium">@voydisney.agusymarti</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer legalities */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-between text-xs text-ink-soft font-light gap-4">
        <p>© {new Date().getFullYear()} Voy Disney por Agus & Marti. Todos los derechos reservados.</p>
        
        {/* AQUÍ SE REEMPLAZÓ EL TEXTO POR LOS PERFILES DE LINKEDIN */}
        <p className="flex items-center gap-1.5 flex-wrap">
          Desarrollado por 
          <a 
            href="https://www.linkedin.com/in/facundoroman/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-medium hover:text-disney-pink transition-colors"
          >
            Facundo Roman
          </a>
          y
          <a 
            href="https://www.linkedin.com/in/mateo-muraglia-200415294/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-medium hover:text-disney-pink transition-colors"
          >
            Mateo Muraglia
          </a>
        </p>

      </div>
    </footer>
  );
}