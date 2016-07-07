# img-loader

Image minimizing loader for webpack, meant to be used with [url-loader](https://github.com/webpack/url-loader), [file-loader](https://github.com/webpack/file-loader), or [raw-loader](https://github.com/webpack/raw-loader)

> Minify PNG, JPEG, GIF and SVG images with [imagemin](https://github.com/imagemin/imagemin)

*Issues with the minimized output should be reported [to imagemin](https://github.com/imagemin/imagemin/issues).*

Comes with the following optimizers:

- [gifsicle](https://github.com/imagemin/imagemin-gifsicle) — *Compress GIF images*
- [jpegtran](https://github.com/imagemin/imagemin-jpegtran) — *Compress JPEG images*
- [optipng](https://github.com/imagemin/imagemin-optipng) — *Compress PNG images*
- [pngquant](https://github.com/imagemin/imagemin-pngquant) — *Compress PNG images*
- [svgo](https://github.com/imagemin/imagemin-svgo) — *Compress SVG images*


## Install

```sh
$ npm install img-loader --save-dev
```


## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

``` javascript
var url = require('file!img!./file.png');
```

By default the minification is run when webpack is run in production mode (or whenever the UglifyJsPlugin is used).

The default minification includes:

- `gifsicle` with `interlaced: false`
- `jpegtran` with `progressive: false`
- `optipng` with `optimizationLevel: 2`
- `svgo` with default plugins

`pngquant` is disabled by default, and can be enabled by configuring it in the advanced options.


### Query Parameters

These are common options you can specify in the `require` or `loaders` config.

* `minimize` - Minify regardless of webpack mode.
* `optimizationLevel` Select an optipng optimization level between `0` and `7`.
* `progressive` Convert to jpg and gif to progressive.

``` javascript
require('img?optimizationLevel=5');
require('img?progressive=true');
require('img?minimize&optimizationLevel=5&progressive=true');
require('img?-minimize'); // makes the loader a simple passthrough
```

``` javascript
{
  module: {
    loaders: [
      { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url?limit=10000!img?progressive=true' }
    ]
  }
}
```

#### optimizationLevel *(png)*

Shortcut for [optipng `optimizationLevel`](https://github.com/imagemin/imagemin-optipng), which determines the number of trials.

#### progressive *(jpg, gif)*

Shortcut to enable [jpegtran `progressive`](https://github.com/imagemin/imagemin-jpegtran) and enable [gifsicle `interlace`](https://github.com/imagemin/imagemin-gifsicle) for progressive rendering.


### Advanced Options

Advanced options can also be passed by specifying an `imagemin` property on your webpack config object. Each optimizer will be passed the corresponding property on the `imagemin` object as options.

Any options specified this way override basic `optimizationLevel` and `progressive` options set. For more details on each plugin's options, see their documentation on [Github](https://github.com/imagemin).

``` javascript
{
  module: {
    loaders: [
      { test: /\.(jpe?g|png|gif|svg)$/i, loaders: [ 'url?limit=10000', 'img?minimize' ] }
    ]
  },
  imagemin: {
    gifsicle: { interlaced: false },
    jpegtran: {
      progressive: true,
      arithmetic: false
    },
    optipng: { optimizationLevel: 5 },
    pngquant: {
      floyd: 0.5,
      speed: 2
    },
    svgo: {
      plugins: [
        { removeTitle: true },
        { convertPathData: false }
      ]
    }
  }
}
```

If you need to define two different loader configs, you can also change the config's property name via `img?config=otherConfig`:

``` javascript
{
  module: {
    loaders: [
      { test: /\.svg$/i, loaders: [ 'url?limit=10000', 'img?config=svgOpts' ] }
    ]
  },
  svgOpts: {
    svgo: {
      plugins: [
        { removeTitle: true },
        { convertPathData: false }
      ]
    }
  }
}
```

## License

This software is free to use under the MIT license. See the [LICENSE-MIT file](https://github.com/thetalecrafter/img-loader/blob/master/LICENSE-MIT) for license text and copyright information.
