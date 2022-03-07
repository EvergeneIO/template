const path = require("path");

module.exports = {
  mode: "production", //development || production
  entry: {
    auth: "./src/auth.ts",
    main: "./src/main.ts",
    images: ["./src/assets/logo.png", "./src/assets/favicon.png"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [path.resolve(__dirname, "src")],
        use: "ts-loader",
        //outputPath: 'js'
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "images",
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  devtool: "eval-source-map",
  output: {
    publicPath: "public",
    filename: "js/[name].bundle.js",
    path: path.resolve(__dirname, "public"),
    clean: true,
  },
};

/* module.exports = {
  mode: "development", //development || production
  entry: {
    auth: "./src/auth.js",
    main: "./src/main.js",
    images: ["./src/assets/logo.png", "./src/assets/favicon.png"],
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "images",
        },
      },
    ],
  },
  resolve: {
    extensions: [".js"],
  },
  devtool: "eval-source-map",
  output: {
    publicPath: "public",
    filename: "js/[name].bundle.js",
    path: path.resolve(__dirname, "public"),
    clean: true,
  },
}; */
