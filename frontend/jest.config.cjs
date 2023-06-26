module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jest-environment-jsdom',
	testMatch: ['**/__tests__/**/*.test.ts(x)'],
	moduleNameMapper: {
		'\\.(css|less)$': '<rootDir>/styleMocks.js',
	},
};
