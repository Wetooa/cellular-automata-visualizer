# Cellular Automata Visualizer

Interactive visualizations of cellular automata—discrete models that evolve over time based on simple, localized rules. Explore emergent behavior from Game of Life, Langton's Ant, and Brian's Brain.

## Features

- **Game of Life** – Conway's classic cellular automaton with alive/dead cells
- **Langton's Ant** – Turing machine with black/white cells and a moving ant
- **Brian's Brain** – Three-state automaton (on, off, dying) inspired by neural activity

Each simulation includes:
- Interactive grid (click cells to toggle)
- Step-by-step or continuous run modes
- Adjustable grid size and simulation speed
- Random board generation with configurable probability

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm, yarn, pnpm, or bun

## Getting Started

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## Project Structure

```
├── app/
│   ├── layout.tsx           # Root layout, fonts, metadata
│   ├── globals.css          # Global styles, CSS variables
│   └── (main)/(open)/(routes)/
│       ├── page.tsx         # Home page
│       └── automata/
│           ├── game-of-life/
│           ├── langtons-ant/
│           └── brians-brain/
├── components/
│   ├── navbar/              # Main navigation
│   └── ui/                  # shadcn/ui components
├── lib/
│   ├── types.ts             # Cell state enums
│   └── utils.ts             # Shared utilities
└── hooks/                   # Custom React hooks
```

## Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [React 18](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives)
- [Lucide React](https://lucide.dev/) (icons)

## Deployment

### Vercel (recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Wetooa/cellular-automata-visualizer)

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Static export

For static hosting (e.g. S3, GitHub Pages), add to `next.config.mjs`:

```js
const nextConfig = {
  output: 'export',
  // ...
};
```

Then run `npm run build`; output goes to the `out/` directory.

## License

MIT – see [LICENSE](LICENSE) for details.
