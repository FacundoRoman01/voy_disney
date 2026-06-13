import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      id: "1",
      name: "Familia Tortoriello",
      groupSize: "Grupo familiar · 6 personas",
      date: "Marzo 2026",
      text: "Gracias por todo, fue un viaje inolvidable, mágico y emocionante. Gracias por estar todo el tiempo al pendiente y por tu soporte. Lo repetiríamos sin dudarlo, y épico el cierre de parques con Magic, es para hacerlo mil veces.",
      rating: 5,
    },
    {
      id: "2",
      name: "Iliana Ugolino",
      groupSize: "Grupo familiar · 5 personas",
      date: "Junio 2026",
      text: "La pasamos espectacular, fue un sueño cumplido y cada día superó nuestras expectativas. Todo salió tal cual lo planeamos, sin contratiempos. Queremos agradecerte de corazón por tu predisposición, paciencia y acompañamiento en todo momento.",
      rating: 5,
    },
    {
      id: "3",
      name: "Familia Fracchia",
      groupSize: "Grupo familiar · 9 personas",
      date: "Abril 2026",
      text: "Hermoso todo Martu, fue mágico y su servicio perfecto. Si volvemos, sin duda te vamos a contactar y recomendar.",
      rating: 5,
    },
    {
      id: "4",
      name: "Claudia Aletto",
      groupSize: "Grupo familiar · 2 personas",
      date: "Mayo 2026",
      text: "Todo fantástico, la planificación súper. Gracias por acompañarnos en cada momento y hacer que este viaje haya salido mejor de lo que soñamos.",
      rating: 5,
    },
    {
      id: "5",
      name: "Alejandro Picardi",
      groupSize: "Grupo familiar · 4 personas",
      date: "Enero 2026",
      text: "Martu, una grosa, todo impecable. Gracias por el regalito también. Fue una experiencia increíble y ya estamos pensando cuándo será la vuelta — obviamente serás recomendada.",
      rating: 5,
    },
    {
      id: "6",
      name: "Javier Flores",
      groupSize: "Grupo familiar · 3 personas",
      date: "Diciembre 2025",
      text: "Todo excelente. Al principio nos agobiaba tanta información de los parques por la inmensidad que tienen, pero contábamos con tu planificación que ayudó en todo momento. En Julio 2026 volvemos con ustedes.",
      rating: 5,
    },
    {
      id: "7",
      name: "Familia Di Nesta",
      groupSize: "Grupo familiar · 5 personas",
      date: "Enero 2026",
      text: "Muchas gracias por los detalles y la planificación, todo excelente.",
      rating: 5,
    },
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Desktop: 3 visible cards cycling through all
  const visibleCards = [0, 1, 2].map(
    (offset) => testimonials[(activeIndex + offset) % testimonials.length]
  );

  const current = testimonials[activeIndex];

  return (
    <section
      id="testimonios"
      className="py-20 lg:py-28 bg-brand-white border-y border-line px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-disney-pink font-sans font-extrabold text-[11px] tracking-widest uppercase block mb-4">
            LO QUE DICEN NUESTROS VIAJEROS
          </span>
          <h2 className="font-serif text-ink text-3xl sm:text-4xl lg:text-[49px] font-medium leading-[1.08] tracking-[-0.01em]">
            Historias que nos{" "}
            <span className="text-disney-pink italic font-normal inline-block">
              llenan el alma
            </span>
          </h2>
        </div>

        {/* Desktop: 3 cards */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {visibleCards.map((item, localIdx) => (
              <motion.div
                key={`${item.id}-${activeIndex}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ delay: localIdx * 0.07, duration: 0.35 }}
                className="bg-brand-white rounded-2xl p-8 border border-line shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
              >
                <div>
                  <div className="flex space-x-1 mb-6">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-disney-pink fill-disney-pink stroke-none" />
                    ))}
                  </div>
                  <p className="font-serif text-ink italic font-normal text-base sm:text-[17px] leading-relaxed mb-8">
                    &ldquo;{item.text}&rdquo;
                  </p>
                </div>
                <div className="pt-5 border-t border-line mt-auto">
                  <h4 className="font-sans font-bold text-ink text-sm tracking-tight">
                    {item.name}
                  </h4>
                  <p className="font-sans text-[11px] text-disney-pink font-bold uppercase tracking-wider mt-0.5">
                    {item.groupSize}
                  </p>
                  <p className="font-sans text-[10px] text-ink-soft/60 font-medium uppercase tracking-wider mt-0.5">
                    {item.date}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Mobile: 1 card */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-brand-white rounded-2xl p-8 border border-line shadow-sm flex flex-col"
            >
              <div>
                <div className="flex space-x-1 mb-6">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-disney-pink fill-disney-pink stroke-none" />
                  ))}
                </div>
                <p className="font-serif text-ink italic font-normal text-base leading-relaxed mb-8">
                  &ldquo;{current.text}&rdquo;
                </p>
              </div>
              <div className="pt-5 border-t border-line mt-auto">
                <h4 className="font-sans font-bold text-ink text-sm tracking-tight">
                  {current.name}
                </h4>
                <p className="font-sans text-[11px] text-disney-pink font-bold uppercase tracking-wider mt-0.5">
                  {current.groupSize}
                </p>
                <p className="font-sans text-[10px] text-ink-soft/60 font-medium uppercase tracking-wider mt-0.5">
                  {current.date}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-4 mt-12">
          <button
            onClick={handlePrev}
            className="w-11 h-11 border border-line bg-brand-white hover:bg-disney-pink-light rounded-full flex items-center justify-center text-disney-pink transition-colors focus:outline-none cursor-pointer group shadow-sm"
          >
            <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>

          <div className="flex items-center space-x-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
                  idx === activeIndex
                    ? "w-8 bg-disney-pink"
                    : "w-2.5 bg-disney-pink-light hover:bg-disney-pink/50"
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-11 h-11 border border-line bg-brand-white hover:bg-disney-pink-light rounded-full flex items-center justify-center text-disney-pink transition-colors focus:outline-none cursor-pointer group shadow-sm"
          >
            <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}