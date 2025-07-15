import { defineConfig } from 'astro/config';
// import sitemap from '@astrojs/sitemap';
import sassPlugin from 'vite-plugin-sass-glob-import';

// https://astro.build/config
export default defineConfig({
  // integrations: [sitemap()],
  site: 'https://evoworx.co.jp/',
  scopedStyleStrategy: 'where',
  server: { port: 2006, host: true, open: true },
  build: {
    inlineStylesheets: 'never',
  },
  vite: {
    plugins: [sassPlugin()],
    resolve: {
      alias: {
        '@/*': 'src/*',
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "./src/styles/utils/variable/_index.scss" as var;
            @use "./src/styles/utils/function/_index.scss" as fn;
            @use "./src/styles/utils/mixin/_index.scss" as mixin;
          `,
        },
      },
    },
    build: {
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          entryFileNames: (chunkInfo) => {
            const { facadeModuleId } = chunkInfo;
            const match = facadeModuleId?.toLowerCase().match(/\/([^\/]+)\.astro/);
            const fileName = match && match[1] ? `${match[1]}` : 'violation';
            return `assets/js/${fileName}.js`;
          },
          assetFileNames: (assetInfo) => {
            const { names } = assetInfo;
            if (names[0].match(/\.css$/)) {
              return 'assets/css/[name].[ext]';
            } else if (names[0].match(/\.(jpg|jpeg|png|gif|svg|ico|webp|avif)$/)) {
              return 'assets/img/[name].[ext]';
            } else if (names[0].match(/\.(mp4|webm|mov|)$/)) {
              return 'assets/video/[name].[ext]';
            } else if (names[0].match(/\.(woff|woff2|eot|ttf|otf)$/)) {
              return 'assets/font/[name].[ext]';
            } else {
              return 'assets/common/[name].[ext]';
            }
          },
          // manualChunks: (id) => {
          //   if (id.includes('/src/styles/index.scss')) {
          //     return 'index.css';
          //   } else if (id.includes('/node_modules/@splidejs/splide/dist/css/splide-core.min.css')) {
          //     return 'splide-core.min.css';
          //   }
          // },
        },
      },
    },
  },
});
