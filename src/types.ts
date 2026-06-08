/**
 * Types for the Voy Disney Application
 */

export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  icon: string; // lucide icon name
  detailedDescription?: string;
  includes?: string[];
 images?: { url: string }[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  avatarUrl?: string;
  tripType: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string; // lucide icon name
}

export interface QuoteRequest {
  name: string;
  email: string;
  phone: string;
  destination: string;
  travelersCount: number;
  estimatedDate: string;
  notes: string;
}

export interface FormularioDisney {
  email: string;           // Correo electrónico
  nombreApellido: string;  // Nombre y Apellido
  whatsapp: string;        // Numero de WhatsApp
  pasajes: string;         // ¿Ya tienen pasajes?
  visa: string;            // ¿Tienen VISA vigente?
  fechaViaje: string;      // ¿Fecha del viaje o mes de preferencia?
  diasViaje: string;       // En caso de no tener fecha definida. ¿Cuantos días les gustaría ir?
  personasYEdades: string; // ¿Cuántas personas viajan? Detallar edades...
  reservaPara: string;     // ¿La reserva seria para? 
  parques: string;         // ¿Qué parques te interesa visitar?
  hospedaje: string;       // ¿Qué hospedaje preferís?
  tipoViaje: string;       // ¿Qué tipo de viaje buscas?
  detalles: string;   
  website?: string;     // Déjanos cualquier detalle...
 
}

