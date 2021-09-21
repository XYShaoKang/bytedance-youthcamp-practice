class HtmlPlugin {
  apply(compiler) {
    console.log('html - plugin')

    compiler.hooks.emit.tapAsync('htmlplugin', (compilation, callback) => {
      console.log('emit')
      console.log(compilation.assets)
      compilation.assets['test.md'] = {
        source: function () {
          return '## test'
        },
        size: function () {
          return 7
        },
      }
      callback()
    })
  }
}

module.exports = HtmlPlugin
