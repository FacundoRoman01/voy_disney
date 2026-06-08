import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      id: "1",
      name: "Micaela — Familia",
      tripType: "Disney World",
      text: "Excelente atención desde el primer momento hasta que volvimos. Siempre presentes y resolvieron todo.",
      rating: 5,
    },
    {
      id: "2",
      name: "Martín y Juli",
      tripType: "Universal Orlando",
      text: "Gracias a Flor y Fran tuvimos el viaje más organizado y disfrutamos cada minuto sin preocupaciones.",
      rating: 5,
    },
    {
      id: "3",
      name: "Agus y Leo",
      tripType: "Disney Cruise Line",
      text: "El crucero fue soñado. Nos ayudaron con todo y los consejos hicieron la diferencia.",
      rating: 5,
    },
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

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
            Historias que nos <span className="text-disney-pink italic font-normal inline-block">llenan el alma</span>
          </h2>
        </div>

        {/* Desktop View (Side by Side Grid) */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-brand-white rounded-md p-8 border border-line shadow-sm relative flex flex-col justify-between hover:shadow-md transition-all duration-300"
            >
              <div>
                {/* Visual Stars Row */}
                <div className="flex space-x-1 mb-6">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-disney-pink fill-disney-pink stroke-none" />
                  ))}
                </div>

                {/* Testimonial text */}
                <p className="font-serif text-ink italic font-normal text-base sm:text-[17px] leading-relaxed mb-8">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              {/* Author Info block */}
              <div className="flex items-center space-x-4 mt-auto pt-5 border-t border-line">
                <div className="w-11 h-11 bg-disney-pink-wash border border-line flex items-center justify-center text-[10px] font-sans font-extrabold text-disney-pink shrink-0 rounded-full shadow-inner select-none">
                  FOTO
                </div>
                <div>
                  <h4 className="font-sans font-bold text-ink text-sm tracking-tight">
                    {item.name}
                  </h4>
                  <p className="font-sans text-[11px] text-disney-pink font-bold uppercase tracking-wider mt-0.5">
                    {item.tripType}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel View */}
        <div className="md:hidden relative px-2">
          <div className="min-h-[260px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-brand-white rounded-md p-8 border border-line shadow-sm flex flex-col justify-between w-full"
              >
                <div>
                  <div className="flex space-x-1 mb-6">
                    {Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-disney-pink fill-disney-pink stroke-none" />
                    ))}
                  </div>

                  <p className="font-serif text-ink italic font-normal text-base leading-relaxed mb-8">
                    &ldquo;{testimonials[activeIndex].text}&rdquo;
                  </p>
                </div>

                <div className="flex items-center space-x-4 mt-auto pt-5 border-t border-line">
                  <div className="w-11 h-11 bg-disney-pink-wash border border-line flex items-center justify-center text-[10px] font-sans font-extrabold text-disney-pink shrink-0 rounded-full select-none">
                    FOTO
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-ink text-sm tracking-tight">
                      {testimonials[activeIndex].name}
                    </h4>
                    <p className="font-sans text-[11px] text-disney-pink font-bold uppercase tracking-wider mt-0.5">
                      {testimonials[activeIndex].tripType}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Custom Decorative Carousel Controls Row */}
        <div className="flex items-center justify-center space-x-4 mt-12">
          {/* Left Button */}
          <button
            onClick={handlePrev}
            className="w-11 h-11 border border-line bg-brand-white hover:bg-disney-pink-light rounded-full flex items-center justify-center text-disney-pink transition-colors focus:outline-none cursor-pointer group shadow-sm"
          >
            <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>

          {/* Indicators matching screenshot exactly */}
          <div className="flex items-center space-x-2">
            {testimonials.map((_, idx) => {
              const isActive = mdActive() ? true : activeIndex === idx;

              // To replicate the pill indicator (selected) and simple dots,
              // but since desktop has all 3 active, we show all active as pill or we animate it dynamically.
              // Let's create a dynamic indicator!
              return (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
                    isActive
                      ? "w-8 bg-disney-pink"
                      : "w-2.5 bg-disney-pink-light hover:bg-disney-pink/50"
                  }`}
                />
              );
            })}
          </div>

          {/* Right Button */}
          <button
            onClick={handleNext}
            className="w-11 h-11 border border-line bg-brand-white hover:bg-disney-pink-light rounded-full flex items-center justify-center text-disney-pink transition-colors focus:outline-none cursor-pointer group shadow-sm"
          >
            <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Under-caption matching exactly */}
        <div className="text-center mt-12">
          <p className="font-sans text-[11px] text-ink-soft/80 font-light tracking-wide flex items-center justify-center gap-1.5 uppercase">
            Reseñas reales de viajeros · fáciles de actualizar con cada nuevo mensaje que recibimos <span className="text-xs">💌</span>
          </p>
        </div>
      </div>
    </section>
  );
}

// Simple helper to check if we are on desktop where all slide/indicators can be represented
function mdActive() {
  if (typeof window !== "undefined") {
    return window.innerWidth >= 768;
  }
  return false;
}

