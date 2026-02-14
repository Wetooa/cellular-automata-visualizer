import React from "react";
import { LLCellState as CellState } from "@/lib/types";

function LACell(props: {
  cell: CellState;
  i: number;
  j: number;
  flipCellState: (i: number, j: number) => void;
  isAnt: boolean;
}) {
  const { cell, i, j, isAnt, flipCellState } = props;

  const cellState = isAnt ? "ant" : cell === CellState.BLACK ? "black" : "white";
  const bgClass = isAnt
    ? "bg-accent-amber"
    : cell === CellState.BLACK
      ? "bg-amber-800"
      : "bg-slate-100";

  return (
    <button
      role="gridcell"
      aria-label={`Cell row ${i + 1} column ${j + 1}, ${cellState}`}
      className={`-outline-offset-2 outline-1 overflow-hidden text-nowrap outline outline-slate-300 hover:bg-accent-amber/30 ${bgClass}`}
      onClick={() => flipCellState(i, j)}
    />
  );
}

export default LACell;
