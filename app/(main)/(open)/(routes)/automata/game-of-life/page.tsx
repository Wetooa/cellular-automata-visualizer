"use client"

import React, { useEffect, useRef, useState } from 'react'
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
  const [grid, setGrid] = useState(() => createGOLGrid(20));

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

  const moveToNextStateRef = useRef(moveToNextState)
  moveToNextStateRef.current = moveToNextState

  useEffect(() => {
    if (!isRunning) return
    const interval = setInterval(() => moveToNextStateRef.current(), speed)
    return () => clearInterval(interval)
  }, [isRunning, speed])

  return (
    <div className='p-2 h-[90%] bg-background'>
      <h3 className="text-2xl font-bold p-2 text-accent-teal">Game of Life</h3>

      <div className="p-6 flex flex-col lg:flex-row h-full gap-4 overflow-auto">
        <div
          className="h-full aspect-square grid rounded-xl border border-border bg-card p-2 shadow-sm"
          style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}
          role="grid"
          aria-label="Game of Life grid"
        >
          {grid.map((row, i) => {
            return row.map((cell, j) => {
              return (
                <GOLCell key={i * n + j} cell={cell} i={i} j={j} flipCellState={flipCellState} />
              )
            })
          })}
        </div>

        <div className="flex flex-col gap-3 w-full lg:w-72 shrink-0 rounded-xl border-l-4 border-l-accent-teal border bg-card p-5 shadow-sm">
          <h5 className="text-lg font-bold text-accent-teal">Game Of Life Controls</h5>

          <Button variant="outline" onClick={moveToNextState}>Step To Next State <LucideArrowRight /> </Button>
          <Button variant="outline" onClick={setRandomGrid}>Generate Random Board <LucideDice4 /></Button>
          <Button variant="destructive" onClick={clearGrid}>Clear Grid <LucideTrash /></Button>

          <div>
            <Label className="flex items-center gap-2" htmlFor="gol-grid-size">
              <LucideGrid2x2Plus className="w-3" aria-hidden /> Grid Dimensions
            </Label>
            <Slider id="gol-grid-size" defaultValue={[20]} max={100} step={1} onValueChange={(e) => { setN(e[0]); setGrid(createGOLGrid(e[0])); }} />
          </div>

          <div>
            <Label className="flex items-center gap-2" htmlFor="gol-speed">
              <LucideClock6 className="w-3" aria-hidden /> Generation Speed
            </Label>
            <Slider id="gol-speed" defaultValue={[200]} min={10} max={1000} step={1} onValueChange={(e) => { setSpeed(e[0]) }} />
          </div>

          <div>
            <Label className="flex items-center gap-2" htmlFor="gol-prob">
              <LucideDices className="w-3" aria-hidden /> Random Generation Probability
            </Label>
            <Slider id="gol-prob" defaultValue={[0.2]} min={0.1} max={1} step={0.1} onValueChange={(e) => { setProb(e[0]) }} />
          </div>

          <div className="flex items-center gap-2">
            <Label htmlFor="gol-run" className="flex items-center gap-2">Run Simulation</Label>
            <Switch
              id="gol-run"
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
