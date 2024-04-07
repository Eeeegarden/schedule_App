module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true
  },
  extends: [
    'plugin:vue/essential',
    'standard',
    'prettier'
  ],
	plugins: ['vue', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
          useTabs: false,
      },
    ],
    'generator-star-spacing': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prettier/prettier': ['error', { printWidth: 120 }],
  }
}