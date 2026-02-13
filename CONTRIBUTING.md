# Contributing to Cellular Automata Visualizer

Thank you for your interest in contributing.

## Development Setup

1. Fork and clone the repository.
2. Install dependencies: `npm install`
3. Run the dev server: `npm run dev`
4. Open http://localhost:3000

## Code Style

- Use TypeScript for all new code.
- Follow the existing formatting (Prettier if configured).
- Run `npm run lint` before committing.
- Use meaningful variable and function names.

## Project Conventions

- **Components**: PascalCase, colocated with their routes when route-specific.
- **Utilities**: Place in `lib/` with JSDoc comments.
- **State**: Prefer local `useState` for automata state; lift only when needed.
- **Accessibility**: Use semantic HTML, ARIA attributes where appropriate, and associate labels with form controls.

## Adding a New Automaton

1. Create a route under `app/(main)/(open)/(routes)/automata/<name>/`
2. Add a `page.tsx` (client component with simulation logic) and `layout.tsx` (metadata)
3. Create a cell component for rendering individual cells
4. Add the route to the navbar in `components/navbar/navbar.tsx`
5. Add any cell state enums to `lib/types.ts`

## Pull Requests

1. Create a branch from `master`.
2. Make focused changes with clear commit messages.
3. Ensure the app builds: `npm run build`
4. Open a PR with a description of the change.
5. Address any review feedback.

## Questions

Open an issue for questions or discussions.
