# sweetjs-loader

Use it like any other loader.

It takes a query string that contains sweetjs [compiler
options](http://sweetjs.org/doc/main/sweet.html#compiler-api). The
ones you most likely care about:

* modules: a list of modules to load macros from
* readers: a list of reader extension modules to install

## example webpack.config.js

Applies the macros in `macros.sjs` to all `.js` files.

```js
module.exports = {
  cache: true,
  entry: 'app.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/, loader: 'sweetjs?modules[]=./macros.sjs,readers[]=reader-mod'
    }]
  }
};
```