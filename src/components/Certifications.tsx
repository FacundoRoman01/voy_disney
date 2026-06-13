import React from "react";
import { motion } from "motion/react";
import { Award } from "lucide-react";

export default function Certifications() {
  const certs = [
    {
      id: "1",
      label: "College of Disney Knowledge",
      badge: "DISNEY KNOWLEDGE",
      entity: "Martina Bruñol Giorgio",
      year: "2025",
      image: "/assets/img/Logo_y_certificados/73190f13-c4cc-434e-b60c-4dceda2937da.webp"
    },
    {
      id: "2",
      label: "College of Disney Knowledge",
      badge: "DISNEY KNOWLEDGE",
      entity: "Agustín Correa",
      year: "2025",
      image: "/assets/img/Logo_y_certificados/73190f13-c4cc-434e-b60c-4dceda2937daa.webp"
    },
    {
      id: "3",
      label: "Universal Orlando Especialista",
      badge: "UNIVERSAL ESPECIALISTA",
      entity: "Martina Bruñol Giorgio",
      year: "2026",
      image: "/assets/img/Logo_y_certificados/IMG_2563.webp"
    },
    {
      id: "4",
      label: "Authorized Disney Vacation Planner",
      badge: "AUTHORIZED PLANNER",
      entity: "Disney Destinations",
      year: "2025",
      image: "/assets/img/Logo_y_certificados/IMG_6848.webp"
    },
    {
      id: "5",
      label: "Authorized Travel Professional",
      badge: "TRAVEL PROFESSIONAL",
      entity: "Universal Orlando Resort",
      year: "2025",
      image: "/assets/img/Logo_y_certificados/IMG_6860.webp"
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-gray-100 px-4 sm:px-8 lg:px-12">
      <div className="max-w-screen-2xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-20">
          <span className="text-disney-pink font-sans font-bold text-[10px] sm:text-xs tracking-widest uppercase block mb-3 sm:mb-4">
            AVALADOS & CAPACITADOS
          </span>
          <h2 className="font-serif text-ink text-3xl sm:text-5xl lg:text-6xl font-medium leading-tight mb-4 sm:mb-8">
            Nuestras{" "}
            <span className="text-disney-pink italic font-normal inline-block">certificaciones</span>
          </h2>
          <p className="font-sans text-ink-soft text-base sm:text-xl font-light leading-relaxed max-w-2xl mx-auto">
            Nos formamos de manera continua para asesorarte con conocimiento real y actualizado.
          </p>
        </div>

        {/* Grid de Certificaciones: 2 columnas en mobile, 3 en lg, 5 en xl */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-8 lg:gap-10">
          {certs.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
              // El 5to elemento ocupa 2 columnas en mobile/tablet y 1 columna en desktop
              className={`bg-white rounded-xl p-4 sm:p-8 border border-gray-100 shadow-lg flex flex-col items-center justify-between hover:shadow-2xl transition-all duration-300 group ${
                index === 4 ? "col-span-2 lg:col-span-1" : "col-span-1"
              }`}
            >
              {/* Photo box container */}
              <div className={`w-full aspect-[4/3] rounded-lg relative flex items-center justify-center mb-6 sm:mb-10 border border-gray-100 overflow-hidden bg-gray-50/50 ${index === 4 ? "max-w-[200px] lg:max-w-none mx-auto" : ""}`}>
                <img
                  src={cert.image}
                  alt={cert.label}
                  width="400"
                  height="300"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 text-disney-pink/70 z-10 p-1 sm:p-1.5 rounded-full backdrop-blur-sm bg-white/80 border border-gray-100">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>

              {/* Text metadata */}
              <div className="text-center w-full">
                <div className="inline-block bg-white shadow-sm px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full border border-gray-100 mb-4 sm:mb-6">
                  <span className="text-[9px] sm:text-xs font-sans font-semibold tracking-wider text-disney-pink uppercase block leading-none">
                    {cert.badge}
                  </span>
                </div>
                <h4 className="font-sans font-semibold text-ink text-xs sm:text-sm tracking-tight mb-1 sm:mb-2 leading-snug">
                  {cert.label}
                </h4>
                <p className="font-sans text-[10px] sm:text-xs text-ink-soft font-light tracking-wide">
                  {cert.entity} • {cert.year}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}