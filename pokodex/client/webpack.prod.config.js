const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    app: ["babel-polyfill", path.join(__dirname, "index.js")],
  },
  output: {
    path: path.join(__dirname, "build"),
    chunkFilename: "[name].[chunkhash].js",
    filename: "[name].[chunkhash].js",
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use: ExtractTextPlugin.extract({
          allChunks: true,
          fallback: "style-loader",
          use: [{loader: "css-loader",
                  options: {
                    minimize: true
                  }
                },
                {loader: "postcss-loader",
                  options: {
                    plugins: () => [require("autoprefixer")()],
                  },
                },
                {loader: "sass-loader"}
          ]
        }),
      },
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader"}
      },
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin("process.env.NODE_ENV", JSON.stringify('production')),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: ({ resource }) => /node_modules/.test(resource),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      minChunks: Infinity,
    }),
    new ExtractTextPlugin("styles.css"),
    new UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public/index.html"),
      inject: "body",
      favicon: path.join(__dirname, "public/favicon.ico")
    }),
  ],
};
