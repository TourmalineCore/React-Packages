import { DEFAULT_EXTENSIONS } from '@babel/core';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import postcssUrl from 'postcss-url';
import resolve from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';
import svgr from '@svgr/rollup';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.js',
  output: [
    {
      dir: 'es',
      format: 'es',
      sourcemap: false,
      preserveModules: true,
      preserveModulesRoot: 'src',
    },
  ],
  plugins: [
    postcss({
      plugins: [
        autoprefixer,
        postcssUrl({
          url: 'inline',
        }),
      ],
      extract: true,
      minimize: true,
      sourceMap: false,
    }),
    external({
      includeDependencies: true,
    }),
    babel({
      presets: [
        '@babel/preset-env',
        '@babel/preset-react',
      ],
      extensions: [
        ...DEFAULT_EXTENSIONS,
        '.js',
        '.jsx',
      ],
      plugins: [],
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
    }),
    url({
      destDir: 'es/assets/images',
    }),
    svgr(),
    resolve(),
    commonjs(),
    terser(),
  ],
};
