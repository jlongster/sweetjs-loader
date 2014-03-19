# sweetjs-loader

Use it like any other loader.

It takes a query string that contains sweetjs compiler options. The only one you need to care about is `modules` which lets you specify where your macros are defined. Usually you will have a common macro library you apply to everything.

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
    loaders: [{test: /\.js$/, loader: 'sweetjs?modules[]=./macros.sjs'}]
  }
};
```