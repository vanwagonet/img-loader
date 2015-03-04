# img-loader

Image minimizing loader for webpack, meant to be used with [url-loader](https://github.com/webpack/url-loader) or [file-loader](https://github.com/webpack/file-loader)

> Minify PNG, JPEG, GIF and SVG images with [imagemin](https://github.com/kevva/imagemin)

*Issues with the minimized output should be reported [to imagemin](https://github.com/kevva/imagemin/issues).*


## Install

```sh
$ npm install img-loader --save-dev
```


## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

``` javascript
var url = require('file!img!./file.png');
```

By default the minification is run when webpack is run in production mode

Options

* `[minimize]` - Minify regardless of webpack mode.
* `[optimizationLevel]` Select an optipng optimization level between `0` and `7`.
* `[progressive]` Convert to jpg and gif to progressive.

Examples

``` javascript
require('img?optimizationLevel=5');
require('img?progressive=true');
require('img?minimize&optimizationLevel=5&progressive=true');
```

``` javascript
loaders: [
  { test: /\.(jpe?g|png|gif|svg)$/i, loaders: [ 'url?limit=10000', 'img?minimize' ] }
]
```

Imagemin comes bundled with the following optimizers:

- [gifsicle](https://github.com/kevva/imagemin-gifsicle) — *Compress GIF images*
- [jpegtran](https://github.com/kevva/imagemin-jpegtran) — *Compress JPEG images*
- [optipng](https://github.com/kevva/imagemin-optipng) — *Compress PNG images*
- [svgo](https://github.com/kevva/imagemin-svgo) — *Compress SVG images*

#### optimizationLevel *(png)*

Type: `number`  
Default: `3`

Select an optimization level between `0` and `7`.

> The optimization level 0 enables a set of optimization operations that require minimal effort. There will be no changes to image attributes like bit depth or color type, and no recompression of existing IDAT datastreams. The optimization level 1 enables a single IDAT compression trial. The trial chosen is what. OptiPNG thinks it’s probably the most effective. The optimization levels 2 and higher enable multiple IDAT compression trials; the higher the level, the more trials.

Level and trials:

1. 1 trial
2. 8 trials
3. 16 trials
4. 24 trials
5. 48 trials
6. 120 trials
7. 240 trials

#### progressive *(jpg, gif)*

Type: `boolean`  
Default: `false`

Enable jpegtran `progressive` lossless conversion to progressive.
Enable gifsicle `interlace` for progressive rendering.


## License

This software is free to use under the MIT license.
See the [LICENSE-MIT file](https://github.com/thetalecrafter/img-loader/blob/master/LICENSE-MIT) for license text and copyright information.

