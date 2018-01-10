import babel from 'rollup-plugin-babel'
import builtins from 'rollup-plugin-node-builtins'
import commonjs from 'rollup-plugin-commonjs'
import gas from 'rollup-plugin-gas'
import minify from 'rollup-plugin-babel-minify'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.gs',
    format: 'iife'
  },
  plugins: [
    babel(),
    builtins(),
    resolve(),
    commonjs(),
    gas(),
    minify({ comments: false })
  ]
}
