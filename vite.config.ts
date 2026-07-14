import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "./" => caminhos relativos, funciona no GitHub Pages em qualquer sub-path
export default defineConfig({
  base: "./",
  plugins: [react()],
});
