import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
    },
    build: {
        outDir: 'build',
        assetsInlineLimit: 100 * 1024,
        chunkSizeWarningLimit: 1500,
        rollupOptions: {
            output: {
                format: 'iife',
                inlineDynamicImports: true,
                entryFileNames: 'emails_api_v1.js',
            },
        },
    },
    test: {
        environment: 'jsdom',
    },
});
