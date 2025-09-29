# @dinobros/core

A modern Vite-powered TypeScript library providing essential utilities for various use-cases in JavaScript/TypeScript projects.

## Features

- 🚀 Built with Vite for optimal performance
- 📦 TypeScript support with full type definitions
- 🌳 Tree-shakeable - import only what you need
- 📝 Comprehensive utility functions for common tasks
- 🔧 Support for both ESM and CommonJS
- ⚡ Zero dependencies

## Installation

```bash
npm install @dinobros/core
```

## Usage

### Import Everything

```typescript
import * as core from '@dinobros/core'

// Use utilities
core.math.sum([1, 2, 3, 4]) // 10
core.string.capitalize('hello world') // 'Hello world'
core.array.unique([1, 2, 2, 3]) // [1, 2, 3]
```

### Import Specific Modules

```typescript
import { math, string, array, object } from '@dinobros/core'

math.average([1, 2, 3, 4]) // 2.5
string.toCamelCase('hello-world') // 'helloWorld'
array.chunk([1, 2, 3, 4, 5, 6], 2) // [[1, 2], [3, 4], [5, 6]]
object.get({ a: { b: { c: 42 } } }, 'a.b.c') // 42
```

### Import Individual Functions

```typescript
import { sum, capitalize, unique, deepClone } from '@dinobros/core'

sum([1, 2, 3]) // 6
capitalize('hello') // 'Hello'
unique([1, 1, 2, 3, 3]) // [1, 2, 3]
deepClone({ a: { b: 1 } }) // { a: { b: 1 } }
```

## API Reference

### Math Utilities

- `sum(numbers)` - Calculate sum of numbers
- `average(numbers)` - Calculate average of numbers
- `max(numbers)` - Find maximum value
- `min(numbers)` - Find minimum value
- `isEven(num)` - Check if number is even
- `isOdd(num)` - Check if number is odd
- `clamp(value, min, max)` - Clamp value between min and max

### String Utilities

- `capitalize(str)` - Capitalize first letter
- `toCamelCase(str)` - Convert to camelCase
- `toKebabCase(str)` - Convert to kebab-case
- `toSnakeCase(str)` - Convert to snake_case
- `truncate(str, length, suffix?)` - Truncate with ellipsis
- `cleanWhitespace(str)` - Remove extra whitespace
- `isEmpty(str)` - Check if string is empty
- `wordCount(str)` - Count words in string

### Array Utilities

- `unique(arr)` - Remove duplicates
- `flatten(arr)` - Flatten one level
- `deepFlatten(arr)` - Deep flatten nested arrays
- `chunk(arr, size)` - Split into chunks
- `shuffle(arr)` - Randomly shuffle array
- `randomElement(arr)` - Get random element
- `intersection(arr1, arr2)` - Find common elements
- `difference(arr1, arr2)` - Find different elements
- `groupBy(arr, keyFn)` - Group by key function

### Object Utilities

- `deepClone(obj)` - Deep clone object
- `deepMerge(...objects)` - Deep merge objects
- `get(obj, path, defaultValue?)` - Get nested property safely
- `set(obj, path, value)` - Set nested property
- `has(obj, path)` - Check if nested property exists
- `omit(obj, keys)` - Omit specified keys
- `pick(obj, keys)` - Pick specified keys
- `isEmptyObject(obj)` - Check if object is empty

## Examples

```typescript
import { math, string, array, object } from '@dinobros/core'

// Math operations
const numbers = [1, 2, 3, 4, 5]
console.log(math.sum(numbers)) // 15
console.log(math.average(numbers)) // 3
console.log(math.clamp(10, 0, 5)) // 5

// String manipulations
console.log(string.capitalize('hello world')) // 'Hello world'
console.log(string.toCamelCase('user-name')) // 'userName'
console.log(string.truncate('This is a long text', 10)) // 'This is...'

// Array operations
const arr = [1, 2, 2, 3, 4, 4, 5]
console.log(array.unique(arr)) // [1, 2, 3, 4, 5]
console.log(array.chunk(arr, 3)) // [[1, 2, 2], [3, 4, 4], [5]]

// Object utilities
const data = { user: { profile: { name: 'John' } } }
console.log(object.get(data, 'user.profile.name')) // 'John'
console.log(object.get(data, 'user.age', 25)) // 25 (default)
```

## Development

```bash
# Clone the repository
git clone <repository-url>
cd core

# Install dependencies
npm install

# Build the library
npm run build

# Start development mode
npm run dev
```

## Build Output

The library is built to support multiple module formats:

- **ESM**: `dist/core.js` - Modern ES modules
- **CommonJS**: `dist/core.cjs` - Node.js compatible
- **Types**: `dist/index.d.ts` - TypeScript definitions

## License

GPL-3.0 - see [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.