import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  resolve: {
    alias: {
      assets: path.resolve(__dirname, "./src/assets/"),
      components: path.resolve(__dirname, "./src/components/"),
      pages: path.resolve(__dirname, "./src/pages/"),
      router: path.resolve(__dirname, "./src/router/"),
      services: path.resolve(__dirname, "./src/services/"),
      theme: path.resolve(__dirname, "./src/theme/"),
      types: path.resolve(__dirname, "./src/types/"),
    },
  },
});
