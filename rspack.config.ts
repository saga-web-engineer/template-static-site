import type { Compiler } from '@rspack/core';
import { rspack } from '@rspack/core';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const req = createRequire(import.meta.url);

const pagesDir = path.resolve(__dirname, 'src/pages');
const pages = fs
  .readdirSync(pagesDir, { recursive: true, encoding: 'utf-8' })
  .filter((f) => path.basename(f) === 'index.tsx')
  .map((f) => {
    const entry = f.replace(/\\/g, '/').replace(/\.tsx$/, '');
    return { entry, output: `${entry}.html` };
  });

class KitaHtmlPlugin {
  apply(compiler: Compiler) {
    compiler.hooks.emit.tapAsync('KitaHtmlPlugin', (compilation, callback) => {
      if (compilation.errors.length > 0) {
        callback();
        return;
      }

      for (const { entry, output } of pages) {
        const assetName = `${entry}.cjs`;
        const asset = compilation.getAsset(assetName);
        if (!asset) continue;

        const raw = asset.source.source();
        const code = Buffer.isBuffer(raw) ? raw.toString('utf-8') : raw;

        const moduleObj: { exports: Record<string, unknown> } = { exports: {} };
        new Function('module', 'exports', 'require', '__dirname', '__filename', code)(
          moduleObj,
          moduleObj.exports,
          req,
          compiler.outputPath,
          path.join(compiler.outputPath, assetName),
        );

        const Page = moduleObj.exports['default'] as () => string;
        const html = `<!DOCTYPE html>${Page()}`;
        const outputPath = path.resolve(__dirname, 'dist', output);
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        fs.writeFileSync(outputPath, html, 'utf-8');

        compilation.deleteAsset(assetName);
      }

      callback();
    });
  }
}

export default (_env: unknown, argv: { mode?: string }) => {
  const isProduction = argv.mode === 'production';

  const webConfig = {
    name: 'web',
    mode: isProduction ? ('production' as const) : ('development' as const),
    devtool: isProduction ? false : ('source-map' as const),
    entry: {
      index: ['./src/scripts/index.ts', './src/styles/style.scss'],
    },
    output: {
      path: path.resolve(__dirname, 'dist/assets'),
      filename: 'js/bundle.js',
      cssFilename: 'css/style.css',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: {
            loader: 'builtin:swc-loader',
            options: {
              jsc: {
                parser: { syntax: 'typescript' },
                transform: {},
              },
            },
          },
          type: 'javascript/auto',
        },
        {
          test: /\.scss$/,
          use: [
            { loader: 'builtin:lightningcss-loader' },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: ['autoprefixer', 'postcss-sort-media-queries'],
                },
              },
            },
            { loader: 'sass-loader', options: { api: 'modern-compiler' } },
          ],
          type: 'css/auto',
        },
      ],
    },
    plugins: [
      new rspack.CopyRspackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'src/img/'),
            to: path.resolve(__dirname, 'dist/assets/img/'),
          },
          {
            from: path.resolve(__dirname, 'public/'),
            to: path.resolve(__dirname, 'dist/'),
          },
        ],
      }),
    ],
    optimization: {
      minimizer: isProduction
        ? [new rspack.SwcJsMinimizerRspackPlugin(), new rspack.LightningCssMinimizerRspackPlugin()]
        : [],
    },
    resolve: {
      extensions: ['.ts', '.js', '.json'],
      alias: { '@': path.resolve(__dirname, 'src/scripts') },
    },
    devServer: {
      hot: !isProduction,
      static: { directory: path.join(__dirname, 'dist') },
      devMiddleware: { writeToDisk: true },
      open: true,
    },
  };

  const ssrConfig = {
    name: 'ssr',
    mode: isProduction ? ('production' as const) : ('development' as const),
    target: 'node' as const,
    entry: Object.fromEntries(pages.map(({ entry }) => [entry, `./src/pages/${entry}.tsx`])),
    output: {
      path: path.resolve(__dirname, '.ssr'),
      filename: '[name].cjs',
      library: { type: 'commonjs2' },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'builtin:swc-loader',
            options: {
              jsc: {
                parser: { syntax: 'typescript', tsx: true },
                transform: {
                  react: {
                    runtime: 'automatic',
                    importSource: '@kitajs/html',
                  },
                },
              },
            },
          },
          type: 'javascript/auto',
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.json'],
    },
    plugins: [new KitaHtmlPlugin()],
  };

  return [webConfig, ssrConfig];
};
