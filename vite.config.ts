import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      vue({
          template: {
              transformAssetUrls: {
                  base: null,
                  includeAbsolute: false,
              },
          },
      }),
  ],
    base: './',

    build: {
        outDir: 'dist',
        sourcemap: true,

        rollupOptions: {
            input: {
                frontend: path.resolve(__dirname, 'src/frontend.ts'),
                admin: path.resolve(__dirname, 'src/admin.ts'),
            },
            output: {
                entryFileNames: 'assets/[name].js',
                chunkFileNames: 'assets/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash].[ext]',
            },
        },
    },
    server: {
        cors: true,
        port: 5174,
        strictPort: true,
    }
})
