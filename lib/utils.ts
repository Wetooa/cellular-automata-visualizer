import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges Tailwind CSS classes with clsx and tailwind-merge.
 * Resolves conflicts (e.g. "p-4 p-2" becomes "p-2") and handles conditionals.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Checks if grid coordinates (i, j) are within bounds for an n×n grid.
 * @param i - Row index
 * @param j - Column index
 * @param n - Grid dimension
 */
export function isWithinBounds(i: number, j: number, n: number) {
  return i >= 0 && i < n && j >= 0 && j < n
}
