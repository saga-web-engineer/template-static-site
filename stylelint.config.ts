import type { Config } from 'stylelint';

export default {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recess-order',
  ],

  plugins: ['stylelint-order', 'stylelint-prettier'],

  ignoreFiles: [
    '**/node_modules/**',
    'dist/assets/css/*.css',
    'src/scss/tools/_variables.scss',
    'src/scss/utils/*.scss',
  ],

  rules: {
    'prettier/prettier': true,
    'order/properties-alphabetical-order': true,
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'selector-class-pattern': null,
    'declaration-block-no-redundant-longhand-properties': null,
    'keyframes-name-pattern': null,
  },
} satisfies Config;
