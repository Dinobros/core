/**
 * Array utilities for various array manipulation operations
 */

/**
 * Remove duplicate values from an array
 */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)]
}

/**
 * Flatten a nested array
 */
export function flatten<T>(arr: T[][]): T[] {
  return arr.flat()
}

/**
 * Deep flatten a nested array of any depth
 */
export function deepFlatten(arr: any[]): any[] {
  return arr.reduce((acc, val) => 
    Array.isArray(val) ? acc.concat(deepFlatten(val)) : acc.concat(val), 
    []
  )
}

/**
 * Chunk an array into smaller arrays of specified size
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  if (size <= 0) return []
  const chunks: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size))
  }
  return chunks
}

/**
 * Shuffle an array randomly (Fisher-Yates algorithm)
 */
export function shuffle<T>(arr: T[]): T[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

/**
 * Get a random element from an array
 */
export function randomElement<T>(arr: T[]): T | undefined {
  if (arr.length === 0) return undefined
  return arr[Math.floor(Math.random() * arr.length)]
}

/**
 * Find the intersection of two arrays
 */
export function intersection<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.filter(item => arr2.includes(item))
}

/**
 * Find the difference between two arrays
 */
export function difference<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.filter(item => !arr2.includes(item))
}

/**
 * Group array elements by a key function
 */
export function groupBy<T, K extends string | number | symbol>(
  arr: T[], 
  keyFn: (item: T) => K
): Record<K, T[]> {
  return arr.reduce((groups, item) => {
    const key = keyFn(item)
    if (!groups[key]) {
      groups[key] = []
    }
    groups[key].push(item)
    return groups
  }, {} as Record<K, T[]>)
}

const array = {
  unique,
  flatten,
  deepFlatten,
  chunk,
  shuffle,
  randomElement,
  intersection,
  difference,
  groupBy
}

export default array