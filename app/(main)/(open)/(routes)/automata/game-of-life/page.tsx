"use client"

import React, { useEffect, useState } from 'react'
import { isWithinBounds } from '@/lib/utils';
import GOLCell from './cell';
import { Button } from '@/components/ui/button';
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { LucideArrowRight, LucideClock6, LucideDice4, LucideDices, LucideGrid2x2Plus, LucideLightbulb, LucideTrash } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { GOLCellState as CellState } from '@/lib/types'

const GameOfLifeTT = {
  [CellState.DEAD]: [CellState.DEAD, CellState.DEAD, CellState.DEAD, CellState.ALIVE, CellState.DEAD, CellState.DEAD, CellState.DEAD, CellState.DEAD, CellState.DEAD],
  [CellState.ALIVE]: [CellState.DEAD, CellState.DEAD, CellState.ALIVE, CellState.ALIVE, CellState.DEAD, CellState.DEAD, CellState.DEAD, CellState.DEAD, CellState.DEAD],
}

const orthogonalChange = [[0, 1], [1, 0], [0, -1], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]]

function GameOfLife() {

  const [n, setN] = useState(20);
  const [grid, setGrid] = useState(createGOLGrid(n));

  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(200);

  const [prob, setProb] = useState(0.2);

  function createGOLGrid(n: number) {
    return Array.from({ length: n }, () => Array.from({ length: n }, () => CellState.DEAD))
  }

  function createRandomGOLGrid(n: number, prob: number) {
    return Array.from({ length: n }, () => Array.from({ length: n }, () => Math.random() < prob ? CellState.ALIVE : CellState.DEAD))
  }

  function setRandomGrid() {
    setGrid(createRandomGOLGrid(n, prob))
  }

  function clearGrid() {
    setGrid(createGOLGrid(n))
  }

  function flipCellState(i: number, j: number) {
    setGrid(grid.map((row, x) => {
      return row.map((cell, y) => {
        if (x === i && y === j) {
          return cell == CellState.ALIVE ? CellState.DEAD : CellState.ALIVE
        }
        return cell
      })
    }))
  }

  function countAliveNeighbors(grid: Array<Array<CellState>>, i: number, j: number) {
    let count = 0;
    for (const [dx, dy] of orthogonalChange) {
      const r = i + dx;
      const c = j + dy;
      count += Number(isWithinBounds(r, c, n) && grid[r][c] == CellState.ALIVE);
    }
    return count;
  }

  function moveToNextState() {
    const prevGrid = grid.map(row => row.slice());

    setGrid(grid.map((row, i) => {
      return row.map((cell, j) => {
        return GameOfLifeTT[cell][countAliveNeighbors(prevGrid, i, j)]
      })
    }))
  }

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        moveToNextState()
      }, speed)
      return () => clearInterval(interval)
    }
  })

  return (
    <div className='p-2 h-[90%]'>
      <h3 className="text-2xl font-bold p-2">Game of Life</h3>

      <div className='p-6 flex  h-full gap-4'>
        <div className={`h-full aspect-square  grid`} style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
          {grid.map((row, i) => {
            return row.map((cell, j) => {
              return (
                <GOLCell key={i * n + j} cell={cell} i={i} j={j} flipCellState={flipCellState} />
              )
            })
          })}
        </div>

        <div className='flex flex-col gap-3 w-72 rounded-lg border p-2'>
          <h5 className="text-lg font-bold">Game Of Life Controls</h5>

          <Button variant="outline" onClick={moveToNextState}>Step To Next State <LucideArrowRight /> </Button>
          <Button variant="outline" onClick={setRandomGrid}>Generate Random Board <LucideDice4 /></Button>
          <Button variant="destructive" onClick={clearGrid}>Clear Grid <LucideTrash /></Button>

          <div>
            <Label className="flex items-center gap-2" htmlFor=""> <LucideGrid2x2Plus className="w-3" />  Grid Dimensions </Label>
            <Slider defaultValue={[20]} max={100} step={1} onValueChange={(e) => { setN(e[0]); setGrid(createGOLGrid(e[0])); }} />
          </div>

          <div>
            <Label className="flex items-center gap-2" htmlFor=""> <LucideClock6 className="w-3" />  Generation Speed</Label>
            <Slider defaultValue={[200]} min={10} max={1000} step={1} onValueChange={(e) => { setSpeed(e[0]) }} />
          </div>

          <div>
            <Label className="flex items-center gap-2" htmlFor=""> <LucideDices className="w-3" />  Random Generation Probability </Label>
            <Slider defaultValue={[0.2]} min={0.1} max={1} step={0.1} onValueChange={(e) => { setProb(e[0]) }} />
          </div>

          <div>
            <label className='block' htmlFor="">Run Simulation</label>
            <Switch
              checked={isRunning}
              onCheckedChange={() => setIsRunning(!isRunning)}
            />
          </div>

          <div className="italic">
            <h6 className="flex items-center"> Explanation <LucideLightbulb className="w-3" /> </h6>
            <p className="text-xs">John Conway’s Game of Life is a cellular automaton where cells on a grid are either Alive or Dead. A cell’s next state depends on its neighbors: it survives with two or three neighbors, dies if overcrowded or isolated, and comes to life if exactly three neighbors are Alive. Despite its simplicity, Game of Life produces complex, often unpredictable patterns, showing how order and chaos can emerge from basic rules.</p>

          </div>

        </div>

      </div>

    </div>
  )
}

export default GameOfLife
