


import React from 'react'
import { CellState } from './page';

function BBCell(props: { cell: CellState, i: number, j: number, flipCellState: (i: number, j: number) => void }) {
  const { cell, i, j, flipCellState } = props;
  const color = cell === CellState.ALIVE ? "bg-green-500" : cell === CellState.DYING ? "bg-green-300" : ""

  return (
    <button className={`-outline-offset-2 outline-1 outline-primary outline hover:bg-yellow-300 ${color}`} onClick={() => flipCellState(i, j)}></ button>
  )
}

export default BBCell
