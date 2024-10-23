"use client"

import React, { useEffect, useState } from 'react'
import { isWithinBounds } from '@/lib/utils';
import GOLCell from './cell';
import { Button } from '@/components/ui/button';
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

export enum CellState {
  ALIVE, DEAD
}

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
    <div className='p-2'>
      <h3 className="text-2xl">Game of Life</h3>

      <div className='p-6 flex gap-2'>
        <div className={`flex-1 aspect-square grid`} style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
          {grid.map((row, i) => {
            return row.map((cell, j) => {
              return (
                <GOLCell cell={cell} i={i} j={j} flipCellState={flipCellState} />
              )
            })
          })}
        </div>

        <div className='flex flex-col gap-2'>
          <h5>Game Of Life Controls</h5>

          <Button variant="outline" onClick={moveToNextState}>Step To Next State</Button>
          <Button variant="outline" onClick={setRandomGrid}>Generate Random Board</Button>

          <div>
            <label htmlFor="">Grid Dimensions</label>
            <Slider defaultValue={[20]} max={100} step={1} onValueChange={(e) => { setN(e[0]); setGrid(createGOLGrid(e[0])); }} />
          </div>

          <div>
            <label htmlFor="">Generation Speed</label>
            <Slider defaultValue={[200]} min={100} max={1000} step={1} onValueChange={(e) => { setSpeed(e[0]) }} />
          </div>

          <div>
            <label htmlFor="">Random Generation Probablity</label>
            <Slider defaultValue={[0.2]} min={0.1} max={1} step={0.1} onValueChange={(e) => { setProb(e[0]) }} />
          </div>

          <div>
            <label className='block' htmlFor="">Run Simulation</label>
            <Switch
              checked={isRunning}
              onCheckedChange={() => setIsRunning(!isRunning)}
            />
          </div>

        </div>
      </div>

    </div>
  )
}

export default GameOfLife
