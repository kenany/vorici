module.exports = {
  extends: ['@kenan', 'plugin:react/recommended'],
  plugins: ['react'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    'import/parsers': {
      espree: ['.js']
    }
  }
};
