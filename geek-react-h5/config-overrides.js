const {
  override,
  fixBabelImports,
  addWebpackAlias,
  addPostcssPlugins
} = require('customize-cra')
const px2viewport = require('postcss-px-to-viewport')
const path = require('path')

const babelPlugin = fixBabelImports('import', {
  libraryName: 'antd-mobile',
  style: 'css',
})

const alias = addWebpackAlias({
  '@': path.join(__dirname, 'src'),
  '@scss': path.join(__dirname, 'src/assets/styles'),
})

const postcssPlugins = addPostcssPlugins([
  px2viewport({
    viewportWidth: 375,
  }),
])

module.exports = override( babelPlugin, alias, postcssPlugins )