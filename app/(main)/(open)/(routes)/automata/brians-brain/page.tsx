
"use client"

import React, { useEffect, useState } from 'react'
import { isWithinBounds } from '@/lib/utils';
import { LucideArrowRight, LucideClock6, LucideDice4, LucideDices, LucideDivideSquare, LucideFastForward, LucideGrid2x2Plus, LucideLightbulb, LucideTrash } from 'lucide-react';
import BBCell from './cell';
import { Button } from '@/components/ui/button';
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from '@/components/ui/label';

export enum CellState {
  ALIVE, DEAD, DYING
}

const BriansBrainTT = {
  [CellState.DEAD]: [CellState.DEAD, CellState.DEAD, CellState.ALIVE, CellState.DEAD, CellState.DEAD, CellState.DEAD, CellState.DEAD, CellState.DEAD, CellState.DEAD],
  [CellState.DYING]: [CellState.DEAD, CellState.DEAD, CellState.DEAD, CellState.DEAD, CellState.DEAD, CellState.DEAD, CellState.DEAD, CellState.DEAD, CellState.DEAD],
  [CellState.ALIVE]: [CellState.DYING, CellState.DYING, CellState.DYING, CellState.DYING, CellState.DYING, CellState.DYING, CellState.DYING, CellState.DYING, CellState.DYING],
}

const orthogonalChange = [[0, 1], [1, 0], [0, -1], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]]

function BriansBrain() {

  const [n, setN] = useState(20);
  const [grid, setGrid] = useState(createBBGrid(n));

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
    for (let [dx, dy] of orthogonalChange) {
      let r = i + dx;
      let c = j + dy;
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

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        moveToNextState()
      }, speed)
      return () => clearInterval(interval)
    }
  })

  function clearGrid() {
    setGrid(createBBGrid(n))
  }

  return (
    <div className='p-2 h-[90%]'>
      <h3 className="text-2xl font-bold p-2">Brian's Brain</h3>

      <div className='p-6 flex gap-2 h-full'>
        <div className={`h-full aspect-square grid`} style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
          {grid.map((row, i) => {
            return row.map((cell, j) => {
              return (
                <BBCell cell={cell} i={i} j={j} flipCellState={flipCellState} />
              )
            })
          })}
        </div>

        <div className='flex flex-col gap-3 w-72 rounded-lg border p-2'>
          <h5 className="text-lg font-bold">Brian's Brain Controls</h5>

          <Button variant="outline" onClick={moveToNextState}>Step To Next State <LucideArrowRight /> </Button>
          <Button variant="outline" onClick={setRandomGrid}>Generate Random Board <LucideDice4 /></Button>
          <Button variant="destructive" onClick={clearGrid}>Clear Grid <LucideTrash /></Button>

          <div>
            <Label className="flex items-center gap-2" htmlFor=""> <LucideGrid2x2Plus className="w-3" />  Grid Dimensions </Label>
            <Slider defaultValue={[20]} max={100} step={1} onValueChange={(e) => { setN(e[0]); setGrid(createBBGrid(e[0])); }} />
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
            <p className="text-xs">Brian's Brain, created by Brian Silverman, is a cellular automaton that mimics excitable systems like neurons. Each cell can be in one of three states: On, Off, or Dying. If a cell is On, it transitions to Dying, then Off, and if it's Off, it can turn On if exactly two neighbors are On. The resulting behavior is chaotic yet self-sustaining, with pulsing patterns that resemble waves of activity spreading across the grid.</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default BriansBrain
