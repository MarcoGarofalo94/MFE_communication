const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const TerserPlugin = require("terser-webpack-plugin");
module.exports = merge(common, {
  mode: "development",
  devtool: "none",
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            // We want terser to parse ecma 8 code. However, we don't want it
            // to apply minification steps that turns valid ecma 5 code
            // into invalid ecma 5 code. This is why the `compress` and `output`
            ecma: 8,
          },
          compress: {
            ecma: 5,

            inline: 2,
          },
          mangle: {
            // Find work around for Safari 10+
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
          },
        },

        // Use multi-process parallel running to improve the build speed
        parallel: true,

        // Enable file caching
        cache: true,
      }),
    ],
  },
});
