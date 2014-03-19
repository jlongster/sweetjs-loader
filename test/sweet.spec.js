var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

describe('sweet-loader', function() {
  it('should pretty much work', function() {
    var BUNDLE_PATH = path.join(__dirname, 'bundle.js');

    if (fs.existsSync(BUNDLE_PATH)) {
      fs.unlinkSync(BUNDLE_PATH);
    }

    webpack({
      cache: true,
      entry: path.join(__dirname, 'basic.js'),
      output: {
	filename: BUNDLE_PATH
      },
      module: {
	loaders: [
	  {
	    test: /\.js$/,
	    loader: path.join(__dirname, '../index') + '?modules[]=' + path.join(__dirname, './macros.sjs')
	  }
	]
      }
    }, function(err, stats) {
      console.log(err);
    })
  });
});
