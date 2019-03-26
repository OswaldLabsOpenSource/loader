import typescript from "rollup-plugin-typescript";
import { uglify } from "rollup-plugin-uglify";

export default {
  input: "./loader.ts",
  output: {
    format: "iife",
    file: "dist/loader.js"
  },
  plugins: [typescript(), uglify()]
};
