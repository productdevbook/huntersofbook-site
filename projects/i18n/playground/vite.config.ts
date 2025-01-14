import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import i18n from '@huntersofbook/i18n/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    i18n({
      languages: ['tr', 'en', 'cn'],
    }),
  ],
  server: {
    watch: {
      ignored: ['!**/node_modules/@huntersofbook/i18n/**'],
    },
  },
  optimizeDeps: {
    exclude: ['@huntersofbook/i18n'],
  },
})
