
import { buttonVariants } from "@/components/ui/button"
import { LucideBrain } from "lucide-react"
import Link from "next/link"

export default function Navbar() {
  return (
    <nav className='flex h-fit w-full bg-primary-foreground p-3 drop-shadow-md '>
      <Link className="flex  transition-all items-center gap-2 hover:scale-105 rounded-sm p-1" href="/">
        <LucideBrain />
        <h1 className='font-bold text-3xl'>CA Visualizer</h1>
      </Link>

      <ul className='ml-auto flex gap-2 items-center'>
        <Link href="/automata/game-of-life" className={buttonVariants({ variant: "link" })}>Game of Life</Link>
        <Link href="/automata/brians-brain" className={buttonVariants({ variant: "link" })}>Brian's Brain</Link>
        <Link href="/automata/langtons-ant" className={buttonVariants({ variant: "link" })}>Langton's Ant</Link>
      </ul>
    </nav>
  )
}

