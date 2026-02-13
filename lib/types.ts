/** Cell states for Langton's Ant (black/white grid). */
export enum LLCellState {
  WHITE = 1,
  BLACK = 0,
}

/** Cell states for Conway's Game of Life. */
export enum GOLCellState {
  DEAD = 0,
  ALIVE = 1,
}

/** Cell states for Brian's Brain (on, off, dying). */
export enum BBCellState {
  ALIVE = 0,
  DEAD = 1,
  DYING = 2,
}
