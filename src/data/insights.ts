export interface InsightItem {
  id: string;
  category: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  slug: string;
}

export const insightsData: InsightItem[] = [
  {
    id: 'light-responsive-interfaces',
    category: 'Design Engineering',
    title: 'The Poetics of Responsive Light in Modern Digital Interfaces',
    summary: 'Exploring how subtle luminous feedback and spatial particle systems can deepen emotional connection without overwhelming human attention.',
    date: 'February 2025',
    readTime: '5 min read',
    slug: '#insight-1',
  },
  {
    id: 'next-gen-agentic-craft',
    category: 'Applied AI',
    title: 'Designing for Ambient Intelligence: Beyond Simple Prompt Bars',
    summary: 'Why the future of software interaction relies on contextual presence, adaptive visual cues, and calm technology paradigms.',
    date: 'January 2025',
    readTime: '7 min read',
    slug: '#insight-2',
  },
  {
    id: 'webgl-performance-discipline',
    category: 'Performance',
    title: '60 FPS in Deep Space: High-Performance Canvas Optimization',
    summary: 'Techniques for rendering thousands of interactive cosmic particles, radial gradients, and light fields while keeping main-thread execution near zero.',
    date: 'December 2024',
    readTime: '6 min read',
    slug: '#insight-3',
  },
];
