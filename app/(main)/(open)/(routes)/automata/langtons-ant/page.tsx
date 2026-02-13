"use client"

import React, { useEffect, useRef, useState } from 'react'
import { LucideArrowRight, LucideClock6, LucideDice4, LucideDices, LucideGrid2x2Plus, LucideLightbulb, LucideTrash } from 'lucide-react';
import LACell from './cell';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { LLCellState as CellState } from '@/lib/types'

const LangtonsAntTT = {
  [CellState.BLACK]: -1,
  [CellState.WHITE]: 1,
}

const direction = [[-1, 0], [0, 1], [1, 0], [0, -1]]

function LangtonsAnt() {

  const [n, setN] = useState(50);
  const [grid, setGrid] = useState(() => createLAGrid(50));
  const [antPosition, setAntPosition] = useState(() => spawnAnt(50));
  const [antDirection, setAntDirection] = useState(0);

  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(200);

  const [prob, setProb] = useState(0.2);

  function createLAGrid(n: number) {
    return Array.from({ length: n }, () => Array.from({ length: n }, () => CellState.WHITE))
  }

  function createRandomLAGrid(size: number, probVal: number) {
    return Array.from({ length: size }, () => Array.from({ length: size }, () => Math.random() < probVal ? CellState.BLACK : CellState.WHITE))
  }

  function spawnAnt(size: number) {
    return [Math.floor(size / 2), Math.floor(size / 2)]
  }

  function clearGrid() {
    setGrid(createLAGrid(n))
    setAntPosition(spawnAnt(n))
    setAntDirection(0)
  }

  function setRandomGrid() {
    setGrid(createRandomLAGrid(n, prob))
    setAntPosition(spawnAnt(n))
    setAntDirection(0)
  }

  function handleGridSizeChange(newN: number) {
    setN(newN)
    setGrid(createLAGrid(newN))
    setAntPosition(spawnAnt(newN))
    setAntDirection(0)
  }

  function getOppositeColor(cell: CellState) {
    return cell === CellState.WHITE ? CellState.BLACK : CellState.WHITE
  }

  function flipCellState(i: number, j: number) {
    setGrid(grid.map((row, x) => {
      return row.map((cell, y) => {
        if (x === i && y === j) {
          return getOppositeColor(cell)
        }
        return cell
      })
    }))
  }

  function moveToNextState() {
    const prevGrid = grid.map(row => row.slice());

    setGrid(grid.map((row, i) => {
      return row.map((cell, j) => {
        if (i === antPosition[0] && j === antPosition[1]) {
          return getOppositeColor(cell)
        }
        return cell
      })
    }))
    const newDirection = (antDirection + LangtonsAntTT[prevGrid[antPosition[0]][antPosition[1]]] + 4) % 4
    setAntDirection(newDirection)
    const newRow = (antPosition[0] + direction[newDirection][0] + n) % n
    const newCol = (antPosition[1] + direction[newDirection][1] + n) % n
    setAntPosition([newRow, newCol])
  }

  const moveToNextStateRef = useRef(moveToNextState)
  moveToNextStateRef.current = moveToNextState

  useEffect(() => {
    if (!isRunning) return
    const interval = setInterval(() => moveToNextStateRef.current(), speed)
    return () => clearInterval(interval)
  }, [isRunning, speed])

  return (
    <div className='p-2 h-[90%]'>
      <h3 className="text-2xl font-bold p-2">Langton's Ant </h3>

      <div className="p-6 flex flex-col lg:flex-row gap-4 h-full overflow-auto">
        <div
          className="h-full aspect-square grid"
          style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}
          role="grid"
          aria-label="Langton's Ant grid"
        >
          {grid.map((row, i) => {
            return row.map((cell, j) => {
              const isAnt = i === antPosition[0] && j === antPosition[1]
              return (
                <LACell key={i * n + j} isAnt={isAnt} cell={cell} i={i} j={j} flipCellState={flipCellState} />
              )
            })
          })}
        </div>

        <div className="flex flex-col gap-3 w-full lg:w-72 shrink-0 rounded-lg border p-2">
          <h5 className="text-lg font-bold">Langton's Ant Controls</h5>

          <Button variant="outline" onClick={moveToNextState}>Step To Next State <LucideArrowRight /> </Button>
          <Button variant="outline" onClick={setRandomGrid}>Generate Random Board <LucideDice4 /></Button>
          <Button variant="destructive" onClick={clearGrid}>Clear Grid <LucideTrash /></Button>

          <div>
            <Label className="flex items-center gap-2" htmlFor="la-grid-size">
              <LucideGrid2x2Plus className="w-3" aria-hidden /> Grid Dimensions
            </Label>
            <Slider id="la-grid-size" defaultValue={[50]} max={100} step={1} onValueChange={(e) => handleGridSizeChange(e[0])} />
          </div>

          <div>
            <Label className="flex items-center gap-2" htmlFor="la-speed">
              <LucideClock6 className="w-3" aria-hidden /> Generation Speed
            </Label>
            <Slider id="la-speed" defaultValue={[200]} min={0} max={1000} step={1} onValueChange={(e) => { setSpeed(e[0]) }} />
          </div>

          <div>
            <Label className="flex items-center gap-2" htmlFor="la-prob">
              <LucideDices className="w-3" aria-hidden /> Random Generation Probability
            </Label>
            <Slider id="la-prob" defaultValue={[0.2]} min={0.1} max={1} step={0.1} onValueChange={(e) => { setProb(e[0]) }} />
          </div>

          <div className="flex items-center gap-2">
            <Label htmlFor="la-run" className="flex items-center gap-2">Run Simulation</Label>
            <Switch id="la-run" checked={isRunning} onCheckedChange={() => setIsRunning(!isRunning)} />
          </div>

          <div className="italic">
            <h6 className="flex items-center"> Explanation <LucideLightbulb className="w-3" /> </h6>
            <p className="text-xs">
              Langton's Ant is a simple two-dimensional automaton where an "ant" moves on a grid of Black and White cells. On White cells, it turns right, flips the cell to Black, and moves forward; on Black cells, it turns left, flips the cell to White, and moves. Initially, its movement appears random, but over time it forms a predictable pattern known as a "highway," showcasing how order can emerge from simple, deterministic behavior.
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default LangtonsAnt
