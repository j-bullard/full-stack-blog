module.exports = {
  // do not look at parent folders for more config files
  root: true,

  // set browser to true so ESLint understands browser-specific
  // globals like `document` and `window`
  env: { browser: true, es2020: true, node: true },

  // specify the ECMAScript version to use
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },

  // extend from recommend configs, including prettier
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'prettier',
  ],

  // have the react plugin detect the version of React
  settings: { react: { version: 'detect' } },

  // ignore specific folders and files
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.js'],
  plugins: ['react-refresh'],
  reportUnusedDisableDirectives: true,
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
