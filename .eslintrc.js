module.exports = {
  root: true,

  parser: '@typescript-eslint/parser',

  plugins: ['@typescript-eslint'],

  env: {
    browser: true,
    es2022: true,
    node: true,
    jest: true,
  },

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],

  rules: {
    'no-console': 'error',
    'dot-notation': 'error',
    eqeqeq: 'error',
    'no-new-func': 'error',
    semi: ['error', 'always'],
    camelcase: ['error', { properties: 'never' }],
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-exponentiation-operator': 'warn',
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
      },
    ],
  },

  ignorePatterns: ['dist', 'copyfile.mjs'],
};
