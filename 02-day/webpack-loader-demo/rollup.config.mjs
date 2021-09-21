import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: 'index.js',
  output: [
    {
      file: 'lib/index.cjs.js',
      format: 'cjs',
      sourcemap: true,
    },
  ],
  plugins: [resolve(), commonjs()],
}

export default config
