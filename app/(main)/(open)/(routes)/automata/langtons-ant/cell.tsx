

import React from 'react'
import { CellState } from './page';

function LACell(props: { cell: CellState, i: number, j: number, flipCellState: (i: number, j: number) => void, isAnt: boolean }) {
  const { cell, i, j, isAnt, flipCellState } = props;
  return (
    <button className={`-outline-offset-2 outline-primary outline hover:bg-yellow-300 ${isAnt ? "bg-red-600" : cell === CellState.BLACK ? "bg-gray-500" : ""}`} onClick={() => flipCellState(i, j)}></ button>
  )
}

export default LACell
