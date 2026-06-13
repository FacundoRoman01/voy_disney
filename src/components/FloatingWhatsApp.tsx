// import React from "react";
// import { motion } from "motion/react";

// export default function FloatingWhatsApp() {
//   // Configura aquí tu número (con código de país, sin el +, por ejemplo 54911... para Argentina)
//   const phoneNumber = "5491123456789"; 
//   const defaultMessage = "¡Hola! Me gustaría recibir información para planificar mi viaje.";
//   const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0, y: 50 }}
//       animate={{ opacity: 1, scale: 1, y: 0 }}
//       transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
//       className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] flex items-center gap-4 group"
//     >
//       {/* Tooltip opcional (Solo visible en Desktop al hacer hover) */}
//       <div className="hidden md:block opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 absolute right-full mr-4 pointer-events-none">
//         <div className="bg-white text-ink text-sm font-sans font-medium py-2 px-4 rounded-full shadow-lg border border-gray-100 whitespace-nowrap">
//           ¿En qué podemos ayudarte?
//         </div>
//       </div>

//       {/* Botón Principal con el diseño de la imagen */}
//       <a
//         href={whatsappUrl}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="relative flex items-center justify-center transition-transform duration-300 hover:-translate-y-1"
//         aria-label="Contactar por WhatsApp"
//       >
//         {/* Contenedor exterior suave (Squircle sin bordes negros) */}
//         <div className="p-3 md:p-4 bg-disney-pink/10 backdrop-blur-sm rounded-[2rem] shadow-sm">
          
//           {/* Círculo Principal Rosa */}
//           <div className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-disney-pink text-white rounded-full">
            
//             {/* Ícono de WhatsApp nativo SVG */}
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="28"
//               height="28"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2.2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               className="w-7 h-7 md:w-8 md:h-8"
//             >
//               <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
//               <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
//               <path d="M16.5 13.5c-.5-.5-1.4-.5-1.9 0l-.6.6c-.2.2-.5.2-.8 0-1.2-1.2-2.1-2.6-2.5-4.1-.1-.3 0-.6.2-.8l.6-.6c.5-.5.5-1.4 0-1.9l-1.3-1.3c-.5-.5-1.4-.5-1.9 0l-.6.6c-.6.6-.9 1.4-.7 2.3.4 2.4 1.7 4.5 3.5 6.3 1.8 1.8 3.9 3.1 6.3 3.5.9.2 1.7-.1 2.3-.7l.6-.6c.5-.5.5-1.4 0-1.9l-1.3-1.3Z" />
//             </svg>

//             {/* Burbuja pequeña con el símbolo '+' */}
//             <div className="absolute -bottom-1 -right-1 flex items-center justify-center w-6 h-6 bg-disney-pink text-white rounded-full shadow-sm">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="16"
//                 height="16"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="3.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="w-4 h-4"
//               >
//                 <line x1="12" y1="5" x2="12" y2="19"></line>
//                 <line x1="5" y1="12" x2="19" y2="12"></line>
//               </svg>
//             </div>

//           </div>
//         </div>
//       </a>
//     </motion.div>
//   );
// }