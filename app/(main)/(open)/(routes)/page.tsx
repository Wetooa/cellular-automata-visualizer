import Link from "next/link";
import { Grid3x3, Brain, Bug, ArrowRight } from "lucide-react";

const automata = [
  {
    href: "/automata/game-of-life",
    title: "Game of Life",
    description:
      "Conway's classic cellular automaton. Cells live or die based on neighbor counts, producing endless emergent patterns.",
    icon: Grid3x3,
    accentClass: "accent-teal",
    iconBgClass: "bg-accent-teal/15 text-accent-teal",
    borderHoverClass: "hover:border-accent-teal/50",
  },
  {
    href: "/automata/brians-brain",
    title: "Brian's Brain",
    description:
      "Three-state automaton mimicking excitable neurons. Watch waves of activity pulse across the grid.",
    icon: Brain,
    accentClass: "accent-violet",
    iconBgClass: "bg-accent-violet/15 text-accent-violet",
    borderHoverClass: "hover:border-accent-violet/50",
  },
  {
    href: "/automata/langtons-ant",
    title: "Langton's Ant",
    description:
      "A single ant walks a grid, flipping cells and turning. Chaos yields to order as highways emerge.",
    icon: Bug,
    accentClass: "accent-amber",
    iconBgClass: "bg-accent-amber/15 text-accent-amber",
    borderHoverClass: "hover:border-accent-amber/50",
  },
];

export default function Home() {
  return (
    <main className="min-h-full bg-hero-gradient">
      <section className="px-8 pt-16 pb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Cellular Automata Visualizer
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore emergent behavior from simple rules. Interact with grids, run
          simulations, and watch complexity arise from basic local interactions.
        </p>
      </section>

      <section className="px-8 pb-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {automata.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex flex-col rounded-xl border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${item.borderHoverClass}`}
              >
                <div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${item.iconBgClass}`}
                >
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <h2 className="text-xl font-semibold text-card-foreground">
                  {item.title}
                </h2>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">
                  {item.description}
                </p>
                <span className="mt-4 inline-flex h-8 items-center gap-1.5 rounded-md border border-input bg-background px-3 text-sm font-medium shadow-sm w-fit">
                  Explore
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="px-8 pb-20 max-w-3xl mx-auto">
        <div className="rounded-xl border bg-card/50 p-6 text-muted-foreground">
          <h3 className="text-lg font-semibold text-foreground mb-3">
            What are cellular automata?
          </h3>
          <p className="text-sm leading-relaxed">
            Cellular automata are discrete systems of cells that evolve over time
            according to local rules. Each cell's next state depends only on its
            neighbors. Invented by John von Neumann and popularized by John
            Conway's Game of Life, they model how order and chaos emerge from
            simple components.
          </p>
          <p className="mt-3 text-sm leading-relaxed">
            Despite their simplicity, cellular automata produce complex,
            often unpredictable patterns. They have applications in computer
            science, biology, physics, and urban planning.
          </p>
        </div>
      </section>
    </main>
  );
}
