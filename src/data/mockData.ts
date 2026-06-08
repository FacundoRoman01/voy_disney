import { Service, Testimonial, Feature } from "../types";

export const SERVICES_DATA: Service[] = [
  {
    id: "disney-universal-california",
    title: "DISNEYLAND CALIFORNIA & UNIVERSAL",
    subtitle: "Los destinos emblemáticos de la Costa Oeste",
    description: "Descubrí la magia original de Disneyland y la emoción de Universal Studios Hollywood. Una experiencia en California adaptada a tus gustos y presupuesto.",
    badge: "CALIFORNIA & LOS ÁNGELES",
    icon: "Star",
    detailedDescription: "Descubrí dos de los destinos más emblemáticos de California en un mismo viaje. El resort cuenta con Disneyland Park (hogar del icónico Castillo) y Disney California Adventure. Además, combinamos esto con Universal Studios Hollywood, que ofrece un parque temático y un estudio de cine real en funcionamiento. Todo a tarifas oficiales, sin cargos ocultos, y con la facilidad de combinarlo con Los Ángeles, Beverly Hills o Santa Mónica.",
    images: [
      { url: "assets/img/Disney_&_Universal_Orlando/IMG_5863.webp" },
      { url: "assets/img/Disney_&_Universal_Orlando/IMG_5882.webp" },
      { url: "assets/img/Disney_&_Universal_Orlando/IMG_5946.webp" },
      { url: "assets/img/Disney_&_Universal_Orlando/IMG_5984.webp" }
    ],
    includes: [
      "Hoteles dentro y fuera de Disneyland Resort",
      "Entradas para Disneyland y Disney California Adventure",
      "Entradas para Universal Studios Hollywood",
      "Lightning Lane Multi Pass y Disney PhotoPass",
      "Reservas en restaurantes y experiencias especiales",
      "Traslados desde y hacia el aeropuerto",
      "Alquiler de vehículos",
      "Asistencia médica internacional"
    ]
  },
  {
    id: "disneyland-california",
    title: "DISNEYLAND CALIFORNIA",
    subtitle: "Viví los inicios de la magia",
    description: "Viví la magia en la costa oeste. Te guiamos por el parque original de Walt Disney en Anaheim.",
    badge: "DISNEYLAND CALIFORNIA",
    icon: "Compass",
    detailedDescription: "Descubrí el encanto del primer parque diseñado por Walt Disney. Te asistimos en la planificación de tu estancia en California, combinando los dos parques emblemáticos (Disneyland Park y Disney California Adventure) con itinerarios mágicos, guías de transporte y recomendaciones en la vibrante zona de Anaheim.",
    images: [
      { url: "assets/img/California_y_Los_angeles/IMG_2545.webp" },
      { url: "assets/img/California_y_Los_angeles/IMG_2544.webp" },
      { url: "assets/img/California_y_Los_angeles/IMG_2543.webp" },
      { url: "assets/img/California_y_Los_angeles/IMG_2542.webp" },
      { url: "assets/img/California_y_Los_angeles/IMG_2541.webp" },
      { url: "assets/img/California_y_Los_angeles/IMG_2540.webp" },
      { url: "assets/img/California_y_Los_angeles/IMG_2539.webp" },
      { url: "assets/img/California_y_Los_angeles/IMG_2538.webp" },
      { url: "assets/img/California_y_Los_angeles/IMG_2536.webp" },
      { url: "assets/img/California_y_Los_angeles/IMG_2535.webp" }
    ],
    includes: [
      "Armado de Itinerario para 2 Parques",
      "Asesoramiento sobre hoteles aledaños caminando",
      "Gestión de reservas de parque y pases mágicos",
      "Recomendaciones exclusivas para Marvel Avengers Campus",
      "Tips de optimización horaria"
    ]
  },
  {
    id: "disneyland-paris",
    title: "DISNEYLAND PARIS",
    subtitle: "La magia Disney en el corazón de Europa",
    description: "A solo unos minutos del centro, combiná la magia de Disney con la elegancia y el encanto característicos de Europa.",
    badge: "EUROPA",
    icon: "Milestone",
    detailedDescription: "Considerado por muchos fanáticos como uno de los parques más hermosos del mundo, Disneyland Paris ofrece una experiencia única. El resort cuenta con Disneyland Park, hogar del espectacular Castillo de la Bella Durmiente, y Walt Disney Studios Park, para sumergirte en el cine de Pixar, Marvel y Disney. Disfrutá de espectáculos de primer nivel, gastronomía con influencia francesa y un fácil acceso desde la ciudad, siempre a valores oficiales y sin cargos adicionales.",
    images: [
      { url: "assets/img/Disneyland_Paris/IMG_2552.webp" },
      { url: "assets/img/Disneyland_Paris/IMG_2553.webp" },
      { url: "assets/img/Disneyland_Paris/IMG_2554.webp" },
      { url: "assets/img/Disneyland_Paris/IMG_2555.webp" },
      { url: "assets/img/Disneyland_Paris/IMG_2556.webp" },
      { url: "assets/img/Disneyland_Paris/IMG_2557.webp" }
    ],
    includes: [
      "Hoteles Disney y hoteles asociados",
      "Entradas para Disneyland y Walt Disney Studios",
      "Planificación personalizada de tu itinerario",
      "Reservas en restaurantes temáticos",
      "Traslados desde/hacia aeropuertos o centro de París",
      "Alquiler de vehículos para recorrer Francia",
      "Asistencia médica internacional"
    ]
  },
  {
    id: "cruceros-disney",
    title: "DISNEY CRUISE LINE",
    subtitle: "La magia de Disney, ahora en altamar",
    description: "Disney Cruise Line combina el servicio excepcional de Disney con destinos increíbles alrededor del mundo, ofreciendo una experiencia única en alta mar.",
    badge: "CRUCEROS DISNEY",
    icon: "Ship",
    detailedDescription: "A bordo encontrarás entretenimiento de primer nivel, espectáculos al estilo Broadway, encuentros con personajes, gastronomía incluida, actividades para todas las edades y el nivel de atención que caracteriza a Disney. Cada itinerario ofrece una experiencia diferente, desde playas paradisíacas en el Caribe y Bahamas hasta aventuras por Alaska, Europa, el Mediterráneo o Asia. Te ayudamos a elegir el barco (Magic, Wonder, Dream, Fantasy, Wish, Treasure, Destiny o Adventure) y el itinerario ideal para tu familia, siempre a tarifas oficiales y sin costos adicionales.",
    images: [
      { url: "assets/img/Crucero/IMG_2558.webp" },
      { url: "assets/img/Crucero/IMG_2559.webp" },
      { url: "assets/img/Crucero/IMG_2560.webp" },
      { url: "assets/img/Crucero/IMG_2561.webp" },
      { url: "assets/img/Crucero/IMG_2562.webp" }
    ],
    includes: [
      "Alojamiento a bordo y comidas (restaurantes y buffet)",
      "Snacks y bebidas seleccionadas",
      "Espectáculos exclusivos al estilo Broadway",
      "Encuentros con personajes Disney",
      "Piscinas, clubes infantiles/juveniles y fiestas temáticas",
      "Acceso a destinos exclusivos de Disney",
      "Asesoramiento en elección de camarote, itinerario y traslados"
    ]
  },
  {
    id: "parques-alternativos-orlando",
    title: "EXPERIENCIAS ADICIONALES",
    subtitle: "Más allá de Disney y Universal",
    description: "Orlando ofrece mucho más. Si tenés días extra, complementá tu viaje con LEGOLAND®, Crayola Experience o el Kennedy Space Center.",
    badge: "MÁS ALLÁ DE DISNEY",
    icon: "Star",
    detailedDescription: "Te ayudamos a incorporar experiencias adicionales que se adapten a tu familia. Podés sumar LEGOLAND® Florida Resort, ideal para niños de 2 a 12 años con atracciones interactivas de piezas LEGO. Para los más creativos, Crayola Experience en The Florida Mall es excelente para combinar con un día de compras. Y si buscás una excursión fascinante y educativa, el Kennedy Space Center en Cabo Cañaveral te permite ver cohetes reales y simuladores de la NASA.",
    images: [
      { url: "assets/img/Parques_extras/IMG_2547.webp" },
      { url: "assets/img/Parques_extras/IMG_2548.webp" },
      { url: "assets/img/Parques_extras/IMG_2549.webp" },
      { url: "assets/img/Parques_extras/IMG_2550.webp" },
      { url: "assets/img/Parques_extras/IMG_2551.webp" }
    ],
    includes: [
      "Venta y coordinación de tickets para atracciones alternativas",
      "Planificación y sugerencias de traslados a Cabo Cañaveral y Winter Haven",
      "Integración estratégica en tu itinerario de parques principales",
      "Asesoramiento para días de descanso y compras"
    ]
  }
];

export const FEATURES_DATA: Feature[] = [
  {
    id: "certificacion",
    title: "Agentes Certificados",
    description: "Contamos con la certificación oficial de Disney y Universal para diseñar viajes mágicos de primer nivel.",
    icon: "Award"
  },
  {
    id: "personalizacion",
    title: "Viajes 100% a Medida",
    description: "No creemos en paquetes rígidos. Estudiamos tus gustos, edades de los viajeros y presupuesto exacto.",
    icon: "Notebook"
  },
  {
    id: "soporte",
    title: "Acompañamiento Activo",
    description: "Estamos contigo resolviendo dudas desde el primer '¿y si vamos?' hasta que regresas a casa.",
    icon: "HeartHandshake"
  },
  {
    id: "experiencia",
    title: "Experiencia Real",
    description: "Hemos recorrido cada parque, probado cada atracción y comida para darte recomendaciones de primera mano.",
    icon: "MapPin"
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "1",
    name: "Familia Rodríguez",
    role: "Viajó con 2 niños (6 y 9 años)",
    text: "Agus y Marti hicieron que el viaje fuera perfecto. El itinerario día por día nos ahorró horas de filas y pudimos ver todo lo que los chicos soñaban sin cansarnos. ¡Súper recomendadas!",
    rating: 5,
    tripType: "Disney & Universal Orlando"
  },
  {
    id: "2",
    name: "Clara & Sebastián",
    role: "Viaje de Novios / Adultos",
    text: "Increíble asesoría para viajar en pareja. Nos reservaron cenas románticas y nos dieron los mejores tips para aprovechar Star Wars: Galaxy's Edge. La organización fue impecable.",
    rating: 5,
    tripType: "Disneyland California"
  },
  {
    id: "3",
    name: "Estela M.",
    role: "Viajó en grupo familiar de 8 personas",
    text: "Coordinar un viaje para 8 personas de distintas edades parecía imposible hasta que contactamos a Voy Disney. Hicieron reservas alineadas y tuvimos unas vacaciones inolvidables.",
    rating: 5,
    tripType: "Cruceros Disney & Orlando"
  }
];