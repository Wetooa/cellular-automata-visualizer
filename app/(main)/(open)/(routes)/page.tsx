export default function Home() {
  return (
    <main className="p-8 flex items-center justify-center flex-col w-full h-full">
      <h2 className="text-2xl font-bold mb-4">Welcome To Cellular Automata Visualizer</h2>
      <p className="mb-8 p-5">
        Cellular automata (CA) are mathematical models used to simulate complex systems or processes that evolve over time, often in surprising ways, based on simple, localized rules. Invented by John von Neumann and further popularized by mathematician John Conway with his Game of Life, cellular automata are discrete systems consisting of a grid (or lattice) of cells. Each cell can be in one of a finite number of possible states, and the state of each cell evolves according to a set of rules based on the states of its neighboring cells.
        <br />
        <br />
        The grid can be one-dimensional, two-dimensional, or even higher dimensions, but the most commonly studied CA are in two dimensions. The cells interact locally, meaning that the evolution of a given cell only depends on its neighboring cells (such as directly adjacent cells or cells within a certain distance). Despite this simplicity, the interactions can give rise to complex and emergent behaviors, making cellular automata valuable for modeling a wide variety of real-world phenomena.
        <br />
        <br />
        In conclusion, cellular automata are powerful models for simulating and studying complex systems with localized interactions. By applying simple rules, they provide insight into how order, structure, and unpredictability can emerge from seemingly simple components, offering applications that range from theoretical computer science to practical problem-solving in fields like biology, physics, and urban planning.
      </p>
    </main>
  );
}
