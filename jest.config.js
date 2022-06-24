module.exports = {
  moduleFileExtensions: ['js', 'jsx'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.jsx$': 'babel-jest',
  },
  testRegex: '((\\.|/*.)(test|spec))\\.jsx?$',
};
