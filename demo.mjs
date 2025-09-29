// Example usage of @dinobros/core library
// This file demonstrates how to use the library in a Node.js environment

// In a real project, you would import like this:
// import { math, string, array, object } from '@dinobros/core'

// For this example, we'll import from the built files
import fs from 'fs'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

// Load the CommonJS build
const core = require('./dist/core.cjs')

console.log('🚀 @dinobros/core Library Demo\n')

// Math utilities demo
console.log('📊 Math Utilities:')
const numbers = [1, 2, 3, 4, 5, 10, 15, 20]
console.log(`  Numbers: [${numbers.join(', ')}]`)
console.log(`  Sum: ${core.math.sum(numbers)}`)
console.log(`  Average: ${core.math.average(numbers)}`)
console.log(`  Max: ${core.math.max(numbers)}`)
console.log(`  Min: ${core.math.min(numbers)}`)
console.log(`  Is 4 even? ${core.math.isEven(4)}`)
console.log(`  Is 5 odd? ${core.math.isOdd(5)}`)
console.log(`  Clamp 25 between 0-10: ${core.math.clamp(25, 0, 10)}`)
console.log()

// String utilities demo
console.log('📝 String Utilities:')
const text = 'hello world from dinobros'
console.log(`  Original: "${text}"`)
console.log(`  Capitalized: "${core.string.capitalize(text)}"`)
console.log(`  CamelCase: "${core.string.toCamelCase(text)}"`)
console.log(`  KebabCase: "${core.string.toKebabCase(text)}"`)
console.log(`  SnakeCase: "${core.string.toSnakeCase(text)}"`)
console.log(`  Truncated (15): "${core.string.truncate(text, 15)}"`)
console.log(`  Word count: ${core.string.wordCount(text)}`)
console.log(`  Is empty? ${core.string.isEmpty(text)}`)
console.log()

// Array utilities demo
console.log('📋 Array Utilities:')
const arr = [1, 2, 2, 3, 4, 4, 5, 1, 6, 7]
console.log(`  Original: [${arr.join(', ')}]`)
console.log(`  Unique: [${core.array.unique(arr).join(', ')}]`)
console.log(`  Chunked (size 3): [${core.array.chunk(arr, 3).map(chunk => '[' + chunk.join(', ') + ']').join(', ')}]`)
console.log(`  Shuffled: [${core.array.shuffle([...arr]).join(', ')}]`)
console.log(`  Random element: ${core.array.randomElement(arr)}`)

const arr1 = [1, 2, 3, 4, 5]
const arr2 = [3, 4, 5, 6, 7]
console.log(`  Array 1: [${arr1.join(', ')}]`)
console.log(`  Array 2: [${arr2.join(', ')}]`)
console.log(`  Intersection: [${core.array.intersection(arr1, arr2).join(', ')}]`)
console.log(`  Difference: [${core.array.difference(arr1, arr2).join(', ')}]`)
console.log()

// Object utilities demo
console.log('🔧 Object Utilities:')
const obj = {
  user: {
    profile: {
      name: 'John Doe',
      age: 30
    },
    settings: {
      theme: 'dark',
      notifications: true
    }
  },
  posts: [
    { title: 'Hello World', views: 100 },
    { title: 'TypeScript Tips', views: 250 }
  ]
}

console.log('  Sample object created')
console.log(`  Get 'user.profile.name': "${core.object.get(obj, 'user.profile.name')}"`)
console.log(`  Get 'user.profile.email' (default): "${core.object.get(obj, 'user.profile.email', 'no-email@example.com')}"`)
console.log(`  Has 'user.settings.theme': ${core.object.has(obj, 'user.settings.theme')}`)
console.log(`  Has 'user.social.twitter': ${core.object.has(obj, 'user.social.twitter')}`)

const cloned = core.object.deepClone(obj)
console.log(`  Deep clone successful: ${cloned.user.profile.name === obj.user.profile.name}`)
console.log(`  Objects are different references: ${cloned !== obj}`)

const picked = core.object.pick(obj.user.profile, ['name'])
console.log(`  Picked 'name' from profile: ${JSON.stringify(picked)}`)

const omitted = core.object.omit(obj.user.profile, ['age'])
console.log(`  Omitted 'age' from profile: ${JSON.stringify(omitted)}`)

console.log(`  Is empty object {}: ${core.object.isEmpty({})}`)
console.log(`  Is empty object with data: ${core.object.isEmpty(obj)}`)

console.log('\n✅ All demos completed successfully!')
console.log('\n📦 Library build info:')
console.log(`  ESM build: dist/core.js (${fs.statSync('./dist/core.js').size} bytes)`)
console.log(`  CommonJS build: dist/core.cjs (${fs.statSync('./dist/core.cjs').size} bytes)`)
console.log(`  TypeScript definitions: dist/index.d.ts (${fs.statSync('./dist/index.d.ts').size} bytes)`)