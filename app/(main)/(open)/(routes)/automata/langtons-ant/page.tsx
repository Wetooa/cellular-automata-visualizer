"use client"

import React, { useEffect, useState } from 'react'
import { isWithinBounds } from '@/lib/utils';
import LACell from './cell';
import { Button } from '@/components/ui/button';
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

export enum CellState {
  BLACK, WHITE
}

const LangtonsAntTT = {
  [CellState.BLACK]: 1,
  [CellState.WHITE]: -1,
}

const direction = [[0, 1], [1, 0], [0, -1], [-1, 0]]

function LangtonsAnt() {

  const [n, setN] = useState(20);
  const [grid, setGrid] = useState(createLAGrid(n));
  const [antPosition, setAntPosition] = useState([Math.floor(n / 2), Math.floor(n / 2)]);
  const [antDirection, setAntDirection] = useState(0);

  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(200);

  const [prob, setProb] = useState(0.2);

  function createLAGrid(n: number) {
    return Array.from({ length: n }, () => Array.from({ length: n }, () => CellState.WHITE))
  }

  function createRandomBBGrid(n: number, prob: number) {
    return Array.from({ length: n }, () => Array.from({ length: n }, () => Math.random() < prob ? CellState.WHITE : CellState.BLACK))
  }

  function setRandomGrid() {
    setGrid(createRandomBBGrid(n, prob))
  }

  function getOppositeColor(cell: CellState) {
    return cell == CellState.WHITE ? CellState.BLACK : CellState.WHITE
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
    setAntDirection((antDirection + LangtonsAntTT[prevGrid[antPosition[0]][antPosition[1]]] + 4) % 4)
    setAntPosition([antPosition[0] + direction[antDirection][0], antPosition[1] + direction[antDirection][1]])
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
      <h3 className="text-2xl">Brian's Brain</h3>

      <div className='p-6 flex gap-2'>
        <div className={`flex-1 aspect-square grid`} style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
          {grid.map((row, i) => {
            return row.map((cell, j) => {
              const isAnt = i === antPosition[0] && j === antPosition[1]

              return (
                <LACell isAnt={isAnt} cell={cell} i={i} j={j} flipCellState={flipCellState} />
              )
            })
          })}
        </div>

        <div className='flex flex-col gap-2'>
          <h5>Langton's Ant Controls</h5>

          <Button variant="outline" onClick={moveToNextState}>Step To Next State</Button>
          <Button variant="outline" onClick={setRandomGrid}>Generate Random Board</Button>

          <div>
            <label htmlFor="">Grid Dimensions</label>
            <Slider defaultValue={[20]} max={100} step={1} onValueChange={(e) => { setN(e[0]); setGrid(createLAGrid(e[0])); }} />
          </div>

          <div>
            <label htmlFor="">Generation Speed</label>
            <Slider defaultValue={[200]} min={50} max={1000} step={1} onValueChange={(e) => { setSpeed(e[0]) }} />
          </div>

          <div>
            <label htmlFor="">Random Generation Probablity</label>
            <Slider defaultValue={[0.2]} min={0.01} max={0.5} step={0.01} onValueChange={(e) => { setProb(e[0]) }} />
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

export default LangtonsAnt
