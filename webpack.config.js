const path = require("path");

module.exports = {
	mode: 'production',
  output: {
    path: path.resolve(__dirname, "dist"),
		filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.js/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  }
};
