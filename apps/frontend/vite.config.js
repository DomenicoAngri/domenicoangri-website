import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        // alias: {
        //     "@config": path.resolve(__dirname, "./src/config"),
        //     "@components": path.resolve(__dirname, "./src/components"),
        //     "@redux": path.resolve(__dirname, "./src/redux"),
        //     "@assets": path.resolve(__dirname, "./src/assets"),
        // },
        alias: [{ find: "@components", replacement: path.resolve(__dirname, "src/components") }],
    },
    build: {
        rollupOptions: {
            output: {
                entryFileNames: "assets/[name]-[hash].js",
                chunkFileNames: "assets/[name]-[hash].js",
                assetFileNames: "assets/[name]-[hash].[ext]",
            },
        },
    },
});
