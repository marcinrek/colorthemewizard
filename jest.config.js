const path = require('path');

module.exports = {
    testEnvironment: 'jsdom',
    testMatch: ['**/*.spec.js'],
    moduleDirectories: ['node_modules', path.join(__dirname, 'src/components'), path.join(__dirname, 'src/common'), './src'],
    moduleNameMapper: {
        '\\.(s?css|less)$': 'identity-obj-proxy',
        '^.+\\.svg$': '<rootDir>/config//jest/svgTransform.js',
    },
};
