export const swcOptions = {
  // Some options cannot be specified in .swcrc
  // Input files are treated as module by default.
  isModule: true,
  module: {
    type: "es6",
  },
  // All options below can be configured via .swcrc
  jsc: {
    parser: {
      syntax: "typescript",
      tsx: false,
    },
    target: "es2022",
    loose: false,
    minify: {
      compress: false,
      mangle: false,
    },
  },
} as const;
