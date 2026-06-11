import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Sparkles, Compass, Milestone, Ship, Star } from "lucide-react";
import { Service } from "../types";

interface ServiceCardProps {
  key?: string | number;
  service: Service;
  index: number;
  onClick: () => void;
}

export default function ServiceCard({ service, index, onClick }: ServiceCardProps) {
  const renderIcon = (iconName: string) => {
    const cls = "w-[18px] h-[18px] stroke-[1.8]";
    switch (iconName) {
      case "Sparkles":  return <Sparkles className={cls} />;
      case "Compass":   return <Compass className={cls} />;
      case "Milestone": return <Milestone className={cls} />;
      case "Ship":      return <Ship className={cls} />;
      case "Star":      return <Star className={cls} />;
      default:          return <Sparkles className={cls} />;
    }
  };

  const hasImage = service.images && service.images.length > 0;
  
  // Detectamos si es la primera card
  const isHighlighted = index === 0;

  return (
    <div
      onClick={onClick}
      className={`bg-brand-white rounded-[20px] overflow-hidden flex flex-col h-full group cursor-pointer select-none transition-all duration-300 relative ${
        isHighlighted 
          ? "border-[2.5px] border-[#efa9c0]" // Borde un poco más grueso y definido
          : "border border-line"
      }`}
      style={{
        // Sombra rosada mucho más fuerte para la card destacada
        boxShadow: isHighlighted 
          ? "0 8px 24px rgba(239,169,192,0.4)" 
          : "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.25s ease, transform 0.25s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.boxShadow = isHighlighted
          // Hover ultra marcado para la primera
          ? "0 16px 40px rgba(239,169,192,0.6), 0 8px 16px rgba(0,0,0,0.1)" 
          : "0 12px 32px rgba(239,169,192,0.25), 0 4px 12px rgba(0,0,0,0.12)";
        el.style.transform = "translateY(-6px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.boxShadow = isHighlighted
          ? "0 8px 24px rgba(239,169,192,0.4)"
          : "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)";
        el.style.transform = "translateY(0)";
      }}
    >
      {/* Image area */}
      <div className="h-44 sm:h-48 relative overflow-hidden shrink-0 bg-disney-pink-wash/20">
        
        {/* Tinte más marcado en la foto destacada */}
        {isHighlighted && hasImage && (
          <div className="absolute inset-0 bg-[#efa9c0]/30 mix-blend-multiply z-10 pointer-events-none group-hover:bg-transparent transition-colors duration-500" />
        )}

        {hasImage ? (
          <>
            <img
  src={service.images![0].url}
  alt={service.title}
  width="400"  
  height="300" 
  loading="lazy"
  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
  referrerPolicy="no-referrer"
/>
            {/* Resting vignette inferior */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-80" />
          </>
        ) : (
          <div className="absolute inset-0 magic-stripes opacity-40" />
        )}

        {/* NOTA: Se eliminó completamente el bloque de la Píldora (Badge) de aquí */}
      </div>

      {/* Content Area */}
      <div className="p-5 pt-8 flex flex-col flex-grow gap-3 relative bg-brand-white text-center">
        
        {/* Ícono Circular Flotante */}
        <div className={`absolute -top-6 left-1/2 -translate-x-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center border-[3.5px] border-brand-white transition-transform duration-300 group-hover:scale-110 ${
          isHighlighted 
            ? "bg-[#efa9c0] text-brand-white shadow-[0_4px_12px_rgba(239,169,192,0.6)]" // Ícono con sombra rosada propia
            : "bg-[#fbebf0] text-[#efa9c0] shadow-sm"
        }`}>
          {renderIcon(service.icon)}
        </div>

        <div className="flex-grow">
          <h4 className="font-sans font-bold text-ink text-[15px] sm:text-base leading-snug tracking-tight mb-2.5 px-2">
            {service.title}
          </h4>
          <p className="font-sans text-[13px] text-ink-soft font-light leading-relaxed line-clamp-3">
            {service.description}
          </p>
        </div>

        {/* CTA row (Ver detalle) */}
        <div className="pt-2 mt-auto flex flex-col items-center justify-center">
          <span className={`font-sans text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5 group-hover:gap-2 transition-all duration-200 ${
            isHighlighted 
              ? "text-[#efa9c0]" 
              : "text-[#efa9c0]/70"
          }`}>
            Ver detalle
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
          
          {hasImage && service.images!.length > 1 && (
            <span className="text-[10px] font-sans text-ink-soft/40 tabular-nums mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              {service.images!.length} fotos
            </span>
          )}
        </div>
      </div>
    </div>
  );
}