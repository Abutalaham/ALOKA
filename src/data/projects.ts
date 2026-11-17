export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  accentColor: string;
  gradient: string;
  tags: string[];
  year: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: 'lumina-nebula',
    title: 'Aura Interactive Engine',
    category: 'Spatial Web & Real-Time Graphics',
    description: 'An interactive generative visual system mapping dynamic light arrays and sound frequencies in continuous browser canvas space.',
    accentColor: '#A855F7',
    gradient: 'from-purple-900/40 via-violet-950/20 to-black',
    tags: ['WebGL', 'GLSL', 'Spatial Audio'],
    year: '2025',
  },
  {
    id: 'astral-agent',
    title: 'Prism Intelligent Workspace',
    category: 'AI Interfaces & Autonomous Systems',
    description: 'An adaptive interface that translates multi-modal neural interactions into luminous contextual knowledge graphs.',
    accentColor: '#8B5CF6',
    gradient: 'from-indigo-900/40 via-purple-950/20 to-black',
    tags: ['Next.js', 'LLM Graphs', 'Reactive Canvas'],
    year: '2025',
  },
  {
    id: 'synapse-flow',
    title: 'Vesper Micro-Cloud Platform',
    category: 'Cloud Architecture & Infrastructure',
    description: 'High-throughput distributed event broker featuring sub-millisecond edge routing and luminous telemetry visualization.',
    accentColor: '#60A5FA',
    gradient: 'from-blue-900/40 via-indigo-950/20 to-black',
    tags: ['Rust Core', 'Edge Worker', 'Observability'],
    year: '2024',
  },
  {
    id: 'celestial-identity',
    title: 'Solstice Design System',
    category: 'Design Systems & Motion Guidelines',
    description: 'A dark-universe design token library engineered for next-generation astronomical instruments and spatial computing displays.',
    accentColor: '#C084FC',
    gradient: 'from-fuchsia-900/40 via-purple-950/20 to-black',
    tags: ['Design Tokens', 'Tailwind', 'Micro-interactions'],
    year: '2024',
  },
];
