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
    const cls = "w-4 h-4 stroke-[1.8]";
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
  const isDestacado = service.id === "disney-universal-orlando";

  return (
    <div
      onClick={onClick}
      className="bg-brand-white rounded-[20px] overflow-hidden border border-line flex flex-col h-full group cursor-pointer select-none"
      style={{
        boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.25s ease, transform 0.25s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.boxShadow = "0 12px 32px rgba(239,169,192,0.18), 0 4px 12px rgba(0,0,0,0.08)";
        el.style.transform = "translateY(-6px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)";
        el.style.transform = "translateY(0)";
      }}
    >
      {/* Image area */}
      <div className="h-44 sm:h-48 relative overflow-hidden border-b border-line bg-disney-pink-wash/20 shrink-0">
        {hasImage ? (
          <>
            <img
              src={service.images![0].url}
              alt={service.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              referrerPolicy="no-referrer"
            />
            {/* Resting vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/5 transition-opacity duration-300 group-hover:opacity-80" />
          </>
        ) : (
          <div className="absolute inset-0 magic-stripes opacity-40" />
        )}

        {/* Badge */}
        {/* <div
          className={`absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full border text-[9px] font-sans font-extrabold tracking-wider uppercase ${
            isDestacado
              ? "bg-disney-pink text-brand-white border-disney-pink-deep/20"
              : "bg-brand-white/90 backdrop-blur-sm text-ink-soft border-line"
          }`}
        >
          {isDestacado ? "★ Destacado" : "Experiencia"}
        </div> */}

        {/* Icon pill — bottom right */}
        <div className="absolute bottom-3 right-3 z-10 w-8 h-8 bg-brand-white rounded-full flex items-center justify-center text-disney-pink border border-line shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:ring-2 group-hover:ring-disney-pink/20">
          {renderIcon(service.icon)}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow gap-3">
        <div className="flex-grow">
          <span className="text-[10px] font-sans font-bold text-disney-pink tracking-wider uppercase block mb-1.5">
            {service.badge}
          </span>
          <h4 className="font-sans font-bold text-ink text-sm leading-snug tracking-tight mb-2">
            {service.title}
          </h4>
          <p className="font-sans text-xs text-ink-soft font-light leading-relaxed line-clamp-3">
            {service.description}
          </p>
        </div>

        {/* CTA row */}
        <div className="border-t border-line pt-3.5 mt-auto flex items-center justify-between">
          <span className="font-sans text-[11px] font-bold text-disney-pink uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
            Ver detalle
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
          {/* Image count pill if multiple */}
          {service.images && service.images.length > 1 && (
            <span className="text-[10px] font-sans text-ink-soft/50 tabular-nums">
              {service.images.length} fotos
            </span>
          )}
        </div>
      </div>
    </div>
  );
}