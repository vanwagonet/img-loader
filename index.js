var Imagemin = require('imagemin')
var loaderUtils = require('loader-utils')

module.exports = function(content) {
  this.cacheable && this.cacheable()

  var query = loaderUtils.parseQuery(this.query)
	var minimize = ('minimize' in query.minimize) ? query.minimize : this.minimize
  if (!minimize) {
    return content
  }

  var progressive = query.progressive || false
  var optimizationLevel = query.optimizationLevel || 3

  var imagemin = new Imagemin()
    .src(content)
    .use(Imagemin.gifsicle({
      interlaced: progressive
    }))
    .use(Imagemin.jpegtran({
      progressive: progressive
    }))
    .use(Imagemin.optipng({
      optimizationLevel: optimizationLevel
    }))
    .use(Imagemin.svgo())

  var callback = this.async()
  imagemin.run(function(err, files) {
    callback(err, files[0].contents)
  })
}
module.exports.raw = true

