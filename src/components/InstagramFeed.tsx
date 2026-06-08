import React from "react";
import { Instagram } from "lucide-react";
import { motion } from "motion/react";

export default function InstagramFeed() {
  const feedItems = [
    {
      id: "feed-1",
      image: "assets/img/Disney_&_Universal_Orlando/27C2871C-E1E2-4FA8-AFBA-64F86C3032D7.webp",
      alt: "Catedral de Cenicienta en Magic Kingdom Orlando",
    },
    {
      id: "feed-2",
      image: "assets/img/Disney_&_Universal_Orlando/IMG_6061.webp",
      alt: "Spaceship Earth icónico de Epcot de noche",
    },
    {
      id: "feed-3",
      image: "assets/img/Disneyland_Paris/IMG_2554.webp",
      alt: "Crucero navegando por aguas turquesas del Caribe",
    },
    {
      id: "feed-4",
      image: "assets/img/Disneyland_Paris/IMG_2556.webp",
      alt: "Lentes de Mickey Mouse frente al castillo iluminado",
    },
    {
      id: "feed-5",
      image: "assets/img/Crucero/IMG_2562.webp",
      alt: "Montaña rusa de aventura y atracciones en Universal",
    },
    {
      id: "feed-6",
      image: "assets/img/California_y_Los_angeles/IMG_2543.webp",
      alt: "Globos y festejos mágicos en parques temáticos",
    },
  ];

  return (
    <section className="pt-16 pb-0 bg-brand-white overflow-hidden border-t border-line">
      {/* Heading */}
      <div className="text-center mb-10 px-4">
        <a
          href="https://www.instagram.com/voydisney/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 group cursor-pointer"
        >
          <span className="text-[#efa9c0] font-sans font-extrabold tracking-widest text-xs sm:text-sm uppercase select-none transition-colors group-hover:text-disney-pink-deep">
            SEGUINOS EN INSTAGRAM @voydisney
          </span>
          <Instagram className="w-5 h-5 text-[#efa9c0] transition-transform duration-300 group-hover:scale-110 group-hover:text-disney-pink-deep" />
        </a>
      </div>

      {/* Grid */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0"
      >
        {feedItems.map((item) => (
          <a
            key={item.id}
            href="https://www.instagram.com/voydisney/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative block aspect-square overflow-hidden group cursor-pointer"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.alt}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              referrerPolicy="no-referrer"
            />

            {/* Overlay siempre visible — rosa suave + ícono Instagram centrado */}
            <div className="absolute inset-0 bg-[#efa9c0]/30 flex items-center justify-center">
              <div className="w-11 h-11 rounded-full bg-white/95 flex items-center justify-center shadow-md">
                <Instagram className="w-5 h-5 text-[#efa9c0]" />
              </div>
            </div>
          </a>
        ))}
      </motion.div>
    </section>
  );
}