import { DEFAULT_EXTENSIONS } from '@babel/core';
import babel from '@rollup/plugin-babel';
import autoprefixer from 'autoprefixer';
import postcssUrl from 'postcss-url';
import url from '@rollup/plugin-url';
import svgr from '@svgr/rollup';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        dir: 'es',
        format: 'es',
        sourcemap: false,
        preserveModules: true,
        preserveModulesRoot: 'src',
        interop: 'auto',
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
          '@babel/preset-typescript',
        ],
        extensions: [
          ...DEFAULT_EXTENSIONS,
          '.js',
          '.jsx',
        ],
        plugins: [
          '@babel/plugin-proposal-class-properties',
        ],
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
      }),
      url({
        destDir: 'es/assets/images',
      }),
      svgr({
        typescript: true,
      }),
      external(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      terser(),
    ],
  },
]
