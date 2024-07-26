module.exports = {
  // do not look at parent folders for more config files
  root: true,

  // set browser to true so ESLint understands browser-specific
  // globals like `document` and `window`
  env: { node: true, es2020: true },

  // specify the ECMAScript version to use
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },

  // extend from recommend configs, including prettier
  extends: ['eslint:recommended', 'prettier'],

  // ignore specific folders and files
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  reportUnusedDisableDirectives: true,
}
