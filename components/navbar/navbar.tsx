"use client"

import { buttonVariants } from "@/components/ui/button"
import { LucideBrain } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="flex h-fit w-full bg-primary-foreground p-3 drop-shadow-md" aria-label="Main navigation">
      <Link className="flex transition-all items-center gap-2 hover:scale-105 rounded-sm p-1" href="/">
        <LucideBrain aria-hidden />
        <h1 className="font-bold text-3xl">CA Visualizer</h1>
      </Link>

      <ul className="ml-auto flex gap-2 items-center">
        <li>
          <Link
            href="/automata/game-of-life"
            className={buttonVariants({ variant: "link" })}
            aria-current={pathname === "/automata/game-of-life" ? "page" : undefined}
          >
            Game of Life
          </Link>
        </li>
        <li>
          <Link
            href="/automata/brians-brain"
            className={buttonVariants({ variant: "link" })}
            aria-current={pathname === "/automata/brians-brain" ? "page" : undefined}
          >
            Brian&apos;s Brain
          </Link>
        </li>
        <li>
          <Link
            href="/automata/langtons-ant"
            className={buttonVariants({ variant: "link" })}
            aria-current={pathname === "/automata/langtons-ant" ? "page" : undefined}
          >
            Langton&apos;s Ant
          </Link>
        </li>
      </ul>
    </nav>
  )
}

