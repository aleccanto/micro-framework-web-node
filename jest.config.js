module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  coverageReporters: ['text', 'html'],
  collectCoverageFrom: ['src/**/*.js'],
};
