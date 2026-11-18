# ALOKA

[View the live website](https://abutalaham.github.io/ALOKA/)

> We turn ideas into light.

ALOKA is a creative technology studio website showcasing digital experiences, software, and design through an interactive, editorial-style portfolio.

## Highlights

- Scroll-driven landing experience with a Three.js showreel.
- Interactive WebGL particle visuals.
- Dedicated sections for services, approach, process, work, insights, and contact.
- Responsive layouts and reduced-motion considerations.

## Built With

- React 18 and TypeScript
- Vite
- Three.js and WebGL
- Tailwind CSS
- Lucide React

## Getting Started

**Requirements:** Node.js 20+ and npm.

```bash
npm ci
npm run dev
```

Vite starts the local development server at `http://localhost:3000`.

### Production Build

```bash
npm run build
npm run preview
```

The build runs the TypeScript check and creates production files in `dist/`. The preview command serves that build locally.

## Deployment

The [GitHub Pages workflow](.github/workflows/deploy.yml) builds and deploys the site when changes are pushed to `main`. It can also be started manually from the repository's **Actions** tab. GitHub Pages must use **GitHub Actions** as its deployment source.

**Live site:** [https://abutalaham.github.io/ALOKA/](https://abutalaham.github.io/ALOKA/)

## Project Structure

```text
src/
├── components/   Reusable interface and visual components
├── sections/     Landing page and portfolio sections
├── styles/       Shared styles and animation definitions
├── App.tsx       Page composition
└── main.tsx      Application entry point
```
