var imagemin = require('imagemin')
var imageminGifsicle = require('imagemin-gifsicle')
var imageminJpegtran = require('imagemin-jpegtran')
var imageminOptipng = require('imagemin-optipng')
var imageminPngquant = require('imagemin-pngquant')
var imageminSvgo = require('imagemin-svgo')
var loaderUtils = require('loader-utils')
var assign = require('object-assign')

module.exports = function (content) {
  this.cacheable && this.cacheable()

  var options = loaderUtils.getLoaderConfig(this, 'imagemin')
  var minimize = ('minimize' in options) ? options.minimize : this.minimize
  if (!minimize) {
    return content
  }

  var progressive = options.progressive || false
  var optimizationLevel = options.optimizationLevel || 2

  var use = [
    imageminGifsicle(assign({
      interlaced: progressive
    }, options.gifsicle)),
    imageminJpegtran(assign({
      progressive: progressive
    }, options.jpegtran)),
    imageminOptipng(assign({
      optimizationLevel: optimizationLevel
    }, options.optipng)),
    imageminSvgo(assign({
    }, options.svgo))
  ]
  if (options.pngquant) {
    use.push(imageminPngquant(assign({
    }, options.pngquant)))
  }
  var callback = this.async()
  imagemin
    .buffer(content, { use: use })
    .then(function (buffer) {
      callback(null, buffer)
    })
    .catch(function (error) {
      callback(error)
    })
}

module.exports.raw = true
