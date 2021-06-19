module.exports = {
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    [
      "@babel/plugin-transform-runtime",
      {
        regenerator: true,
      },
    ],

    //"@babel/plugin-proposal-class-properties",
  ],
  presets: [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
};
