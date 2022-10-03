const path = require("path");
const fs = require("fs");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const buffer = require("buffer");
const rhTransformer = require("react-hot-ts/lib/transformer");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const entryList = JSON.parse(
  fs.readFileSync("./entries.json", { encoding: "utf-8" })
);

let entries = entryList.reduce((p, value) => {
  let matches = value.match(/mf[0-9]+/);
  console.log(matches);
  return Object.assign(p, {
    [matches[0]]: {
      import: [path.join(__dirname, value.replace("./", ""), "index.tsx")],
      dependOn: "engine",
    },
  });
}, {});

console.log("entries", entries);

module.exports = {
  entry: {
    ...entries,
    mf4: {
      import: [
        path.join(__dirname, "mf/mf4/dist/app/main.js"),
        path.join(__dirname, "mf/mf4/dist/app/polyfills.js"),
        path.join(__dirname, "mf/mf4/dist/app/runtime.js"),
      ],
      dependOn: "engine",
    },
    engine: [
      path.join(__dirname, "ClientHandler.ts"),
      path.join(__dirname, "Engine.ts"),
      path.join(__dirname, "External.ts"),
    ],
  },
  experiments: {
    topLevelAwait: true,
  },
  target: "web",

  output: {
    path: path.resolve(__dirname, "./build/js"),
    publicPath: "/",
    filename: "[name].js",
    chunkFilename: "chunks/[name]-[hash].js",
    clean: true,
  },
  resolve: {
    plugins: [
      new TsconfigPathsPlugin({
        /* options: see below */
      }),
    ],
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx", ".css", ".scss"],
    symlinks: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              babelrc: false,
            },
          },
          {
            loader: "ts-loader",
            options: {
              // enable TS transformation
              getCustomTransformers: {
                before: [rhTransformer()],
              },
            },
          },
        ],
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
        exclude: "/node_modules/",
      },
      {
        test: /\.(vtt|woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
              name: "[name].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          { loader: "css-modules-typescript-loader" },
          "css-loader",
          {
            loader: "sass-loader",
          },
        ],
      },

      {
        test: /\.(png|jpe?g|gif|pdf|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "images/[name].[ext]",
              esModule: false,
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
    new MiniCssExtractPlugin({
      filename: "../css/[name].css",
      chunkFilename: "../css/[id].css",
    }),
    new HtmlWebpackPlugin({
      filename: "/build/index.html",
      template: "composedTemplate.html",
      inject: "body",
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
