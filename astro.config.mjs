import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://vijayksingh.github.io",
  base: process.env.GITHUB_PAGES === "true" ? "/DS-Notes" : "/",
  output: "static",
});
