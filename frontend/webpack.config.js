module.exports = {
  watch: true,
  resolve: {
    extensions: [".js", ".jsx"],
  },
  entry: ["@babel/polyfill", "./src/index.js"],
  output: {
    path: "./static/frontend",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
