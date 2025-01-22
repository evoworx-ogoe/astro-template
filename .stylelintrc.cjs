/** @type {import('stylelint').Config} */
const config = {
  ignoreFiles: ['node_modules/**/*', 'dist/**/*', 'public/**/*', '**/_reset.scss'],
  plugins: ['stylelint-scss', 'stylelint-prettier'],
  extends: ['stylelint-config-standard-scss', 'stylelint-config-html/astro', 'stylelint-config-recess-order'],
  overrides: [
    {
      files: ['src/**/*.css', 'src/**/*.scss', 'public/assets/css/**/*.css'],
      customSyntax: 'postcss-scss',
    },
  ],
  rules: {
    'prettier/prettier': true,
    'selector-id-pattern': null,
    'selector-class-pattern': null,
    'selector-no-vendor-prefix': null,
    'keyframes-name-pattern': null,
    'scss/dollar-variable-pattern': null,
    'scss/percent-placeholder-pattern': null,
    'scss/at-mixin-pattern': null,
    'scss/at-rule-no-unknown': true,
    'at-rule-no-unknown': null,
    'at-rule-no-vendor-prefix': null,
    'media-feature-name-no-vendor-prefix': null,
    'property-no-vendor-prefix': null,
    'value-no-vendor-prefix': true,
    'no-duplicate-selectors': true,
    'font-weight-notation': 'numeric',
    'number-max-precision': 2,
    'order/properties-alphabetical-order': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
  },
};

module.exports = config;
