import React, { useEffect } from "react";
import { motion } from "motion/react";
import { 
  Home, Ticket, Zap, Utensils, Car, Bus, ShieldCheck, Plane, Map, Sparkles
} from "lucide-react";
import { SERVICES_DATA } from "../data/mockData";
import { Service } from "../types";
import ServiceCard from "../components/ServiceCard";

interface ServicesProps {
  onSelectService: (service: Service) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  // Precarga la primera imagen de cada card apenas carga la sección
  // Las imágenes extra se precargan cuando el usuario abre cada modal
  useEffect(() => {
    SERVICES_DATA.forEach((service) => {
      if (service.images?.[0]?.url) {
        const el = new Image();
        el.src = service.images[0].url;
      }
    });
  }, []);

  return (
    <section
      id="servicios"
      className="py-20 lg:py-28 bg-brand-white border-y border-line px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-disney-pink font-sans font-extrabold text-[11px] tracking-widest uppercase block mb-4">
            NUESTROS SERVICIOS
          </span>
          <h2 className="font-serif text-ink text-3xl sm:text-4xl lg:text-[49px] font-medium leading-[1.08] tracking-[-0.01em] mb-6">
            ¿En qué podemos{" "}
            <span className="text-disney-pink italic font-normal inline-block">ayudarte?</span>
          </h2>
          <p className="font-sans text-ink-soft text-lg font-light leading-relaxed">
            No vendemos paquetes armados:{" "}
            <span className="text-disney-pink font-medium">diseñamos tu viaje a tu medida</span>,
            según tu presupuesto y tu idea de viaje.
          </p>
        </div>

        {/* Brand Specialty Header */}
        <div className="border-l-4 border-disney-pink pl-6 py-1 mb-10 max-w-2xl">
          <h3 className="font-serif text-xl sm:text-2xl text-ink font-medium leading-[1.08] tracking-[-0.01em]">
            Nuestra especialidad: <span className="text-disney-pink italic">Disney & Universal</span>
          </h3>
          <p className="font-sans text-xs text-ink-soft mt-1 uppercase tracking-wider">
            Somos especialistas. Esto es lo que mejor sabemos hacer.
          </p>
        </div>

        {/* Services Cards Grid */}
        {/* FIX: animación a nivel de contenedor, no por card individual */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {SERVICES_DATA.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              onClick={() => onSelectService(service)}
            />
          ))}
        </motion.div>

        {/* GESTIONAMOS POR VOS */}
        <div className="mt-16 sm:mt-24 bg-[#f8f9fa] border border-line/60 rounded-[32px] p-6 sm:p-8 md:p-10 select-none">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-3">
              <span className="text-[11px] font-sans font-extrabold tracking-widest text-[#efa9c0] uppercase block">
                GESTIONAMOS POR VOS
              </span>
            </div>
            <div className="lg:col-span-9 flex flex-wrap gap-2.5">
              {[
                { text: "Hoteles dentro y fuera de los parques", icon: Home },
                { text: "Tickets de parques", icon: Ticket },
                { text: "Pases de fila rápida", icon: Zap },
                { text: "Reserva de restaurantes", icon: Utensils },
                { text: "Traslados", icon: Bus },
                { text: "Asistencia médica", icon: ShieldCheck },
                { text: "Alquiler de autos", icon: Car },
              ].map((tag, idx) => {
                const TagIcon = tag.icon;
                return (
                  // FIX: reemplazamos motion.div+whileHover por CSS puro — sin overhead JS
                  <div
                    key={idx}
                    className="bg-brand-white px-4 py-2.5 rounded-full border border-line flex items-center gap-2 shadow-xs font-sans text-xs sm:text-[13px] text-ink-soft font-normal transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.02]"
                  >
                    <TagIcon className="w-4 h-4 text-[#efa9c0]" />
                    <span>{tag.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* TRAVEL USA */}
        <div className="mt-24 sm:mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-10">
            <div className="lg:col-span-7">
              <h3 className="font-serif text-[28px] sm:text-[36px] text-ink font-medium leading-[1.1] tracking-tight">
                ¿Viajás por Estados Unidos?{" "}
                <span className="text-disney-pink italic font-normal block sm:inline mt-1 sm:mt-0">
                  También te lo armamos
                </span>
              </h3>
            </div>
            <div className="lg:col-span-5 border-l border-line sm:border-l-2 pl-4 sm:pl-6 py-1">
              <p className="font-sans text-sm sm:text-base text-ink-soft font-light leading-relaxed">
                No solo parques:{" "}
                <span className="font-medium text-disney-pink">
                  nos ocupamos de cada aspecto de tu experiencia
                </span>{" "}
                para diseñar el viaje perfecto a tu medida por Estados Unidos.
              </p>
            </div>
          </div>

          <div className="bg-brand-white border border-[#eaeaea] rounded-[32px] p-8 sm:p-12 shadow-xs select-none">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 sm:gap-8 justify-center items-stretch">
              {[
                { label: "Pasajes aéreos",        icon: Plane      },
                { label: "Hoteles seleccionados", icon: Home       },
                { label: "Alquiler de autos",     icon: Car        },
                { label: "Traslados",             icon: Bus        },
                { label: "Entradas y actividades",icon: Ticket     },
                { label: "Excursiones y tours",   icon: Map        },
                { label: "Eventos y shows",       icon: Sparkles   },
                { label: "Asistencia médica",     icon: ShieldCheck},
              ].map((item, idx) => {
                const ItemIcon = item.icon;
                return (
                  // FIX: CSS transform puro — sin spring physics en hover
                  <div
                    key={idx}
                    className="flex flex-col items-center justify-between group text-center space-y-3"
                  >
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#fdf5f7] border border-[#fbebf0] text-[#efa9c0] flex items-center justify-center shadow-xs transition-all duration-200 group-hover:-translate-y-1 group-hover:scale-105 group-hover:bg-[#fbebf0] group-hover:border-[#efa9c0]/35 shrink-0">
                      <ItemIcon className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-semibold font-sans text-[#333333] leading-tight">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}