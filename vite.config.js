import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.js"],
            refresh: true,
        }),
        tailwindcss(),
    ],
    server: {
        host: "localhost",
        port: 5173,
        proxy: {
            "^/(?!build|@vite|resources|node_modules).*": {
                target: "http://localhost:8000",
                changeOrigin: true,
                secure: false,
            },
        },
    },
    
});
