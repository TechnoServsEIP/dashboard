module.exports = {
  root: true,

  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
  },

  env: {
    browser: true,
  },

  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['plugin:vue/essential', 'plugin:prettier/recommended'],

  // required to lint *.vue files
  plugins: ['vue', 'prettier'],

  globals: {
    ga: true, // Google Analytics
    cordova: true,
    __statics: true,
    process: true,
    Capacitor: true,
  },

  // add your custom rules here
  rules: {
    'prefer-promise-reject-errors': 'off',
    'no-console': 'off',
    // allow console.log during development only
    // 'no-console': process.env.NODE_ENV === 'production' ? 'warning' : 'off',
    // allow debugger during development only
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
}
