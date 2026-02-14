import React from "react";
import { GOLCellState as CellState } from "@/lib/types";

function GOLCell(props: {
  cell: CellState;
  i: number;
  j: number;
  flipCellState: (i: number, j: number) => void;
}) {
  const { cell, i, j, flipCellState } = props;
  return (
    <button
      role="gridcell"
      aria-label={`Cell row ${i + 1} column ${j + 1}, ${cell === CellState.ALIVE ? "alive" : "dead"}`}
      className={`-outline-offset-2 outline-1 outline outline-slate-300 hover:bg-accent-teal/25 ${
        cell === CellState.ALIVE ? "bg-accent-teal" : "bg-slate-200"
      }`}
      onClick={() => flipCellState(i, j)}
    />
  );
}

export default GOLCell;
