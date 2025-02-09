export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}', // Учитываем все файлы с JS, TS, JSX и TSX
    ],
    theme: {
        extend: {
            boxShadow: {
                ['my-soft']: 'var(--soft-shadow)', // Используем CSS-переменную
            },
        },
    },
    plugins: [],
}
