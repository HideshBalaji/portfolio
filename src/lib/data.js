// All of the page's content lives here, so you can edit the portfolio
// without touching the components.

export const profile = {
  name: 'Hidesh Balaji',
  fullName: 'Hidesh Balaji C U',
  location: 'Chennai, India',
  email: 'thehideshbalaji@outlook.com',
  github: 'https://github.com/HideshBalaji',
  githubHandle: 'HideshBalaji',
  linkedin: 'https://www.linkedin.com/in/hidesh-balaji-c-u-068532221/',
  // Drop a photo into /public and put its path here (for example '/me.jpg')
  // to show it in the hero polaroid once the countdown finishes.
  photo: null,
};

export const projects = [
  {
    id: 'rag',
    visual: 'rag',
    title: 'Career guidance with RAG',
    kind: 'AI web app',
    date: 'Sept 2024 – Mar 2025',
    description:
      'Reads a resume, pulls out skills with spaCy, and ranks job titles using TF-IDF and cosine similarity. It then runs Google Jobs searches through SerpApi, matching a person against more than 1,000 job titles and returning the top five.',
    tags: ['React', 'Flask', 'REST API', 'Ollama (Mistral, Gemma)', 'SQLite', 'spaCy'],
    links: [
      {
        label: 'Source on GitHub',
        href: 'https://github.com/HideshBalaji/Enhanced-Career-Guidance-using-RAG',
      },
      { label: 'Read the paper', href: 'https://doi.org/10.1109/ICICT64420.2025.11005166' },
    ],
  },
  {
    id: 'skinnapp',
    visual: 'scan',
    title: 'Skinnapp',
    kind: 'Android app for skin disease identification',
    date: 'Nov 2024',
    description:
      'Identifies skin diseases and skin cancer from a photo, using a TensorFlow Lite model trained on the HAM10000 dataset. Deep-learning analysis runs in real time, inside a Kotlin app with a Fragment-based UI.',
    tags: ['Kotlin', 'Android Studio', 'TensorFlow Lite'],
    links: [
      {
        label: 'Source on GitHub',
        href: 'https://github.com/HideshBalaji/Mobile-Application-Development-Project',
      },
    ],
  },
  {
    id: 'bench',
    visual: 'bench',
    title: 'pandas vs Polars',
    kind: 'Data pipeline benchmark',
    date: '',
    description:
      'An end-to-end ETL pipeline on the NYC Taxi dataset, built twice: once in pandas and once in Polars. Lazy execution and parallel query planning took the run from 3.43 s to 0.48 s, with a smaller memory footprint from columnar processing.',
    tags: ['Rust', 'Polars', 'Python', 'pandas', 'pyarrow', 'ETL'],
    links: [
      {
        label: 'Source on GitHub',
        href: 'https://github.com/HideshBalaji/pandas-vs-polars-benchmark',
      },
    ],
  },
];

// Work history, newest first. Keep each job to one or two short lines; the
// full detail lives in the resume. `note` is an optional line under the role.
export const experience = [
  {
    company: 'Complyance',
    place: 'Chennai',
    when: 'May 2026 – present',
    role: 'Associate software engineer',
    note: 'Since Nov 2026. Full-stack developer intern before that, May to Nov 2026.',
    lines: [
      'Shipped end-to-end e-invoicing for Oman, sending and receiving, in under five days, and built e-invoice XML generation for Germany and Belgium.',
      'Rebuilt the Excel and CSV invoice import service for Complyance v3, and built invoice PDF templates and a proof-of-concept Microsoft Dynamics 365 connector.',
    ],
  },
  {
    company: 'Blinking Soft',
    place: 'Coimbatore',
    when: 'Dec 2025 – May 2026',
    role: 'Full-stack developer',
    lines: [
      'Built offline-first features on WatermelonDB and AsyncStorage, with background sync to REST APIs.',
      'Added a receipt-parsing pipeline on a GLM-based OCR model, and automated WhatsApp notifications through the Exotel and Meta APIs.',
    ],
  },
  {
    company: 'CubeSimple Inc',
    place: 'Chennai',
    when: 'Jul 2025 – Nov 2025',
    role: 'ServiceNow analyst',
    lines: [
      'Built a pipeline that clusters incident records with machine learning and uses LLMs to name and define each cluster, and trained Predictive Intelligence models to categorise incoming incidents.',
    ],
  },
];

export const paper = {
  title: 'Enhancing Career Guidance for Students Through Retrieval Augmented Generation',
  authors: 'Hidesh Balaji, et al.',
  venue:
    'Proceedings of the 2025 International Conference on Inventive Computation Technologies (ICICT)',
  detail: 'IEEE, pp. 1314–1319. May 2025, Coimbatore.',
  doi: '10.1109/ICICT64420.2025.11005166',
  href: 'https://doi.org/10.1109/ICICT64420.2025.11005166',
};

export const toolkit = [
  {
    group: 'Stack',
    items: ['JavaScript', 'TypeScript', 'Rust', 'C++'],
  },
  {
    group: 'Software engineering',
    items: ['REST APIs', 'Backend integration', 'Full-stack development'],
  },
  {
    group: 'Databases and data handling',
    items: ['MySQL', 'MongoDB', 'SQL querying', 'Data pipelines'],
  },
];

export const offScreen = [
  {
    icon: 'reel',
    title: 'Kaleidoscope',
    role: 'President',
    when: 'Aug 2023 – May 2025',
    text: 'Led the film wing of Shristi Club in Coimbatore, a place for students to show their literary and cinematic work. Planned and ran film projects and events, and looked after a community of cinephiles.',
  },
  {
    icon: 'ball',
    title: 'Amrita football team',
    role: "Captain, 7's side",
    when: 'Jul 2022 – Feb 2025',
    text: "Played for the official Amrita Vishwa Vidyapeetham team, and captained the 7's squad through several inter-college tournaments.",
  },
  {
    icon: 'stage',
    title: 'TEDxNapierBridge',
    role: 'Crew',
    when: 'Aug 2025',
    text: 'Part of the team that organises and runs the event in Chennai: planning, community engagement and creative work.',
  },
];

// Games, shown as spines on two shelves. `color` is the case colour, `ink`
// the text colour on it, `height` the spine height in pixels. Icons come
// from the set drawn in OnRepeat.svelte.
export const shelves = [
  {
    label: 'favourites',
    games: [
      { title: 'Dying Light', icon: 'sun', color: '#d9692a', ink: '#1d1b16', height: 232 },
      { title: 'Red Dead Redemption 2', icon: 'hat', color: '#a8231d', ink: '#f4ecd9', height: 292 },
      { title: 'Grand Theft Auto IV', icon: 'city', color: '#2a2925', ink: '#f4ecd9', height: 260 },
      { title: 'Cyberpunk 2077', icon: 'chip', color: '#ffd84a', ink: '#1d1b16', height: 244 },
      { title: 'Resident Evil 6', icon: 'hazard', color: '#3f5a3b', ink: '#f4ecd9', height: 256 },
    ],
  },
  {
    label: 'the ones i go back to',
    games: [
      { title: 'Grand Theft Auto IV', icon: 'city', color: '#2a2925', ink: '#f4ecd9', height: 260 },
      { title: 'Risk of Rain 2', icon: 'rain', color: '#4a4470', ink: '#f4ecd9', height: 228 },
      { title: 'League of Legends', icon: 'sword', color: '#c79a35', ink: '#1d1b16', height: 250 },
      { title: 'Deadlock', icon: 'lock', color: '#7a2f24', ink: '#f4ecd9', height: 214 },
    ],
  },
];

// Records scattered around the page (see Vinyl.svelte). `sleeve` and `ink`
// colour the cover, `label` the sticker in the middle of the disc.
export const vinyls = {
  nirvana: {
    title: 'Heart-Shaped Box',
    artist: 'Nirvana',
    sleeve: '#1b1a18',
    ink: '#ffd84a',
    label: '#ffd84a',
  },
  blonde: {
    title: 'Blonde',
    artist: 'Frank Ocean',
    sleeve: '#ece7da',
    ink: '#1d1b16',
    label: '#6fae78',
  },
  nectar: { title: 'Nectar', artist: 'Joji', sleeve: '#d98a6f', ink: '#1d1b16', label: '#8c2f39' },
};

// Cassettes on the flyer in the "on repeat" section.
export const tapes = [
  { title: 'Hybrid Theory', artist: 'Linkin Park' },
  { title: 'California', artist: 'blink-182' },
];

export const credits = [
  {
    label: 'B.Tech, Computer Science Engineering',
    value: 'Amrita Vishwa Vidyapeetham, Coimbatore',
    when: '2021 – 2025',
  },
  {
    label: 'Higher secondary',
    value: 'The Velammal International School, Chennai',
    when: '2021',
  },
  {
    label: 'Certification',
    value: 'Introduction to Android Mobile Application Development',
    when: 'Oct 2024',
  },
];
