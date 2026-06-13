import React from "react";
import { motion } from "motion/react";
import { 
  CreditCard, 
  Layers, 
  ShieldCheck, 
  CheckCircle,
  Sparkle,
  MessageCircle 
} from "lucide-react";

export default function PaymentMethods() {
  const cards = [
    {
      title: "Tu seña congela el precio",
      description: "Reservás hoy y te asegurás la tarifa. Si después sube, vos ya lo tenés cerrado.",
      icon: ShieldCheck,
    },
    {
      title: "Pagás a tu ritmo, sin interés",
      description: "Después de la seña, cada mes ponés lo que puedas. Un mes más, otro menos, y si un mes no podés, no pasa nada.",
      icon: CreditCard,
    },
    {
      title: "Métodos a tu medida",
      description: "Efectivo (USD), débito o crédito. Como te quede más cómodo.",
      icon: Layers,
    },
    {
      title: "Precios transparentes",
      description: "Sabés exactamente qué pagás y por qué. Sin letra chica ni sorpresas.",
      icon: CheckCircle,
    },
  ];

  const columns = [
    {
      category: "DISNEY",
      items: [
        { label: "Seña", value: "USD 200 por grupo familiar." },
        { label: "Saldo", value: "Hasta 30 días antes del viaje." }
      ]
    },
    {
      category: "UNIVERSAL",
      items: [
        { label: "Seña", value: "USD 50 por persona." },
        { label: "Saldo", value: "Hasta 45 días antes del viaje." }
      ]
    },
    {
      category: "ESTADOS UNIDOS",
      items: [
        { label: "Seña", value: "Según el presupuesto de tu viaje." },
        { label: "Saldo", value: "A tu ritmo, hasta antes de viajar." }
      ]
    }
  ];

  return (
    <section id="formas-de-pago" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative bg-brand-white overflow-hidden select-none">
      <div className="max-w-7xl mx-auto">
        {/* Main curved pink card block */}
        <div className="relative bg-[#fdf1f4] border border-[#fbebf0] rounded-[36px] sm:rounded-[48px] p-6 sm:p-10 md:p-12 lg:p-16 overflow-hidden shadow-sm">
          
          {/* Aesthetic 4-point Sparkle Stars in the top-right corner matching the screenshot */}
          <div className="absolute top-6 right-6 sm:top-10 sm:right-10 text-[#efa9c0]/50 pointer-events-none select-none flex gap-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <Sparkle className="w-5 h-5 fill-current" />
            </motion.div>
            <motion.div
              animate={{ scale: [1.2, 1, 1.2], rotate: [15, 0, 15] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
              className="mt-4"
            >
              <Sparkle className="w-7 h-7 fill-current" />
            </motion.div>
          </div>

          {/* Centered Heading Layout */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-4">
            <span className="text-[#efa9c0] font-sans font-extrabold text-[11px] sm:text-[12px] tracking-widest uppercase block">
              FORMAS DE PAGO
            </span>
            
            <h3 className="font-serif text-[28px] sm:text-[40px] text-ink font-semibold leading-[1.12] tracking-tight">
              Que el presupuesto <span className="text-disney-pink italic font-normal">no sea</span> la preocupación
            </h3>
            
            <p className="font-sans text-ink-soft text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
              Tu viaje, a tu ritmo. Planes flexibles y sin interés, pensados especialmente para familias de LATAM.
            </p>
          </div>

          {/* 2x2 White Rounded Cards Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-14">
            {cards.map((card, index) => {
              const CardIcon = card.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.5, ease: "easeOut" }}
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="bg-brand-white rounded-[24px] border border-[#f5e3e7]/40 p-5 sm:p-6 flex items-start gap-4 shadow-xs hover:shadow-sm transition-all group cursor-default"
                >
                  {/* Rounded square container for the icon */}
                  <div className="w-12 h-12 rounded-[18px] bg-[#fdf5f7] border border-[#fbebf0] text-[#efa9c0] flex items-center justify-center shrink-0 transition-colors group-hover:border-[#efa9c0]/30 shadow-xs">
                    <CardIcon className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  
                  {/* Card detailed text */}
                  <div className="space-y-1.5 mt-0.5">
                    <h4 className="font-sans font-bold text-ink text-sm sm:text-[15px]">
                      {card.title}
                    </h4>
                    <p className="font-sans font-light text-xs sm:text-[13px] text-ink-soft leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Special Disney, Universal and USA conditions Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {columns.map((col, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + index * 0.05, duration: 0.5 }}
                className="bg-brand-white rounded-[24px] border border-[#eee2e5]/40 p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  {/* Upper Tag */}
                  <span className="text-disney-pink font-sans font-extrabold text-[11px] tracking-widest uppercase block mb-3.5">
                    {col.category}
                  </span>
                  
                  {/* Divider line matching screenshot */}
                  <div className="border-t border-line/60 w-full mb-4" />
                  
                  {/* Conditions List */}
                  <div className="space-y-4">
                    {col.items.map((it, i) => (
                      <div key={i} className="space-y-1">
                        <span className="text-xs sm:text-[13px] font-sans font-bold text-ink">
                          {it.label}
                        </span>
                        <p className="text-xs sm:text-[13px] font-sans font-light text-ink-soft leading-normal">
                          {it.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Lower caption reminder notes */}
          <p className="text-center font-sans font-light text-ink-soft text-xs sm:text-[13px] leading-relaxed max-w-xl mx-auto mt-6 sm:mt-8">
            El saldo lo abonás en cuotas a tu medida y sin interés, en efectivo (USD), débito o crédito.
          </p>

          {/* Thin border wrapper decorator */}
          <div className="border-t border-[#f0e2e5] mt-10 sm:mt-12" />

          {/* Bottom call to action block with smooth stack on mobile */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-5 text-center">
            {/* <span className="font-serif font-light text-[#2c2c2c] text-lg sm:text-[20px] italic">
              ¿Querés que te armemos un plan de pago a tu medida?
            </span> */}
            <motion.a
  href="https://wa.me/5491136903650?text=Hola!%20Quiero%20consultar%20por%20un%20plan%20de%20pagos%20a%20mi%20medida%20para%20mi%20viaje%20m%C3%A1gico."
  target="_blank"
  rel="noopener noreferrer"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.98 }}
  className="bg-[#efa9c0] hover:bg-[#e08aa8] text-brand-white font-sans text-xs sm:text-xs font-bold uppercase tracking-widest px-7 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none shrink-0"
>
              <MessageCircle className="w-4 h-4 fill-current stroke-[1]" />
              <span>Consultá por WhatsApp</span>
            </motion.a>
          </div>

        </div>
      </div>
    </section>
  );
}
