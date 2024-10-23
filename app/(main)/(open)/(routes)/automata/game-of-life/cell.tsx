

import React from 'react'
import { CellState } from './page';

function GOLCell(props: { cell: CellState, i: number, j: number, flipCellState: (i: number, j: number) => void }) {
  const { cell, i, j, flipCellState } = props;
  return (
    <button className={`-outline-offset-2 outline-primary outline hover:bg-yellow-300 ${cell === CellState.ALIVE ? "bg-green-300" : ""}`} onClick={() => flipCellState(i, j)}></ button>
  )
}

export default GOLCell
