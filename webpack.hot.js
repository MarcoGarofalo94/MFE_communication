const webpack = require("webpack");
const path = require('path')
const { merge } = require("webpack-merge");
const dev = require("./webpack.common.js");
const dotenv = require('dotenv').config({path: __dirname + '/.env'});
module.exports = merge(dev, {
  devtool: "cheap-source-map",
  mode: "development",
  
  devServer: {
    disableHostCheck: true,
    https: true,
    contentBase: path.join(__dirname, "build"),
    open: true,
    openPage: `https://localhost:${3000}/`,
    compress: true,
    hot: true,
    writeToDisk: true,
    port: 3000,
    inline:true,
    /**
     * This makes sure the main entrypoint is written to disk so it is
     * loaded by Nextcloud though our existing addScript calls
     */

    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.HOT": true,
    }),
  ],
});
