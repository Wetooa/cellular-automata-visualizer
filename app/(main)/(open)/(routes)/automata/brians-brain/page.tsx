
"use client"

import React, { useEffect, useRef, useState } from 'react'
import { isWithinBounds } from '@/lib/utils';
import { LucideArrowRight, LucideClock6, LucideDice4, LucideDices, LucideGrid2x2Plus, LucideLightbulb, LucideTrash } from 'lucide-react';
import BBCell from './cell';
import { Button } from '@/components/ui/button';
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from '@/components/ui/label';
import { BBCellState as CellState } from '@/lib/types'

const BriansBrainTT = {
  [CellState.DEAD]: [CellState.DEAD, CellState.DEAD, CellState.ALIVE, CellState.DEAD, CellState.DEAD, CellState.DEAD, CellState.DEAD, CellState.DEAD, CellState.DEAD],
  [CellState.DYING]: [CellState.DEAD, CellState.DEAD, CellState.DEAD, CellState.DEAD, CellState.DEAD, CellState.DEAD, CellState.DEAD, CellState.DEAD, CellState.DEAD],
  [CellState.ALIVE]: [CellState.DYING, CellState.DYING, CellState.DYING, CellState.DYING, CellState.DYING, CellState.DYING, CellState.DYING, CellState.DYING, CellState.DYING],
}

const orthogonalChange = [[0, 1], [1, 0], [0, -1], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]]

function BriansBrain() {

  const [n, setN] = useState(20);
  const [grid, setGrid] = useState(() => createBBGrid(20));

  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(200);

  const [prob, setProb] = useState(0.2);

  function createBBGrid(n: number) {
    return Array.from({ length: n }, () => Array.from({ length: n }, () => CellState.DEAD))
  }

  function createRandomBBGrid(n: number, prob: number) {
    return Array.from({ length: n }, () => Array.from({ length: n }, () => Math.random() < prob ? CellState.ALIVE : CellState.DEAD))
  }

  function setRandomGrid() {
    setGrid(createRandomBBGrid(n, prob))
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
        return BriansBrainTT[cell][countAliveNeighbors(prevGrid, i, j)]
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

  function clearGrid() {
    setGrid(createBBGrid(n))
  }

  return (
    <div className='p-2 h-[90%] bg-background'>
      <h3 className="text-2xl font-bold p-2 text-accent-violet">Brian's Brain</h3>

      <div className="p-6 flex flex-col lg:flex-row gap-4 h-full overflow-auto">
        <div
          className="h-full aspect-square grid rounded-xl border border-border bg-card p-2 shadow-sm"
          style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}
          role="grid"
          aria-label="Brian's Brain grid"
        >
          {grid.map((row, i) => {
            return row.map((cell, j) => {
              return (
                <BBCell key={i * n + j} cell={cell} i={i} j={j} flipCellState={flipCellState} />
              )
            })
          })}
        </div>

        <div className="flex flex-col gap-3 w-full lg:w-72 shrink-0 rounded-xl border-l-4 border-l-accent-violet border bg-card p-5 shadow-sm">
          <h5 className="text-lg font-bold text-accent-violet">Brian's Brain Controls</h5>

          <Button variant="outline" onClick={moveToNextState}>Step To Next State <LucideArrowRight /> </Button>
          <Button variant="outline" onClick={setRandomGrid}>Generate Random Board <LucideDice4 /></Button>
          <Button variant="destructive" onClick={clearGrid}>Clear Grid <LucideTrash /></Button>

          <div>
            <Label className="flex items-center gap-2" htmlFor="bb-grid-size">
              <LucideGrid2x2Plus className="w-3" aria-hidden /> Grid Dimensions
            </Label>
            <Slider id="bb-grid-size" defaultValue={[20]} max={100} step={1} onValueChange={(e) => { setN(e[0]); setGrid(createBBGrid(e[0])); }} />
          </div>

          <div>
            <Label className="flex items-center gap-2" htmlFor="bb-speed">
              <LucideClock6 className="w-3" aria-hidden /> Generation Speed
            </Label>
            <Slider id="bb-speed" defaultValue={[200]} min={10} max={1000} step={1} onValueChange={(e) => { setSpeed(e[0]) }} />
          </div>

          <div>
            <Label className="flex items-center gap-2" htmlFor="bb-prob">
              <LucideDices className="w-3" aria-hidden /> Random Generation Probability
            </Label>
            <Slider id="bb-prob" defaultValue={[0.2]} min={0.1} max={1} step={0.1} onValueChange={(e) => { setProb(e[0]) }} />
          </div>

          <div className="flex items-center gap-2">
            <Label htmlFor="bb-run" className="flex items-center gap-2">Run Simulation</Label>
            <Switch id="bb-run" checked={isRunning} onCheckedChange={() => setIsRunning(!isRunning)} />
          </div>

          <div className="italic">
            <h6 className="flex items-center"> Explanation <LucideLightbulb className="w-3" /> </h6>
            <p className="text-xs">Brian's Brain, created by Brian Silverman, is a cellular automaton that mimics excitable systems like neurons. Each cell can be in one of three states: On, Off, or Dying. If a cell is On, it transitions to Dying, then Off, and if it's Off, it can turn On if exactly two neighbors are On. The resulting behavior is chaotic yet self-sustaining, with pulsing patterns that resemble waves of activity spreading across the grid.</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default BriansBrain
