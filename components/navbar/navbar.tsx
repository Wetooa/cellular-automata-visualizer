
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"

export default function Navbar() {
  return (
    <nav className='flex bg-primary-foreground p-2'>
      <Link href="/">
        <h1 className='font-bold text-3xl'>Cellular Automata Visualizer</h1>
      </Link>

      <ul className='ml-auto flex gap-2 items-center'>
        <Link href="/automata/game-of-life" className={buttonVariants({ variant: "link" })}>Game of Life</Link>
        <Link href="/automata/brians-brain" className={buttonVariants({ variant: "link" })}>Brian's Brain</Link>
        <Link href="/automata/langtons-ant" className={buttonVariants({ variant: "link" })}>Langton's Ant</Link>
      </ul>
    </nav>
  )
}

