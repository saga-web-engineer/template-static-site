import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('@rspack/core').Configuration} */
export default defineConfig((env, argv) => {
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

    plugins: [
      new rspack.CopyRspackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "src/img/"),
            to: path.resolve(__dirname, "dist/assets/img/"),
          },
          {
            from: path.resolve(__dirname, "public/"),
            to: path.resolve(__dirname, "dist/"),
          },
        ],
      }),
    ],

    optimization: {
      minimizer: isProduction
        ? [
            new rspack.SwcJsMinimizerRspackPlugin({
              // パッケージのライセンス情報をjsファイルの中に含めない
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
      open: true,
    },
  };
});
