export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
  features: string[];
}

export const servicesData: ServiceItem[] = [
  {
    id: 'web-dev',
    number: '01',
    title: 'Web Development',
    description: 'Modern, responsive and high-performance digital experiences built with precision and architectural elegance.',
    tags: ['React', 'Next.js', 'WebGL', 'Edge Architecture'],
    features: [
      'Bespoke web applications with instant responsiveness',
      'Interactive 3D and canvas-powered visual design',
      'Accessible, SEO-optimized semantic foundations',
    ],
  },
  {
    id: 'ai-ml',
    number: '02',
    title: 'AI & Machine Learning',
    description: 'Intelligent solutions that transform data into useful insights, autonomous capabilities, and breakthrough products.',
    tags: ['Generative AI', 'LLM Agents', 'Computer Vision', 'Predictive Systems'],
    features: [
      'Tailored LLM workflows and custom agentic systems',
      'Real-time inference and embedded intelligent pipelines',
      'Responsible, private, and auditable AI systems',
    ],
  },
  {
    id: 'software-dev',
    number: '03',
    title: 'Software Development',
    description: 'Scalable software solutions designed around real business needs, engineered for resilience and velocity.',
    tags: ['Cloud Native', 'Microservices', 'GraphQL', 'Distributed Systems'],
    features: [
      'Robust cloud-native backends engineered to scale',
      'Real-time data synchronization & zero-downtime APIs',
      'Security-first architecture and automated compliance',
    ],
  },
  {
    id: 'design',
    number: '04',
    title: 'UI/UX & Creative Design',
    description: 'Thoughtful interfaces and memorable digital experiences that harmonize aesthetic beauty with intuitive clarity.',
    tags: ['Design Systems', 'Motion Design', 'Spatial UI', 'User Research'],
    features: [
      'Cohesive design systems built for cross-platform scale',
      'Micro-interactions and cinematic motion choreography',
      'Deep user psychology research and usability validation',
    ],
  },
  {
    id: 'digital-solutions',
    number: '05',
    title: 'Digital Solutions',
    description: 'Technology-driven solutions to simplify workflows, automate repetitive tasks, and elevate operational agility.',
    tags: ['Workflow Automation', 'Cloud Migration', 'Integrations', 'DevOps'],
    features: [
      'End-to-end operational pipeline orchestration',
      'Legacy modernization with frictionless migration paths',
      'Unified enterprise dashboards and observability',
    ],
  },
  {
    id: 'innovation-consulting',
    number: '06',
    title: 'Innovation & Consulting',
    description: 'Helping businesses discover, validate, and build the right technology solutions to lead in their industries.',
    tags: ['Tech Strategy', 'R&D Prototyping', 'Architecture Audits', 'Venture Labs'],
    features: [
      'Rapid prototype validation from concept to MVP in weeks',
      'Technology stack audits and future-proof roadmapping',
      'Strategic advisory on emerging tech adoption',
    ],
  },
];
