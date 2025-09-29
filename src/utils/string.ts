/**
 * String utilities for various string manipulation operations
 */

/**
 * Capitalize the first letter of a string
 */
export function capitalize(str: string): string {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Convert a string to camelCase
 */
export function toCamelCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => 
      index === 0 ? word.toLowerCase() : word.toUpperCase()
    )
    .replace(/\s+/g, '')
}

/**
 * Convert a string to kebab-case
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase()
}

/**
 * Convert a string to snake_case
 */
export function toSnakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/\s+/g, '_')
    .toLowerCase()
}

/**
 * Truncate a string to a specified length with ellipsis
 */
export function truncate(str: string, length: number, suffix = '...'): string {
  if (str.length <= length) return str
  return str.slice(0, length - suffix.length) + suffix
}

/**
 * Remove extra whitespace from a string
 */
export function cleanWhitespace(str: string): string {
  return str.trim().replace(/\s+/g, ' ')
}

/**
 * Check if a string is empty or contains only whitespace
 */
export function isEmpty(str: string): boolean {
  return !str || str.trim().length === 0
}

/**
 * Count the number of words in a string
 */
export function wordCount(str: string): number {
  return str.trim().split(/\s+/).filter(word => word.length > 0).length
}

const string = {
  capitalize,
  toCamelCase,
  toKebabCase,
  toSnakeCase,
  truncate,
  cleanWhitespace,
  isEmpty,
  wordCount
}

export default string