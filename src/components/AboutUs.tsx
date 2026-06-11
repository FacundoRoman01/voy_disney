import React from "react";
import { motion } from "motion/react";
import { Award, Sparkles } from "lucide-react"; // Heart se eliminó, ya no se usa

interface AboutUsProps {
  onHistoryClick: () => void;
}

const foundersPhotoSrc = "/assets/img/Disney_y_Universal_Orlando/agus_y_marti.webp"; 
const foundersPhotoAlt = "Agus y Marti, fundadoras de Voy Disney";

export default function AboutUs({ onHistoryClick }: AboutUsProps) {
  return (
    <section
      id="quienes-somos"
      className="py-20 lg:py-28 bg-disney-pink-wash overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Side: Photo Frame Container */}
        <div className="lg:col-span-6 relative flex justify-center lg:justify-start">
          <div className="relative w-full max-w-[440px] aspect-[4/5] bg-brand-white rounded-lg p-4 shadow-sm border border-line">
            
            {/* --- BLOQUE REEMPLAZADO PARA MOSTRAR LA FOTO REAL --- */}
            {/* Elegant portrait frame - displaying real photo */}
            <div className="w-full h-full rounded-md overflow-hidden relative border-2 border-dashed border-disney-pink/50 bg-brand-white">
              {/* Actual image - Fills the frame */}
              <img
                src={foundersPhotoSrc}
                alt={foundersPhotoAlt}
                width="400"  
                height="500" 
                loading="lazy" 
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            {/* --- FIN DEL BLOQUE REEMPLAZADO --- */}

            {/* Overlapping Certification Badge - NO CAMBIADO */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-6 right-2 sm:-right-6 bg-brand-white rounded-md p-4 shadow-md border border-line flex items-center space-x-3.5 max-w-[270px]"
            >
              <div className="p-3 bg-disney-pink-light rounded-full text-disney-pink shrink-0">
                <Award className="w-6 h-6 stroke-[1.5]" />
              </div>
              <div>
                <h4 className="font-sans text-xs font-bold text-ink uppercase tracking-tight">
                  Agentes
                </h4>
                <h4 className="font-sans text-xs font-bold text-ink uppercase tracking-tight">
                  certificados
                </h4>
                <p className="font-sans text-[10px] text-ink-soft mt-0.5">
                  Disney & Universal
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Side: Text & Brand Content - NO CAMBIADO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-6 flex flex-col justify-center"
        >
          <span className="text-disney-pink font-sans font-extrabold text-[11px] tracking-widest uppercase block mb-4">
            QUIÉNES SOMOS
          </span>

          <h2 className="font-serif text-ink text-3xl sm:text-4xl lg:text-[49px] font-medium leading-[1.08] tracking-[-0.01em] mb-6">
            Somos Agus y Marti, agentes certificados de   Disney & Universal
          </h2>

          <div className="space-y-6 font-sans text-ink-soft text-base font-light leading-relaxed mb-10">
            <p>
              Nuestro amor por Disney nos llevó a convertir nuestra pasión en nuestro trabajo.
              Visitamos los parques, cruceros y destinos una y otra vez para poder brindarte la
              mejor asesoría, con información actualizada y experiencia real.
            </p>
            <p>
              Más que vendedoras, somos tus compañeras de viaje, para que vivas unas vacaciones
              inolvidables junto a quienes más querés.
            </p>
          </div>

          <div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={onHistoryClick}
              className="bg-disney-pink hover:bg-disney-pink-deep text-brand-white font-sans font-semibold px-8 py-4 rounded-full flex items-center space-x-2 text-base shadow-sm transition-colors cursor-pointer"
            >
              <span>Conocé nuestra historia</span>
              <Sparkles className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}