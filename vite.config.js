import * as dotenv from "dotenv";
dotenv.config()
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path,  {resolve} from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  //base: process.env.VITE_BACKEND_URL,
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_PROD_ENV === "DEV" ? process.env.VITE_BACKEND_URL_DEV : process.env.VITE_BACKEND_URL,
        changeOrigin: true,
        secure: true
      },
    }
  },
  build: {
    //gen manifest.json in output dir
    base: "/WoWArmory/",
    //manifest: true,
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname,"index.html") 
    }
  }
})
