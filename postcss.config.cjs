/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [
    require('autoprefixer')({ cascade: false }),
    require('postcss-combine-duplicated-selectors')(),
    require('postcss-sort-media-queries')(),
  ],
};

module.exports = config;
