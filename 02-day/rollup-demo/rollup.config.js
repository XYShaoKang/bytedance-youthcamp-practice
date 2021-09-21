import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser' // 压缩
import resolve from '@rollup/plugin-node-resolve' // 解析 node_modules
import commonjs from '@rollup/plugin-commonjs' // 解析 commonjs

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
      plugins: [terser()],
    },
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: true,
    },
  ],
  plugins: [resolve(), commonjs(), json()],
  external: ['vue'],
}

export default config
