const webpack = require("webpack");
const { merge } = require("webpack-merge");
const dev = require("./webpack.common.js");

module.exports = merge(dev, {
  devtool: "cheap-source-map",
  devServer: {
    disableHostCheck: true,
    open: true,
    openPage: 'http://localhost:8083/apps/dashboard',
    compress: true,
    hot: true,
    writeToDisk: true,
    port: 3000,
    inline:true,
    overlay: true,
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
