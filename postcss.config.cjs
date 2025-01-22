/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [require('autoprefixer')({ cascade: false })],
};

module.exports = config;
