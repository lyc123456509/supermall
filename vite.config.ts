import { createVitePlugins } from './config/vite/plugins';
import { resolve } from 'path';
import { ConfigEnv, UserConfigExport } from 'vite';

const pathResolve = (dir: string) => {
  return resolve(process.cwd(), '.', dir);
};

// https://vitejs.dev/config/
export default function ({ mode }: ConfigEnv): UserConfigExport {
  const root = process.cwd();
  return {
    root,
    resolve: {
      alias: [
        // /@/xxxx => src/xxxx
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/',
        },
        {
          find: /@\//,
          replacement: pathResolve('src') + '/',
        },
        // /#/xxxx => types/xxxx
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/',
        },
        {
          find: /\/~\//,
          replacement: __dirname + '/',
        },
      ],
    },
    server: {
      host: true,
      port: 80,
      hmr: true,
      proxy: {
        // 代理配置
        '/weChat': 'http://47.109.55.12',
        '/wxa': 'https://api.weixin.qq.com',
        '/bid': 'https://adx.tuia.cn',
      },
    },
    plugins: createVitePlugins(mode),
    base: './',
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          //生产环境时移除console
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 配置 nutui 全局 scss 变量
          additionalData: `@import "@nutui/nutui/dist/styles/variables.scss";@import '/@/styles/mixin.scss';`,
        },
      },
    },
  };
}
