import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return defineConfig({
    base: `${env.VITE_CDN_ORIGIN}${env.VITE_STATIC_INDEX_PATH}/`,
    server: {
      watch: {
        usePolling: true,
        interval: 100,
      },
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@src": resolve(__dirname, "src"),
        "@asset": resolve(__dirname, "assets"),
      },
    },
  });
};
