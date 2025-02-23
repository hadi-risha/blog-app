import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    port: 4000,
    proxy: {
      "/api": {
        target: "http://localhost:7000",
        changeOrigin: true, // Helps with CORS issues
        secure: false, // Allows HTTP connections
      },
    },
  },
//   build: {
//     rollupOptions: {
//       external: [
//         "react",
//         "react-dom",
//         "tailwindcss",
//         "vite",
//         "@vitejs/plugin-react",
//         "react-router-dom",
//         "@tailwindcss/vite",
//       ],
//     },
//   },
});
