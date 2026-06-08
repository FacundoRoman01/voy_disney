import React from "react";
import { motion } from "motion/react";
import { FEATURES_DATA } from "../data/mockData";
import { Award, Notebook, HeartHandshake, MapPin } from "lucide-react";

export default function WhyUs() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Award":
        return <Award className="w-6 h-6 stroke-[1.25]" />;
      case "Notebook":
        return <Notebook className="w-6 h-6 stroke-[1.25]" />;
      case "HeartHandshake":
        return <HeartHandshake className="w-6 h-6 stroke-[1.25]" />;
      case "MapPin":
        return <MapPin className="w-6 h-6 stroke-[1.25]" />;
      default:
        return <Award className="w-6 h-6 stroke-[1.25]" />;
    }
  };

  return (
    <section
      id="por-que-elegirnos"
      className="py-20 lg:py-28 bg-disney-pink-wash px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-disney-pink font-sans font-extrabold text-[11px] tracking-widest uppercase block mb-4">
            CONFÍA EN EXPERTAS
          </span>
          <h2 className="font-serif text-ink text-3xl sm:text-4xl lg:text-[49px] font-medium leading-[1.08] tracking-[-0.01em] mb-6">
            ¿Por qué elegirnos para planificar tu{" "}
            <span className="text-disney-pink italic font-normal inline-block">viaje mágico?</span>
          </h2>
          <p className="font-sans text-ink-soft text-lg font-light leading-relaxed">
            Te ahorramos tiempo, dinero e incertidumbre. Creamos itinerarios inteligentes para que te
            dediques exclusivamente a disfrutar.
          </p>
        </div>

        {/* Feature Bento-Grid or Quad Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES_DATA.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-brand-white rounded-md p-8 border border-line shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center relative overflow-hidden"
            >
              {/* Soft decorative background splash */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-disney-pink-wash rounded-full opacity-55 blur-xl"></div>

              {/* Icon nestled inside a thin circular ring */}
              <div className="w-14 h-14 bg-disney-pink-light text-disney-pink rounded-full flex items-center justify-center border border-line mb-6 shrink-0 shadow-sm">
                {getIcon(feature.icon)}
              </div>

              <h4 className="font-serif text-xl text-ink mb-3 font-medium leading-[1.08] tracking-[-0.01em]">
                {feature.title}
              </h4>
              <p className="font-sans text-ink-soft font-light text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Brand Value Footer card */}
        <div className="mt-16 bg-disney-pink-wash/70 border border-line rounded-lg p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h4 className="font-serif text-ink text-xl sm:text-2xl mb-1.5 font-medium leading-[1.08] tracking-[-0.01em]">
              ¿Tenés dudas sobre los pases, reservas de comida o filas rápidas?
            </h4>
            <p className="font-sans text-ink-soft text-sm font-light">
              No dejes nada librado al azar. Resolvemos todo por vos con soporte vía WhatsApp durante
              tu estancia.
            </p>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById("contacto");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-disney-pink hover:bg-disney-pink-deep text-brand-white font-sans font-semibold px-6 py-3 rounded-full text-sm shadow-sm transition-colors shrink-0 cursor-pointer"
          >
            Chatear con nosotros
          </button>
        </div>
      </div>
    </section>
  );
}
