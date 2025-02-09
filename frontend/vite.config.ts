import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    server: {
        host: '0.0.0.0', // Это позволяет слушать все интерфейсы, включая внешний доступ
        port: 5173,
    },
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
})
