import React from "react";
import { motion } from "motion/react";
import { CreditCard, DollarSign, Layers, ShieldCheck, Sparkle } from "lucide-react";

export default function PaymentMethods() {
  const cards = [
    {
      title: "Cuotas sin estrés",
      description: "Financiá tu viaje en pagos cómodos.",
      icon: CreditCard,
    },
    {
      title: "Seña + saldo",
      description: "Reservá hoy y completá antes de viajar.",
      icon: DollarSign,
    },
    {
      title: "Múltiples métodos",
      description: "Transferencia, tarjeta y dólar billete.",
      icon: Layers,
    },
    {
      title: "Precios transparentes",
      description: "Sin sorpresas: sabés qué pagás y por qué.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="formas-de-pago" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative bg-brand-white overflow-hidden select-none">
      <div className="max-w-7xl mx-auto">
        {/* Main curved pink card block */}
        <div className="relative bg-[#fcf1f4] border border-[#f5e3e7] rounded-[36px] sm:rounded-[48px] p-8 sm:p-12 md:p-14 lg:p-16 overflow-hidden shadow-xs">
          
          {/* Aesthetic 4-point Sparkle Star in the top-right corner */}
          <div className="absolute top-6 right-6 sm:top-10 sm:right-10 text-[#efa9c0]/70 pointer-events-none select-none">
            <motion.div
              animate={{ scale: [1, 1.15, 1], rotate: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <Sparkle className="w-8 h-8 fill-current" />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left Column: Heading and info */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[#efa9c0] font-sans font-extrabold text-[11px] sm:text-[12px] tracking-widest uppercase block">
                FORMAS DE PAGO
              </span>
              
              <h3 className="font-serif text-[30px] sm:text-[40px] text-[#2c2c2c] font-semibold leading-[1.1] tracking-tight">
                Que el presupuesto <span className="text-disney-pink italic font-normal">no sea</span> la preocupación
              </h3>
              
              <p className="font-sans text-ink-soft text-sm sm:text-base font-light leading-relaxed max-w-sm">
                Tu viaje a tu ritmo. Te ofrecemos planes flexibles, pensados especialmente para familias de LATAM.
              </p>
            </div>

            {/* Right Column: 2x2 white cards layout */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {cards.map((card, index) => {
                const CardIcon = card.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="bg-brand-white rounded-[24px] border border-[#f0e2e5]/80 p-5 sm:p-6 flex items-start gap-4 shadow-sm hover:shadow-md transition-all group cursor-default"
                  >
                    {/* Rounded square container for the icon matching screenshot layout */}
                    <div className="w-12 h-12 rounded-[18px] bg-[#fef8f9] border border-[#fbe8eb] text-[#efa9c0] flex items-center justify-center shrink-0 transition-colors group-hover:border-[#efa9c0]/35 shadow-xs">
                      <CardIcon className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    
                    {/* Card detailed text */}
                    <div className="space-y-1 mt-0.5">
                      <h4 className="font-sans font-bold text-[#2d2d2d] text-sm">
                        {card.title}
                      </h4>
                      <p className="font-sans font-light text-xs sm:text-[13px] text-ink-soft leading-normal">
                        {card.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
