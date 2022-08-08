import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import vueJsx from '@vitejs/plugin-vue-jsx'
const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    resolve: {
      alias: {
        '~/': `${pathSrc}/`,
        '@': path.resolve(__dirname, './src'),
        // fs: require.resolve('rollup-plugin-node-builtins')
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/styles/element/index.scss" as *;`,
        },
      },
    },
    plugins: [
      vue(),
      vueSetupExtend(),
      vueJsx({}),
      Components({
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass',
          }),
        ],
        dts: path.resolve(pathSrc, 'components.d.ts'),
      }),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      })
    ],
    build: {
      rollupOptions: {
        // 请确保外部化那些你的库中不需要的依赖
        external: ['vue'],
        output: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            vue: 'Vue',
          },
        },
      },
      lib: {
        entry: './src/components/customInput/index.ts',
        name: 'number-input',
      },
    }
  }
})
