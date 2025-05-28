const path = require("node:path");
const { rspack } = require("@rspack/core");

/** @type {import('@rspack/core').Configuration} */
module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    mode: isProduction ? "production" : "development",

    // ソースマップの設定
    devtool: isProduction ? false : "source-map",

    // エントリーファイル
    entry: {
      index: "./src/ts/index.ts",
    },

    output: {
      // 出力ディレクトリ
      path: path.resolve(__dirname, "dist/assets/js"),
      // 出力ファイル
      filename: "bundle.js",
      clean: true,
    },

    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: {
            loader: "builtin:swc-loader",
            options: {
              jsc: {
                parser: {
                  syntax: "typescript",
                },
                transform: {},
              },
            },
          },
          type: "javascript/auto",
        },
      ],
    },
    // パッケージのライセンス情報をjsファイルの中に含めない
    optimization: {
      minimizer: isProduction
        ? [
            new rspack.SwcJsMinimizerRspackPlugin({
              extractComments: false,
            }),
          ]
        : [],
    },
    resolve: {
      extensions: [".ts", ".js", ".json"],
    },
    // 開発用設定
    devServer: {
      hot: !isProduction,
      static: {
        directory: path.join(__dirname, "dist"),
      },
      devMiddleware: {
        // ファイルをディスクに書き出す
        writeToDisk: true,
      },
    },
  };
};
