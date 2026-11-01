import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { cloudflare } from "@cloudflare/vite-plugin";

declare const process: {
  env?: Record<string, string | undefined>;
};

export default defineConfig({
  plugins: [
    react(),
    ...(process?.env?.VITE_NO_CLOUDFLARE ? [] : [cloudflare()]),
  ],
});
