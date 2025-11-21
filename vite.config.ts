import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig((config) => {
  return {
    plugins: [
      tailwindcss(),
      vue({
        template: {
          transformAssetUrls: {
            base: config.mode === 'development' ? process.env.ACR_DEV_ASSET : null,
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
          assetFileNames: 'assets/[name].[ext]',
        },
      },
    },
    server: {
      cors: true,
      port: 5174,
      strictPort: true,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
