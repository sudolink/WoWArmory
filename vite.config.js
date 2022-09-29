import * as dotenv from "dotenv";
dotenv.config()
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  //base: process.env.VITE_BACKEND_URL,
  plugins: [react()],
  server: {
    proxy: {
      "/api": process.env.VITE_BACKEND_URL,
    }
  }
})
