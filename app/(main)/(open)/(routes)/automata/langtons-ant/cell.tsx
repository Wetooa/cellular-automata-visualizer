

import React from 'react'
import { LLCellState as CellState } from '@/lib/types'

function LACell(props: { cell: CellState, i: number, j: number, flipCellState: (i: number, j: number) => void, isAnt: boolean }) {
  const { cell, i, j, isAnt, flipCellState } = props;

  return (
    <button className={`-outline-offset-2 outline-1 overflow-hidden text-nowrap outline-primary hover:bg-yellow-300 ${isAnt ? `bg-red-600 ` : cell === CellState.BLACK ? "bg-gray-500 outline" : "outline"}`} onClick={() => flipCellState(i, j)}> </ button>
  )
}

export default LACell
