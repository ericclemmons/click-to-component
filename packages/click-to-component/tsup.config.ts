import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  clean: !options.watch,
  // https://tsup.egoist.sh/#generate-declaration-file
  dts: true,
  // https://tsup.egoist.sh/#typescript--javascript
  entry: ["src/**/*.ts"],
  // https://tsup.egoist.sh/#bundle-formats
  format: ["cjs", "esm"],
  // https://tsup.egoist.sh/#metafile
  metafile: !!options.watch,
  // https://tsup.egoist.sh/#minify-output
  minify: !options.watch,
  // https://tsup.egoist.sh/#bundle-formats
  legacyOutput: true,
  // https://tsup.egoist.sh/#generate-sourcemap-file
  sourcemap: "inline",
}));
