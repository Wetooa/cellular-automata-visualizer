import React from "react";
import { BBCellState as CellState } from "@/lib/types";

function BBCell(props: {
  cell: CellState;
  i: number;
  j: number;
  flipCellState: (i: number, j: number) => void;
}) {
  const { cell, i, j, flipCellState } = props;
  const color =
    cell === CellState.ALIVE
      ? "bg-accent-violet"
      : cell === CellState.DYING
        ? "bg-accent-violet/60"
        : "bg-slate-200";
  const cellState =
    cell === CellState.ALIVE ? "alive" : cell === CellState.DYING ? "dying" : "dead";

  return (
    <button
      role="gridcell"
      aria-label={`Cell row ${i + 1} column ${j + 1}, ${cellState}`}
      className={`-outline-offset-2 outline-1 outline outline-slate-300 hover:bg-accent-violet/25 ${color}`}
      onClick={() => flipCellState(i, j)}
    />
  );
}

export default BBCell;
