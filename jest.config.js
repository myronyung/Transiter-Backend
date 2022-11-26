module.exports = {
  preset: 'jest-dynalite',
  coveragePathIgnorePatterns: [
    '<rootDir>/src/util/.*',
    '<rootDir>/src/controller/.*',
    '<rootDir>/src/permission/.*',
    `<rootDir>/src/.*_ddb.js`,
    `<rootDir>/test/.*`,
  ],
};
