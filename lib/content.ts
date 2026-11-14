export type Lang = "en" | "es";

export const SECTION_IDS = ["home", "about", "skills", "projects", "experience", "contact"] as const;
export type SectionId = (typeof SECTION_IDS)[number];

export const LINKS = {
  email: "goyasleonardo@gmail.com",
  github: "https://github.com/Elyeet9",
  linkedin: "https://www.linkedin.com/in/leonardo-goyas-ayllon-0540671b5",
  x: "https://x.com/elyeettweets",
  discord: "elyeet",
} as const;

/* ---------- Skills (names and levels are language independent) ---------- */

export type SkillCategoryId = "languages" | "frontend" | "backend" | "ai" | "tools";

/** Level 5 = expert, 4 = advanced, 3 = intermediate. */
export const SKILLS: { id: SkillCategoryId; items: [name: string, level: number][] }[] = [
  {
    id: "languages",
    items: [["Python", 5], ["JavaScript", 4], ["TypeScript", 4], ["C#", 3], ["C++", 3], ["Go", 3], ["Java", 3]],
  },
  {
    id: "frontend",
    items: [["React", 4], ["Next.js", 4], ["Django Templates", 4], ["TailwindCSS", 4], ["Angular", 3], ["PyQt6", 3]],
  },
  {
    id: "backend",
    items: [
      ["Django", 4],
      ["Node.js", 4],
      ["Discord.js", 4],
      ["Pycord", 4],
      ["FastAPI", 3],
      ["Spring", 3],
      ["MySQL", 3],
      ["Oracle", 3],
      ["PostgreSQL", 3],
    ],
  },
  {
    id: "ai",
    items: [["OpenAI API", 4], ["PyTorch", 3], ["TensorFlow", 3], ["YOLO", 3], ["scikit-learn", 3]],
  },
  {
    id: "tools",
    items: [
      ["Git", 4],
      ["GitHub", 4],
      ["Linux", 4],
      ["Windows", 4],
      ["AWS", 3],
      ["Azure", 3],
      ["Bitbucket", 3],
      ["Docker", 3],
      ["Unity", 3],
      ["Godot", 3],
      ["Jira", 3],
    ],
  },
];

/* ---------- Projects (language independent data) ---------- */

export type ProjectId =
  | "oncovision"
  | "pecchan"
  | "wordWebnovel"
  | "sunatScraper"
  | "dungeonsDownbeats"
  | "fastWhisper"
  | "dndUtils"
  | "insomniaGacha";

export type ProjectStatus = "finished" | "inProgress" | "closed";
export type RepoKind = "source" | "frontend" | "backend";

export type ProjectMedia =
  /** 16:9 screenshot or GIF that fills the preview. */
  | { type: "image"; src: string; animated?: boolean }
  /** Square project icon shown over the hatch, optionally with a YouTube demo. */
  | { type: "icon"; src: string; youtubeId?: string };

export interface ProjectMeta {
  id: ProjectId;
  /** Featured projects have no year: they show the "featured" label instead. */
  year?: string;
  status: ProjectStatus;
  media: ProjectMedia;
  repos: { kind: RepoKind; url: string }[];
}

export const PROJECTS: ProjectMeta[] = [
  {
    id: "oncovision",
    status: "finished",
    media: { type: "icon", src: "/projects/oncovision-logo.jpg", youtubeId: "TY9JEe3RABo" },
    repos: [
      { kind: "frontend", url: "https://github.com/Elyeet9/oncovision-frontend" },
      { kind: "backend", url: "https://github.com/Elyeet9/oncovision-backend" },
    ],
  },
  {
    id: "pecchan",
    status: "inProgress",
    media: { type: "icon", src: "/projects/pecchan.png" },
    repos: [],
  },
  {
    id: "wordWebnovel",
    year: "2026",
    status: "finished",
    media: { type: "image", src: "/projects/word-to-webnovel.gif", animated: true },
    repos: [{ kind: "source", url: "https://github.com/Elyeet9/word-to-webnovel" }],
  },
  {
    id: "sunatScraper",
    year: "2026",
    status: "finished",
    media: { type: "image", src: "/projects/sunat-scraper.png" },
    repos: [],
  },
  {
    id: "dungeonsDownbeats",
    year: "2025",
    status: "finished",
    media: { type: "image", src: "/projects/dndownbeats.gif", animated: true },
    repos: [
      { kind: "frontend", url: "https://github.com/Elyeet9/dndownbeats-frontend" },
      { kind: "backend", url: "https://github.com/Elyeet9/dndownbeats-backend" },
    ],
  },
  {
    id: "fastWhisper",
    year: "2025",
    status: "finished",
    media: { type: "image", src: "/projects/fast-whisper.png" },
    repos: [{ kind: "source", url: "https://github.com/Elyeet9/fast-whisper" }],
  },
  {
    id: "dndUtils",
    year: "2025",
    status: "inProgress",
    media: { type: "image", src: "/projects/dnd-utils.gif", animated: true },
    repos: [{ kind: "source", url: "https://github.com/Elyeet9/dnd-utils" }],
  },
  {
    id: "insomniaGacha",
    year: "2022",
    status: "closed",
    media: { type: "image", src: "/projects/insomnia-gacha.gif", animated: true },
    repos: [{ kind: "source", url: "https://github.com/Elyeet9/insomnia-gacha" }],
  },
];

/* ---------- Copy ---------- */

export interface RoleCopy {
  name: string;
  desc: string;
  tags: string[];
}

export interface ProjectCopy {
  title: string;
  kind: string;
  desc: string;
  features?: string[];
  tags: string[];
}

export interface ExperienceCopy {
  date: string;
  title: string;
  place: string;
  text: string;
}

export interface Copy {
  sections: Record<SectionId, string>;
  name: string;
  portfolio: string;
  navAria: string;
  langAria: string;
  menu: string;
  menuAria: string;
  loading: string;
  footer: string;

  homeHello: string;
  homePitch: string;
  btnProjects: string;
  btnContact: string;
  status: string;
  homeSelect: string;
  classSelect: string;
  classData: string;
  roles: RoleCopy[];

  unitData: string;
  unit: [key: string, value: string][];
  logEntry: string;
  aboutP1: string;
  aboutP2: string;

  categories: string;
  cats: Record<SkillCategoryId, string>;
  levelsNote: string;
  levelAria: string;

  archive: string;
  featured: string;
  keyFeatures: string;
  statusLabel: string;
  statuses: Record<ProjectStatus, string>;
  repoLabels: Record<RepoKind, string>;
  noRepo: string;
  playDemo: string;
  demoSoon: string;
  demoTitle: string;
  previewAlt: string;
  projects: Record<ProjectId, ProjectCopy>;

  experience: ExperienceCopy[];

  channels: string;
  chEmail: string;
  copy: string;
  copied: string;
  transmission: string;
  contactIntro: string;
  fName: string;
  fEmail: string;
  fMsg: string;
  send: string;
  mailSubject: string;
  sentNote: string;
}

export const DICT: Record<Lang, Copy> = {
  en: {
    sections: { home: "Home", about: "About", skills: "Skills", projects: "Projects", experience: "Experience", contact: "Contact" },
    name: "Leonardo Goyas",
    portfolio: "Portfolio // v3.0",
    navAria: "Sections",
    langAria: "Switch language to Spanish",
    menu: "Menu",
    menuAria: "Toggle navigation menu",
    loading: "Loading",
    footer: "© 2026 Leonardo Goyas // All systems nominal",

    homeHello: "// Hello, world. I am",
    homePitch: "A software developer passionate about creating interesting, innovative and fun applications.",
    btnProjects: "View projects",
    btnContact: "Contact",
    status: "Currently: BI Analyst at Entel Perú",
    homeSelect: "Select a class to begin",
    classSelect: "Class select",
    classData: "Class data",
    roles: [
      {
        name: "Software Developer",
        desc: "Builds applications that are interesting, innovative and fun, from desktop tools like the SUNAT Bill Scraper to local APIs like Fast Whisper.",
        tags: ["Python", "TypeScript", "PyQt6", "FastAPI"],
      },
      {
        name: "Web Developer",
        desc: "Ships complete web applications with Django on the backend and Next.js on the frontend, like OncoVision and Dungeons & Downbeats.",
        tags: ["React", "Next.js", "Django", "TailwindCSS"],
      },
      {
        name: "BI Analyst",
        desc: "At Entel Perú: oversees critical reporting infrastructure, drives automation initiatives and leads system migration projects.",
        tags: ["Reporting", "Automation", "System migration"],
      },
      {
        name: "AI Engineer",
        desc: "Integrates AI into real products: a virtual friend that talks back in real time, lung nodule detection in CT scans and self-hosted speech-to-text.",
        tags: ["OpenAI API", "YOLO", "Whisper", "PyTorch"],
      },
      {
        name: "Bot Developer",
        desc: "Builds Discord bots for D&D campaigns: gacha minigames, dice rolling and character creation.",
        tags: ["Discord.js", "Pycord", "Node.js"],
      },
    ],

    unitData: "Unit data",
    unit: [
      ["Name", "Leonardo Goyas Ayllón"],
      ["Class", "Software Developer // BI Analyst"],
      ["Location", "Peru"],
      ["Experience", "Since 2024"],
      ["Languages", "Spanish, English"],
      ["Status", "BI Analyst @ Entel Perú"],
    ],
    logEntry: "// Log entry 001",
    aboutP1:
      "Hi there! I'm Leonardo Goyas, a software developer with a passion for creating innovative digital experiences. I combine technical skills with creative problem-solving to build applications that are both functional and engaging.",
    aboutP2:
      "My journey in this tech world has led me from building internal enterprise tools to exploring cutting-edge AI applications. I'm particularly interested in AI integration, real-time systems, and creating interactive experiences that feel natural and intuitive.",

    categories: "Categories",
    cats: { languages: "Languages", frontend: "Frontend", backend: "Backend", ai: "AI & Machine Learning", tools: "Tools & Others" },
    levelsNote: "LV.5 Expert // LV.4 Advanced // LV.3 Intermediate",
    levelAria: "Level {n} of 5",

    archive: "Archive",
    featured: "Featured",
    keyFeatures: "Key features",
    statusLabel: "Status:",
    statuses: { finished: "Finished", inProgress: "In progress", closed: "Closed" },
    repoLabels: { source: "Source code", frontend: "Frontend code", backend: "Backend code" },
    noRepo: "No repository available",
    playDemo: "Play demo",
    demoSoon: "Demo video coming soon",
    demoTitle: "{title} demo video",
    previewAlt: "{title} preview",
    projects: {
      oncovision: {
        title: "OncoVision",
        kind: "Lung nodule detection",
        desc: "My thesis project - a comprehensive web application integrated with a trained YOLO model for automated lung nodule detection in CT scans. This system combines advanced computer vision with clinical tools to assist healthcare professionals in early cancer detection.",
        features: [
          "CT scan input and processing with YOLO-based nodule detection",
          "Patient history management and clinical case tracking",
          "Advanced image visualization with automated nodule highlighting",
        ],
        tags: ["Python", "CuPy", "Django", "Next.js", "YOLO", "Roboflow"],
      },
      pecchan: {
        title: "Pecchan",
        kind: "AI companion",
        desc: "My most ambitious project - an AI virtual friend that listens and responds in real time. Pecchan can join Discord voice channels, understand context, and participate in conversations as if she were another person in the room.",
        features: [
          "Real-time voice conversations with natural responses",
          "Discord integration for group interactions",
          "Memory system that recalls past conversations",
        ],
        tags: ["Python", "OpenAI API", "Speech Recognition", "Discord Integration"],
      },
      wordWebnovel: {
        title: "Word to Webnovel",
        kind: "Desktop app",
        desc: "Transform your Word documents (.docx) into beautiful webnovel-style web pages, with organized chapters, side navigation, full image support and interactive comments.",
        tags: ["Python", "PyQt6"],
      },
      sunatScraper: {
        title: "SUNAT Bill Scraper",
        kind: "Desktop app",
        desc: "A desktop application for Apolo Macs S.A.C. that downloads all purchase invoices registered in SUNAT (Peru's tax system) for a specific period and exports them to Excel, streamlining financial record management.",
        tags: ["Python", "PyQt6"],
      },
      dungeonsDownbeats: {
        title: "Dungeons & Downbeats",
        kind: "Web app",
        desc: "A local web application where you can create your own collection of soundtracks for your D&D campaigns or build super organized playlists. Perfect for dungeon masters who want to set the perfect atmosphere for their adventures.",
        tags: ["Python", "Django", "Node.js", "Next.js"],
      },
      fastWhisper: {
        title: "Fast Whisper API",
        kind: "Local API",
        desc: "A local API built with FastAPI to host your own instance of OpenAI Whisper for speech-to-text transcription, providing control and privacy for voice recognition tasks.",
        tags: ["Python", "FastAPI", "OpenAI Whisper"],
      },
      dndUtils: {
        title: "D&D Utils Bot",
        kind: "Discord bot",
        desc: "A utility Discord bot for D&D players that assists with character creation and dice rolling. An ongoing project aimed at streamlining the D&D experience.",
        tags: ["Discord.js", "Node.js", "API Integration"],
      },
      insomniaGacha: {
        title: "Insomnia Gacha Bot",
        kind: "Discord bot",
        desc: 'A Discord bot that implements a "gacha" minigame system for a D&D campaign. Players can collect objects and other benefits while engaging with the storyline.',
        tags: ["Discord.js", "Node.js"],
      },
    },

    experience: [
      {
        date: "2026 — PRESENT",
        title: "Business Intelligence Analyst",
        place: "Entel Perú // Telecommunications",
        text: "Embarking on a new chapter in my career, I'm taking on a role focused on overseeing critical reporting infrastructure, driving automation initiatives, and leading strategic system migration projects to enhance operational efficiency and deliver data-driven insights.",
      },
      {
        date: "2024 — 2025",
        title: "Pre Professional Business Intelligence Intern",
        place: "Entel Perú // Telecommunications",
        text: "I developed and maintained an internal investment management application for one of the largest telecommunications companies in my country. This system handles critical financial operations and has improved the efficiency of investment tracking and reporting processes. I led the agile development team, coordinating testing and deployment processes to ensure seamless delivery of high-quality solutions.",
      },
    ],

    channels: "Channels",
    chEmail: "Email",
    copy: "Copy",
    copied: "Copied",
    transmission: "Transmission",
    contactIntro:
      "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out!",
    fName: "Name",
    fEmail: "Email",
    fMsg: "Message",
    send: "Send transmission",
    mailSubject: "Portfolio contact",
    sentNote: "Your email app should open with the message ready to send",
  },

  es: {
    sections: { home: "Inicio", about: "Sobre mí", skills: "Habilidades", projects: "Proyectos", experience: "Experiencia", contact: "Contacto" },
    name: "Leonardo Goyas",
    portfolio: "Portafolio // v3.0",
    navAria: "Secciones",
    langAria: "Cambiar idioma a inglés",
    menu: "Menú",
    menuAria: "Abrir o cerrar el menú de navegación",
    loading: "Cargando",
    footer: "© 2026 Leonardo Goyas // Todos los sistemas operativos",

    homeHello: "// Hola, mundo. Soy",
    homePitch: "Un desarrollador de software apasionado por crear aplicaciones interesantes, innovadoras y divertidas.",
    btnProjects: "Ver proyectos",
    btnContact: "Contacto",
    status: "Actualmente: Analista de BI en Entel Perú",
    homeSelect: "Selecciona una clase para comenzar",
    classSelect: "Selección de clase",
    classData: "Datos de la clase",
    roles: [
      {
        name: "Desarrollador de Software",
        desc: "Crea aplicaciones interesantes, innovadoras y divertidas, desde herramientas de escritorio como SUNAT Factura Scraper hasta APIs locales como Fast Whisper.",
        tags: ["Python", "TypeScript", "PyQt6", "FastAPI"],
      },
      {
        name: "Desarrollador Web",
        desc: "Desarrolla aplicaciones web completas con Django en el backend y Next.js en el frontend, como OncoVision y Dungeons & Downbeats.",
        tags: ["React", "Next.js", "Django", "TailwindCSS"],
      },
      {
        name: "Analista de BI",
        desc: "En Entel Perú: supervisa la infraestructura crítica de reportes, impulsa iniciativas de automatización y lidera proyectos de migración de sistemas.",
        tags: ["Reportes", "Automatización", "Migración de sistemas"],
      },
      {
        name: "Ingeniero de IA",
        desc: "Integra IA en productos reales: una amiga virtual que conversa en tiempo real, detección de nódulos pulmonares en tomografías y transcripción de voz a texto con una instancia propia de Whisper.",
        tags: ["OpenAI API", "YOLO", "Whisper", "PyTorch"],
      },
      {
        name: "Desarrollador de Bots",
        desc: "Crea bots de Discord para campañas de D&D: minijuegos gacha, tiradas de dados y creación de personajes.",
        tags: ["Discord.js", "Pycord", "Node.js"],
      },
    ],

    unitData: "Datos de la unidad",
    unit: [
      ["Nombre", "Leonardo Goyas Ayllón"],
      ["Clase", "Desarrollador de Software // Analista de BI"],
      ["Ubicación", "Perú"],
      ["Experiencia", "Desde 2024"],
      ["Idiomas", "Español, inglés"],
      ["Estado", "Analista de BI @ Entel Perú"],
    ],
    logEntry: "// Registro 001",
    aboutP1:
      "¡Hola! Soy Leonardo Goyas, un desarrollador de software con pasión por crear experiencias digitales innovadoras. Combino habilidades técnicas con resolución creativa de problemas para construir aplicaciones que son tanto funcionales como atractivas.",
    aboutP2:
      "Mi viaje en el mundo tecnológico me ha llevado desde la construcción de herramientas empresariales internas hasta la exploración de aplicaciones de IA de vanguardia. Estoy particularmente interesado en la integración de IA, sistemas en tiempo real y la creación de experiencias interactivas que se sienten naturales e intuitivas.",

    categories: "Categorías",
    cats: { languages: "Lenguajes", frontend: "Frontend", backend: "Backend", ai: "IA y Machine Learning", tools: "Herramientas y Otros" },
    levelsNote: "LV.5 Experto // LV.4 Avanzado // LV.3 Intermedio",
    levelAria: "Nivel {n} de 5",

    archive: "Archivo",
    featured: "Destacado",
    keyFeatures: "Características principales",
    statusLabel: "Estado:",
    statuses: { finished: "Finalizado", inProgress: "En progreso", closed: "Cerrado" },
    repoLabels: { source: "Código fuente", frontend: "Código frontend", backend: "Código backend" },
    noRepo: "No hay repositorio disponible",
    playDemo: "Ver demo",
    demoSoon: "Video de demostración próximamente",
    demoTitle: "Video de demostración de {title}",
    previewAlt: "Vista previa de {title}",
    projects: {
      oncovision: {
        title: "OncoVision",
        kind: "Detección de nódulos pulmonares",
        desc: "Mi proyecto de tesis - una aplicación web integral integrada con un modelo YOLO entrenado para la detección automatizada de nódulos pulmonares en tomografías computarizadas. Este sistema combina visión por computadora avanzada con herramientas clínicas para asistir a profesionales de la salud en la detección temprana de cáncer.",
        features: [
          "Entrada y procesamiento de tomografías con detección de nódulos basada en YOLO",
          "Gestión de historial de pacientes y seguimiento de casos clínicos",
          "Visualización avanzada de imágenes con resaltado automático de nódulos",
        ],
        tags: ["Python", "CuPy", "Django", "Next.js", "YOLO", "Roboflow"],
      },
      pecchan: {
        title: "Pecchan",
        kind: "Compañera IA",
        desc: "Mi proyecto más ambicioso - una amiga virtual IA que escucha y responde en tiempo real. Pecchan puede unirse a canales de voz de Discord, entender el contexto y participar en conversaciones como si fuera otra persona en la sala.",
        features: [
          "Conversaciones de voz en tiempo real con respuestas naturales",
          "Integración con Discord para interacciones grupales",
          "Sistema de memoria que recuerda conversaciones pasadas",
        ],
        tags: ["Python", "OpenAI API", "Reconocimiento de Voz", "Integración Discord"],
      },
      wordWebnovel: {
        title: "Word to Webnovel",
        kind: "App de escritorio",
        desc: "Convierte tus documentos de Word (.docx) en hermosas páginas web estilo webnovel, con capítulos organizados, navegación lateral, soporte completo para imágenes y comentarios interactivos.",
        tags: ["Python", "PyQt6"],
      },
      sunatScraper: {
        title: "SUNAT Factura Scraper",
        kind: "App de escritorio",
        desc: "Una aplicación de escritorio para Apolo Macs S.A.C. que permite descargar todas las facturas de compra registradas en SUNAT en un periodo determinado y exportarlas a Excel, optimizando la gestión de registros financieros.",
        tags: ["Python", "PyQt6"],
      },
      dungeonsDownbeats: {
        title: "Dungeons & Downbeats",
        kind: "App web",
        desc: "Una aplicación web local donde puedes crear tu propia colección de bandas sonoras para tus campañas de D&D o construir listas de reproducción súper organizadas. Perfecta para maestros de mazmorras que quieren establecer la atmósfera perfecta para sus aventuras.",
        tags: ["Python", "Django", "Node.js", "Next.js"],
      },
      fastWhisper: {
        title: "Fast Whisper API",
        kind: "API local",
        desc: "Una API local construida con FastAPI para alojar tu propia instancia de OpenAI Whisper para transcripción de voz a texto, proporcionando control y privacidad para tareas de reconocimiento de voz.",
        tags: ["Python", "FastAPI", "OpenAI Whisper"],
      },
      dndUtils: {
        title: "D&D Utils Bot",
        kind: "Bot de Discord",
        desc: "Un bot de Discord de utilidades para jugadores de D&D que asiste con la creación de personajes y tiradas de dados. Un proyecto en curso orientado a simplificar la experiencia de D&D.",
        tags: ["Discord.js", "Node.js", "Integración de API"],
      },
      insomniaGacha: {
        title: "Insomnia Gacha Bot",
        kind: "Bot de Discord",
        desc: 'Un bot de Discord que implementa un sistema de minijuego "gacha" para una campaña de D&D. Los jugadores pueden coleccionar objetos y otros beneficios mientras participan en la historia.',
        tags: ["Discord.js", "Node.js"],
      },
    },

    experience: [
      {
        date: "2026 — ACTUALIDAD",
        title: "Analista de Inteligencia de Negocios",
        place: "Entel Perú // Telecomunicaciones",
        text: "Embarcándome en un nuevo capítulo de mi carrera, asumo un rol enfocado en supervisar la infraestructura crítica de reportes, impulsar iniciativas de automatización y liderar proyectos estratégicos de migración de sistemas para mejorar la eficiencia operacional y entregar conocimientos basados en datos.",
      },
      {
        date: "2024 — 2025",
        title: "Practicante Pre Profesional de Inteligencia de Negocios",
        place: "Entel Perú // Telecomunicaciones",
        text: "Desarrollé y mantuve una aplicación interna de gestión de inversiones para una de las empresas de telecomunicaciones más grandes de mi país. Este sistema maneja operaciones financieras críticas y ha mejorado la eficiencia de los procesos de seguimiento e informes de inversiones. Lideré el equipo ágil de desarrollo, coordinando los procesos de prueba y despliegue para asegurar la entrega fluida de soluciones de alta calidad.",
      },
    ],

    channels: "Canales",
    chEmail: "Correo",
    copy: "Copiar",
    copied: "Copiado",
    transmission: "Transmisión",
    contactIntro:
      "Siempre estoy abierto a discutir nuevos proyectos, ideas creativas u oportunidades para ser parte de tu visión. ¡No dudes en contactarme!",
    fName: "Nombre",
    fEmail: "Correo electrónico",
    fMsg: "Mensaje",
    send: "Enviar transmisión",
    mailSubject: "Contacto desde el portafolio",
    sentNote: "Tu aplicación de correo debería abrirse con el mensaje listo para enviar",
  },
};
