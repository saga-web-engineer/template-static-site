import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('@rspack/core').Configuration} */
export default defineConfig((_env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    mode: isProduction ? "production" : "development",

    // ソースマップの設定
    devtool: isProduction ? false : "source-map",

    // エントリーファイル
    entry: {
      index: ["./src/ts/index.ts", "./src/scss/style.scss"],
    },

    output: {
      // 出力ディレクトリ
      path: path.resolve(__dirname, "dist/assets"),
      // 出力ファイル
      filename: "js/bundle.js",
      cssFilename: "css/style.css",
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
        {
          test: /\.scss$/,
          use: [
            {
              loader: "builtin:lightningcss-loader",
            },
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: ["autoprefixer", "postcss-sort-media-queries"],
                },
              },
            },
            "sass-loader",
          ],
          type: "css/auto",
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

    // TODO:v2でデフォルト有効化になるため削除する
    experiments: {
      css: true,
    },

    optimization: {
      minimizer: isProduction
        ? [
            new rspack.SwcJsMinimizerRspackPlugin({
              // extractComments: true,
            }),
            new rspack.LightningCssMinimizerRspackPlugin(),
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
