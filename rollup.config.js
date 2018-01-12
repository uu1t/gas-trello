import babel from 'rollup-plugin-babel'
import builtins from 'rollup-plugin-node-builtins'
import commonjs from 'rollup-plugin-commonjs'
import prettier from 'rollup-plugin-prettier'
import resolve from 'rollup-plugin-node-resolve'

const config = name => ({
  input: `src/${name}.js`,
  output: {
    name,
    file: `dist/${name}.gs`,
    format: 'iife'
  },
  plugins: [
    babel(),
    builtins(),
    resolve(),
    commonjs(),
    prettier({
      singleQuote: true
    })
  ]
})

export default [
  config('Http')
]
