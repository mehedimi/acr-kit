import { defineConfig } from 'vite'
import * as path from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        sw: path.resolve(__dirname, 'src/sw.ts'),
      },
      output: {
        entryFileNames: '[name].js',
      },
    },
    outDir: 'dist',
    emptyOutDir: false, // Don't clear the dist folder
  },
})
