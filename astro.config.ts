import { defineConfig } from 'astro/config';
// import sitemap from '@astrojs/sitemap';
import sassPlugin from 'vite-plugin-sass-glob-import';

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  // integrations: [sitemap()],
  srcDir: './src',
  outDir: './dist',
  site: 'https://evoworx.co.jp/',
  server: { port: 2006, host: true, open: true },
  scopedStyleStrategy: 'where',
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
      assetsInlineLimit: 0,
      // cssCodeSplit: false,
      rollupOptions: {
        output: {
          entryFileNames: 'assets/js/main.js',
          // assetFileNames: 'assets/[ext]/[name].[ext]',
          assetFileNames: (assetInfo) => {
            // const { names } = assetInfo;
            // const name = names[0];
            // console.log(name);
            // return 'assets/common/[name].[ext]';
            const { name } = assetInfo;
            if (name?.match(/\.css$/)) {
              return 'assets/css/[name].[ext]';
            } else if (name?.match(/\.(jpg|jpeg|png|gif|svg|ico|webp|avif)$/)) {
              return 'assets/img/[name].[ext]';
            } else if (name?.match(/\.(mp4|webm|mov|)$/)) {
              return 'assets/video/[name].[ext]';
            } else if (name?.match(/\.(woff|woff2|eot|ttf|otf)$/)) {
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
