/**
 * Math utilities for various mathematical operations
 */

/**
 * Calculate the sum of an array of numbers
 */
export function sum(numbers: number[]): number {
  return numbers.reduce((acc, num) => acc + num, 0)
}

/**
 * Calculate the average of an array of numbers
 */
export function average(numbers: number[]): number {
  if (numbers.length === 0) return 0
  return sum(numbers) / numbers.length
}

/**
 * Find the maximum value in an array of numbers
 */
export function max(numbers: number[]): number {
  if (numbers.length === 0) return -Infinity
  return Math.max(...numbers)
}

/**
 * Find the minimum value in an array of numbers
 */
export function min(numbers: number[]): number {
  if (numbers.length === 0) return Infinity
  return Math.min(...numbers)
}

/**
 * Check if a number is even
 */
export function isEven(num: number): boolean {
  return num % 2 === 0
}

/**
 * Check if a number is odd
 */
export function isOdd(num: number): boolean {
  return num % 2 !== 0
}

/**
 * Clamp a number between min and max values
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

const math = {
  sum,
  average,
  max,
  min,
  isEven,
  isOdd,
  clamp
}

export default math