import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://esaylead-backend-production.up.railway.app", // Use env variable for flexibility
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: "dist", // The folder that will be deployed to Netlify
  },
});
