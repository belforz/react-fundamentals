const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");
const { SourceMap } = require("module");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { presets } = require("./babel.config");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  return {
    entry: "./src/index.jsx", // Arquivo de entrada
    output: {
      path: path.resolve(__dirname, "dist"), // Caminho para a saída
      filename: "bundle.js", // Arquivo gerado
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/, // Testar arquivos JS e JSX
          exclude: /node_modules/,
          use: {
            loader: "babel-loader", // Transpilar código JS/JSX com Babel,
            options:{
              presets:["@babel/preset-env","@babel/preset-react"],
              plugins:[
                !isProduction && require.resolve("react-refresh/babel"), // Adiciona react refresh em dev server

              ].filter(Boolean), //Remove valores falsos
            }
          },
        },
        {
          test: /\.css$/,
          // Aplica as regras para arquivos .css
          use: [
            "style-loader",
            // Adiciona CSS ao DOM injetando <style>
            "css-loader",
            // Interpreta @import e url()
          
          ],
        },{
          test: /\.(scss|sass)$/,
          // Aplica as regras para arquivos .scss
          use: [
            "style-loader",
            // Adiciona CSS ao DOM injetando <style>
            "css-loader",
            ""
            // Interpreta @import e url()
          
          ],
        }
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"], // Resolver extensões JS e JSX
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        filename: "index.html",
      }),
      new DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(argv.mode), // Corrigido com vírgula
      }),
      ...(isProduction ? [] :[new ReactRefreshWebpackPlugin]),
    ],
    devtool: isProduction ? SourceMap : "eval-cheap-module-source-map", // source maps para identificações de erro
    devServer: {
      static: {
        directory: path.join(__dirname, "dist"),
      },
      compress: true,
      port: 5500,
      open: true,
      hot: true,
    },
    optimization: {
      minimize: isProduction,
    },
    mode: isProduction ? "production" : "development", // alterna entre modos
  };
};
