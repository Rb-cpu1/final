import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react({
      include: ["src/**/*.tsx", "src/**/*.ts"],
      exclude: ["node_modules"]
    }),
    tailwindcss(),
    viteSingleFile()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "",
    sourcemap: false,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          ui: ["framer-motion", "lucide-react"],
        },
      },
    },
  },
  base: process.env.NODE_ENV === 'production' ? '/portal-empreendedorismo/' : '/',
  preview: {
    port: 3000,
    host: true,
  },
  server: {
    port: 3000,
    host: true,
  },
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lucide-react'],
  },
  publicDir: 'public',
  clearScreen: false,
  logLevel: 'info',
  mode: 'production'
});
