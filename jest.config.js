/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    modulePathIgnorePatterns: [
        '<rootDir>/classes/',
    ],
    coveragePathIgnorePatterns: [
        '<rootDir>/server/main.ts',
        '<rootDir>/server/db/Interface.ts',
    ],
    collectCoverageFrom: [
        '<rootDir>/server/**',
    ],
};
