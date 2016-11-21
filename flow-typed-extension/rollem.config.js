import flow from "rollup-plugin-flow";

const plugins = [flow()];

export default [
  {
    entry: "src/background.js",
    dest: "extension/dist/background.js",
    plugins,
  }, {
    entry: "src/popup.js",
    dest: "extension/dist/popup.js",
    plugins,
  },
];
