import {defineConfig, loadEnv} from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import {viteMockServe} from 'vite-plugin-mock';

import {resolve} from 'path';


// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
  const env = loadEnv( mode, __dirname );
  console.log(env);
  if (command === 'serve') {
    // product config
  }
  return {
    plugins: [
      vue(),
      vueJsx(),
      viteMockServe( {
        mockPath: './src/mock',
        supportTs: true, // 如果使用 js发开，则需要配置 supportTs 为 false
      } ),
    ],
    css: {
      // css预处理器
      preprocessorOptions: {
        less: {
          charset: false,
          // additionalData: '@import "./src/assets/style/global.less";',
        },
      },
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_APP_BASEURL, // 所要代理的目标地址
          rewrite: (path) => path.replace( /^\/api/, '' ),
          // 重写传过来的path路径，比如 `/api/index/1?id=10&name=zs`（注意:path路径最前面有斜杠（/）
          // ，因此，正则匹配的时候不要忘了是斜杠（/）开头的；选项的 key 也是斜杠（/）开头的）
          changeOrigin: true,
          // true/false, Default: false - changes the origin of the host header to the target URL
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve( __dirname, 'src' ), // 路径别名
        'components': resolve( __dirname, 'src/components' ),
        'views': resolve( __dirname, 'src/views' ),
        'assets': resolve( __dirname, 'src/assets' ),
      },
      extensions: [
        '.js', '.json', '.ts', '.jsx', '.tsx',
      ], // 使用路径别名时想要省略的后缀名，可以自己 增减
    },
  };
} );

