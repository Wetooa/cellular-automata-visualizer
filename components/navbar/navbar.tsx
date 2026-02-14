"use client"

import { cn } from "@/lib/utils"
import { Grid3x3, Brain, Bug, Sparkles } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { href: "/automata/game-of-life", label: "Game of Life", icon: Grid3x3, accentClass: "text-accent-teal bg-accent-teal/15" },
  { href: "/automata/brians-brain", label: "Brian's Brain", icon: Brain, accentClass: "text-accent-violet bg-accent-violet/15" },
  { href: "/automata/langtons-ant", label: "Langton's Ant", icon: Bug, accentClass: "text-accent-amber bg-accent-amber/15" },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav
      className="flex h-fit w-full items-center border-b border-border bg-card px-4 py-3 shadow-sm"
      aria-label="Main navigation"
    >
      <Link
        className="flex items-center gap-2 rounded-md p-1.5 transition-all hover:bg-accent hover:scale-[1.02]"
        href="/"
      >
        <Sparkles className="h-6 w-6 text-accent-teal" aria-hidden />
        <h1 className="font-bold text-xl text-foreground">CA Visualizer</h1>
      </Link>

      <ul className="ml-auto flex gap-1 items-center">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive ? item.accentClass : "text-muted-foreground hover:bg-muted"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden />
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
