import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ElementPlus from 'unplugin-element-plus/vite'
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4000
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/element/index.scss" as *;`,
      },
    },
  },
  plugins: [
    vue(),
    ElementPlus({
      useSource: true,
    }),
    // Components({
    //   resolvers: [
    //     ElementPlusResolver(),
    //   ],
    //   dts: true,
    //   include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    //   exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
    // })
  ],
})
