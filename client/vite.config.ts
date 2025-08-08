import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components/index.ts"),
      "@hooks": path.resolve(__dirname, "src/hooks/index.ts"),
      "@layout": path.resolve(__dirname, "src/layout/index.ts"),
      "@pages": path.resolve(__dirname, "src/pages/index.ts"),
      "@providers": path.resolve(__dirname, "src/providers/index.ts"),
      "@routes": path.resolve(__dirname, "src/routes/index.tsx"),
      "@services": path.resolve(__dirname, "src/services/index.ts"),
      "@styles": path.resolve(__dirname, "src/styles/index.ts"),
      "@types": path.resolve(__dirname, "src/types/index.ts"),
      "@utils": path.resolve(__dirname, "src/utils/index.ts"),
    },
  },
  base: "/",
  build: {
    outDir: path.resolve(__dirname, "../public"),
    emptyOutDir: true,
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
      },
      "/system": {
        target: "http://localhost:3000",
      },
      "/ws": {
        target: "ws://localhost:3000/ws",
      },
    },
  },
});
