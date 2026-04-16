import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// vite.config.ts
export default defineConfig({
  plugins: [react({ babel: { babelrc: true } })],
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
});
