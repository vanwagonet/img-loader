'use strict'

var assert = require('assert')
var loader = require('..')

describe('img-loader', function () {
  it('passes content through unmodified without minimize option', function () {
    var img = new Buffer('<svg></svg>', 'utf8')
    var context = { loader: loader, options: {} }
    context.async = function () {
      assert.fail('should not call async')
    }
    var buffer = context.loader(img)
    assert.equal(buffer, img)
  })

  it('optimizes svg images', function (done) {
    var img = new Buffer('<svg><g><path d="M0 0" /></g></svg>', 'utf8')
    var context = { loader: loader, options: {}, minimize: true }
    context.async = function () {
      return function (error, buffer) {
        if (error) return done(error)
        assert.equal(buffer.toString(), '<svg/>')
        done()
      }
    }
    context.loader(img)
  })
})
