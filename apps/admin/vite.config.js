import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import macrosPlugin from 'vite-plugin-babel-macros';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 5175,
    },
    plugins: [
        react({
            babel: {
                plugins: ['babel-plugin-macros'],
                configFile: true,
            },
        }),
        macrosPlugin(),
        svgr(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@api': path.resolve(__dirname, 'src/api'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@hooks': path.resolve(__dirname, 'src/hooks'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@styles': path.resolve(__dirname, 'src/styles'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@queries': path.resolve(__dirname, 'src/queries'),
            '@contexts': path.resolve(__dirname, 'src/contexts'),
            '@public': path.resolve(__dirname, 'public'),
        },
    },
});
