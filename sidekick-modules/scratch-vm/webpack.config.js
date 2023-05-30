const CopyWebpackPlugin = require("copy-webpack-plugin");
const defaultsDeep = require("lodash.defaultsdeep");
const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const base = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  devServer: {
    contentBase: false,
    host: "0.0.0.0",
    port: process.env.PORT || 8073,
  },
  devtool: "cheap-module-source-map",
  output: {
    library: "VirtualMachine",
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: path.resolve(__dirname, "src"),
        query: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  browsers: ["last 3 versions", "Safari >= 8", "iOS >= 8"],
                },
              },
            ],
          ],
        },
      },
      {
        test: /\.mp3$/,
        loader: "file-loader",
      },
    ],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        include: /\.min\.js$/,
      }),
    ],
  },
  plugins: [],
};

module.exports = [
  // Web-compatible
  // ??? "defaultsDeep" – wann, was, etc. ... ???
  // !!!
  defaultsDeep({}, base, {
    target: "web",
    entry: {
      // ??? UMSCHREIBEN ???
      // !!! TESTEN !!!
      // !!!
      "sidekick-vm": "./src/index.js",
      // ??? wofür, Unterschied zu "sidekick-vm" ???
      "sidekick-vm.min": "./src/index.js",
    },
    output: {
      // ??? "umd" ???
      // !!!
      libraryTarget: "umd",
      path: path.resolve("dist", "web"),
    },
    module: {
      rules: base.module.rules.concat([
        {
          // ??? "expose-loader" ???
          // !!!
          test: require.resolve("./src/index.js"),
          loader: "expose-loader?VirtualMachine",
        },
      ]),
    },
  }),
  // ??? "Node-compatible" – _ + Unterschied zu "Web-compatible", Grund, wann, woher ???
  // !!!
  // Node-compatible
  defaultsDeep({}, base, {
    target: "node",
    entry: {
      "sidekick-vm": "./src/index.js",
    },
    output: {
      libraryTarget: "commonjs2",
      path: path.resolve("dist", "node"),
    },
    externals: {
      // ???
      // !!!
      "decode-html": true,
      "format-message": true,
      htmlparser2: true,
      immutable: true,
      jszip: true,
      minilog: true,
      "scratch-parser": true,
      "socket.io-client": true,
      "text-encoding": true,
    },
  }),
  // Playground
  defaultsDeep({}, base, {
    target: "web",
    entry: {
      benchmark: "./src/playground/benchmark",
      "video-sensing-extension-debug":
        "./src/extensions/sidekick_video_sensing/debug",
    },
    output: {
      path: path.resolve(__dirname, "playground"),
      filename: "[name].js",
    },
    module: {
      rules: base.module.rules.concat([
        {
          test: require.resolve("./src/index.js"),
          loader: "expose-loader?VirtualMachine",
        },
        {
          test: require.resolve(
            "./src/extensions/sidekick_video_sensing/debug.js"
          ),
          loader: "expose-loader?SidekickVideoSensingDebug",
        },
        {
          test: require.resolve("stats.js/build/stats.min.js"),
          loader: "script-loader",
        },
        {
          test: require.resolve("sidekick-blocks/dist/vertical.js"),
          loader: "expose-loader?Blockly",
        },
        {
          test: require.resolve("scratch-audio/src/index.js"),
          loader: "expose-loader?AudioEngine",
        },
        {
          test: require.resolve("scratch-storage/src/index.js"),
          loader: "expose-loader?ScratchStorage",
        },
        {
          test: require.resolve("scratch-render/src/index.js"),
          loader: "expose-loader?ScratchRender",
        },
      ]),
    },
    performance: {
      hints: false,
    },
    plugins: base.plugins.concat([
      new CopyWebpackPlugin([
        {
          from: "node_modules/sidekick-blocks/media",
          to: "media",
        },
        {
          from: "node_modules/scratch-storage/dist/web",
        },
        {
          from: "node_modules/scratch-render/dist/web",
        },
        {
          from: "node_modules/scratch-svg-renderer/dist/web",
        },
        {
          from: "src/playground",
        },
      ]),
    ]),
  }),
];
