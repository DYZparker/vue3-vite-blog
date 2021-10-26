import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
import ViteComponents, { ElementPlusResolver } from 'vite-plugin-components'


export default defineConfig({
  plugins: [
    vue(),
    //按需导入element-plus组件
    ViteComponents({
      customComponentResolvers: [ElementPlusResolver()],
    }),
    //按需导入element-plus的css样式
    styleImport({
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          resolveStyle: name => {
            return `element-plus/lib/theme-chalk/${name}.css`
          },
        },
      ],
    }),
  ]
})
