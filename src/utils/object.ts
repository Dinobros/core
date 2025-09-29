/**
 * Object utilities for various object manipulation operations
 */

/**
 * Deep clone an object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime()) as T
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as T
  if (obj instanceof Object) {
    const copy = {} as T
    Object.keys(obj).forEach(key => {
      ;(copy as any)[key] = deepClone((obj as any)[key])
    })
    return copy
  }
  return obj
}

/**
 * Merge multiple objects deeply
 */
export function deepMerge<T extends Record<string, any>>(...objects: Partial<T>[]): T {
  const result = {} as T
  
  objects.forEach(obj => {
    if (obj && typeof obj === 'object') {
      Object.keys(obj).forEach(key => {
        const value = (obj as any)[key]
        if (value && typeof value === 'object' && !Array.isArray(value)) {
          ;(result as any)[key] = deepMerge((result as any)[key] || {}, value)
        } else {
          ;(result as any)[key] = value
        }
      })
    }
  })
  
  return result
}

/**
 * Get a nested property value safely
 */
export function get(obj: any, path: string, defaultValue?: any): any {
  const keys = path.split('.')
  let result = obj
  
  for (const key of keys) {
    if (result == null || typeof result !== 'object') {
      return defaultValue
    }
    result = result[key]
  }
  
  return result !== undefined ? result : defaultValue
}

/**
 * Set a nested property value
 */
export function set(obj: any, path: string, value: any): void {
  const keys = path.split('.')
  let current = obj
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (current[key] == null || typeof current[key] !== 'object') {
      current[key] = {}
    }
    current = current[key]
  }
  
  current[keys[keys.length - 1]] = value
}

/**
 * Check if an object has a nested property
 */
export function has(obj: any, path: string): boolean {
  const keys = path.split('.')
  let current = obj
  
  for (const key of keys) {
    if (current == null || typeof current !== 'object' || !(key in current)) {
      return false
    }
    current = current[key]
  }
  
  return true
}

/**
 * Omit specified keys from an object
 */
export function omit<T extends Record<string, any>, K extends keyof T>(
  obj: T, 
  keys: K[]
): Omit<T, K> {
  const result = { ...obj }
  keys.forEach(key => delete result[key])
  return result
}

/**
 * Pick specified keys from an object
 */
export function pick<T extends Record<string, any>, K extends keyof T>(
  obj: T, 
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>
  keys.forEach(key => {
    if (key in obj) {
      result[key] = obj[key]
    }
  })
  return result
}

/**
 * Check if an object is empty
 */
export function isEmpty(obj: any): boolean {
  if (obj == null) return true
  if (Array.isArray(obj) || typeof obj === 'string') return obj.length === 0
  if (obj instanceof Map || obj instanceof Set) return obj.size === 0
  return Object.keys(obj).length === 0
}

const object = {
  deepClone,
  deepMerge,
  get,
  set,
  has,
  omit,
  pick,
  isEmpty
}

export default object