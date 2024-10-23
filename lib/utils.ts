import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createGrid(n: number) {
  return Array.from({ length: n }, () => Array.from({ length: n }, () => 0))
}


export function isWithinBounds(i: number, j: number, n: number) {
  return i >= 0 && i < n && j >= 0 && j < n
}
