/** @type {import('tailwindcss').Config} */

module.exports = {
    prefix: 'twctw-',
    darkMode: 'class',
    content: [
        './src/pages/**/*.html',
        './src/pages/**/*.hbs',
        './src/components/**/*.html',
        './src/components/**/*.hbs',
        './src/components/**/*.jsx',
        './src/common/**/*.html',
        './src/common/**/*.hbs',
        './src/common/**/*.jsx',
        './src/components/**/*.args.js',
        './src/js/**/*.jsx',
    ],

    theme: {
        extend: {
            typography: {
                DEFAULT: {
                    css: {
                        maxWidth: '100%',
                    },
                },
            },
        },
        fontFamily: {
            body: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
            sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
        },
    },
    plugins: [],
};
