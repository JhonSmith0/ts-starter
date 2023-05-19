import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import swc from "@rollup/plugin-swc";
import tsConfigPaths from "rollup-plugin-tsconfig-paths";

export default {
  input: "src/index.ts",
  cache: true,
  output: {
    format: "commonjs",
    dir: "dist",
  },
  plugins: [
    // To resolve imports like import test from 'test' to import test from 'test.js"
    resolve({
      extensions: [".js", ".ts", ".json", ".node", ".mjs", ".cjs"],
    }),

    // fix an error when the node_modules are commonjs
    commonjs({
      include: ["./node_modules/**"],
      requireReturnsDefault: "auto",
    }),

    // Fix error when some modules try to import .json
    json(),

    // Configures swc
    swc({
      swc: {
        minify: true,
      },
    }),

    // Path mapping
    tsConfigPaths(),
  ],
};
