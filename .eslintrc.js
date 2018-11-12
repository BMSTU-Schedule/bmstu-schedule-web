module.exports = {
  globals: {
    server: true,
  },
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  extends: ['eslint:recommended', 'google'],
  env: {
    browser: true,
  },
  rules: {
    'require-jsdoc': 0,
    'max-len': [
      1, {
        code: 120,
      },
    ],
  },
};
