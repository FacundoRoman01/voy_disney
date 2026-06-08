import React from "react";
import { motion } from "motion/react";
import { Heart, Star, Map, CalendarCheck, Compass } from "lucide-react";

export default function TrustBar() {
  const trustItems = [
    {
      id: "atencion",
      title: "ATENCIÓN PERSONALIZADA",
      description: "Te acompañamos en cada paso del viaje.",
      icon: <Heart className="w-5 h-5 text-disney-pink fill-none stroke-[1.5]" />,
    },
    {
      id: "expertos",
      title: "EXPERTOS EN DISNEY & UNIVERSAL",
      description: "Conocemos los parques y te asesoramos mejor.",
      icon: <Star className="w-5 h-5 text-disney-pink fill-none stroke-[1.5]" />,
    },
    {
      id: "planificacion",
      title: "PLANIFICACIÓN A MEDIDA",
      description: "Itinerarios pensados para vos y tu familia.",
      icon: <Map className="w-5 h-5 text-disney-pink fill-none stroke-[1.5]" />,
    },
    {
      id: "reservas",
      title: "RESERVAS Y GESTIONES",
      description: "Nos encargamos de todo para que no te preocupes.",
      icon: <CalendarCheck className="w-5 h-5 text-disney-pink fill-none stroke-[1.5]" />,
    },
    {
      id: "experiencia",
      title: "EXPERIENCIA REAL",
      description: "Viajamos, disfrutamos y probamos para vos.",
      icon: <Compass className="w-5 h-5 text-disney-pink fill-none stroke-[1.5]" />,
    },
  ];

  return (
    <section className="bg-brand-white border-b border-line py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-6">
          {trustItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center cursor-default group"
            >
              {/* Pink Accent Circle with Minimal Icon */}
              <div className="w-14 h-14 bg-disney-pink-light text-disney-pink rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                {item.icon}
              </div>

              {/* Title */}
              <h4 className="font-sans font-bold text-ink text-xs tracking-wider leading-snug mb-2 uppercase px-4">
                {item.title}
              </h4>

              {/* Description */}
              <p className="font-sans text-ink-soft font-light text-[13px] leading-relaxed max-w-[210px]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
