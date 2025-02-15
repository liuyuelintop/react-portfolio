import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

export default defineConfig({
  plugins: [react()],
});
