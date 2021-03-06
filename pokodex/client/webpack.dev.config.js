const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devServer: {
    historyApiFallback:true,
    stats: "errors-only",
    overlay: {
      errors: true,
      warnings: true,
    },
    proxy: {
      "/auth": {
        target: "https://localhost:3000",
        secure: false,
      }
    }
  },
  devtool:"cheap-module-eval-soure-map",
  entry: ["babel-polyfill",path.join(__dirname,'index.js')],
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js',
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },{
            loader: "css-loader"
          },{
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname,"/public/index.html"),
      inject:"body",
      favicon: path.join(__dirname, "/public/favicon.ico")
    }),
  ]
}
