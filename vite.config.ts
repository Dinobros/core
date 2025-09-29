import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'DinoCore',
      fileName: (format) => format === 'cjs' ? 'core.cjs' : 'core.js',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      // External dependencies that shouldn't be bundled
      external: [],
      output: {
        globals: {}
      }
    }
  }
})