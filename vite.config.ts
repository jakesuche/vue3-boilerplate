import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VueDevTools(),
    AutoImport({
      imports: [
        'vue',
        'vue-router', 
      ],
      eslintrc: {
        enabled: true, // Enable automatic ESLint configuration
        filepath: './.eslintrc-auto-import.json', // Path to the generated ESLint config
        globalsPropValue: true // Define global variables in the generated ESLint config
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
