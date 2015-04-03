var Imagemin = require('imagemin')
var loaderUtils = require('loader-utils')
var assign = require('object-assign')

module.exports = function (content) {
  this.cacheable && this.cacheable()

  var options = assign({},
    this.options.imagemin,
    loaderUtils.parseQuery(this.query)
  )

  var minimize = ('minimize' in options) ? options.minimize : this.minimize
  if (!minimize) {
    return content
  }

  var progressive = options.progressive || false
  var optimizationLevel = options.optimizationLevel || 3

  var imagemin = new Imagemin()
    .src(content)
    .use(Imagemin.gifsicle(assign({
      interlaced: progressive
    }, options.gifsicle)))
    .use(Imagemin.jpegtran(assign({
      progressive: progressive
    }, options.jpegtran)))
    .use(Imagemin.optipng(assign({
      optimizationLevel: optimizationLevel
    }, options.optipng)))
    .use(Imagemin.svgo(assign({
    }, options.svgo)))

  var callback = this.async()
  imagemin.run(function (err, files) {
    callback(err, files[0].contents)
  })
}

module.exports.raw = true
