const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const rhTransformer = require("react-hot-ts/lib/transformer");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
  entry: {
    mf1: {
      import: [path.join(__dirname, "mf/mf1/src", "index.tsx")],
      dependOn: "handler",
    },
    mf2: {
      import: [path.join(__dirname, "mf/mf2/src", "index.tsx")],
      dependOn: "handler",
    },
    mf3: {
      import: [path.join(__dirname, "mf/mf3/src", "index.tsx")],
      dependOn: "handler",
    },
    handler: [path.join(__dirname, "ClientHandler.ts")],
  },
  experiments: {
    topLevelAwait: true,
  },
  target: "web",
  optimization: {
    usedExports: true,
    minimizer: [new TerserPlugin()],
  },
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
    symlinks: false,
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
    //new CleanWebpackPlugin({ verbose: true }),
    new MiniCssExtractPlugin({
      filename: "../css/[name].css",
      chunkFilename: "../css/[id].css",
    }),
    new HtmlWebpackPlugin({
      filename: "/build/index.html",
      template: "templates/index.html",
      inject: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
