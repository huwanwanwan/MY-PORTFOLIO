import { bindings, defineConfig, defineWorker } from "cf/config";

export default defineConfig({
  worker: defineWorker({
    name: "portfolio",
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-10-19",
    compatibilityFlags: ["nodejs_compat"],
    assets: {
      htmlHandling: "none",
      notFoundHandling: "none",
    },
    env: {
      ASSETS: bindings.assets(),
    },
  }),
});
