var Imagemin = require('imagemin')
var ImageminPngquant = require('imagemin-pngquant')
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
  var optimizationLevel = options.optimizationLevel || 2

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
  if (options.pngquant) {
    imagemin.use(ImageminPngquant(assign({
    }, options.pngquant)))
  }

  var callback = this.async()
  imagemin.run(function (err, files) {
    if (callback) {
      callback(err, files && files[0] && files[0].contents)
      callback = null
    }
  })
}

module.exports.raw = true
