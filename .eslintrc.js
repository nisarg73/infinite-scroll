module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    semi: 1,
    'comma-dangle': 0,
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/react-in-jsx-scope': 0,
    'no-console': 0,
    'object-curly-newline': 0,
    'no-unused-vars': 0,
    'function-paren-newline': 0,
  },
};
