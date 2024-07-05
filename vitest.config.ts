import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, ""), // Adjust 'src' to your actual source directory
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./vitest.setup.js",
  },
});
