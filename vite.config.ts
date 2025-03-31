import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import fs from 'fs';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync('./intranet_cytech_net_co.key', 'utf-8'),  // 📌 Asegúrate de que sean archivos separados
      cert: fs.readFileSync('./intranet_cytech_net_co.pem', 'utf-8'),
    },
    host: 'localhost', // Asegura que el host sea accesible
    port: 5173,        // Puedes cambiar el puerto si lo deseas
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
