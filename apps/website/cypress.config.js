import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: "https://www.barbers.hair/",
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
