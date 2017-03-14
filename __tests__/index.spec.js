/* eslint-env mocha */
'use strict'

var assert = require('assert')
var loader = require('..')

describe('img-loader', () => {
  describe('svgo', () => {
    it('optimizes svg images by default', (done) => {
      var img = new Buffer('<svg><g><path d="M0 0" /></g></svg>', 'utf8')
      var context = {
        loader,
        async () {
          return (error, buffer) => {
            if (error) return done(error)
            assert.equal(buffer.toString(), '<svg/>')
            done()
          }
        }
      }
      context.loader(img)
    })

    it('passes content through when whole loader disabled', () => {
      var img = new Buffer('<svg></svg>', 'utf8')
      var context = {
        loader,
        query: { enabled: false },
        async () {
          assert.fail('should not call async')
        }
      }
      assert.equal(context.loader(img), img)
    })

    it('does not optimize when plugin disabled', (done) => {
      var img = new Buffer('<svg></svg>', 'utf8')
      var context = {
        loader,
        query: { svgo: false },
        async () {
          return (error, buffer) => {
            if (error) return done(error)
            assert.equal(buffer.toString(), '<svg></svg>')
            done()
          }
        }
      }
      context.loader(img)
    })
  })
})
