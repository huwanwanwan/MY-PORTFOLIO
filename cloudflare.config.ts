import { bindings, defineConfig, defineWorker } from "cf/config";

export default defineConfig({
  worker: defineWorker({
    name: "portfolio",
    entrypoint: "./worker.ts",
    compatibilityDate: "2026-10-19",
    compatibilityFlags: ["nodejs_compat"],
    assets: {
      htmlHandling: "none",
      notFoundHandling: "none",
    },
    env: {
      ASSETS: bindings.assets(),
      TURNSTILE_SECRET_KEY: bindings.secret(),
      EMAILJS_PRIVATE_KEY: bindings.secret(),
      CONTACT_RATE_LIMIT: bindings.rateLimit({ namespace: "1001", simple: { limit: 5, period: 60 } }),
      CONTACT_SEND_LIMIT: bindings.rateLimit({ namespace: "1002", simple: { limit: 2, period: 60 } }),
    },
  }),
});
