import babel from 'rollup-plugin-babel'
import gas from 'rollup-plugin-gas'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.gs',
    format: 'iife'
  },
  plugins: [
    babel(),
    gas()
  ]
}
