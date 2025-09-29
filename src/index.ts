// Main entry point for @dinobros/core library
export { default as math } from './utils/math'
export { default as string } from './utils/string'
export { default as array } from './utils/array'
export { default as object } from './utils/object'

// Re-export utilities with specific names to avoid conflicts
export * from './utils/math'
export * from './utils/string' 
export * from './utils/array'
export { 
  deepClone, 
  deepMerge, 
  get, 
  set, 
  has, 
  omit, 
  pick,
  isEmpty as isEmptyObject
} from './utils/object'