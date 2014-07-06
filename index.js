var sweet = require('sweet.js');
var path = require('path');
var RSVP = require('rsvp');
var loaderUtils = require('loader-utils');

var moduleCache = {};

function resolve(loader, filepath) {
  var promise = new RSVP.Promise(function(resolve, reject) {
    loader.resolve(loader.context, filepath, function(err, res) {
      if(err) {
        reject(err);
      }
      else {
        resolve(res);
      }
    });
  });

  return promise;
}

module.exports = function(source) {
  var loader = this;
  loader.async();
  var config = loaderUtils.parseQuery(loader.query);
  var loaderRequest = loaderUtils.getCurrentRequest(this);
  var fileRequest = loaderUtils.getRemainingRequest(this);
  config.modules = config.modules || [];

  RSVP.all(config.modules.map(function(mod) {
    if(moduleCache[mod]) {
      return moduleCache[mod];
    }
    return resolve(loader, mod).then(function(res) {
      moduleCache[mod] = sweet.loadNodeModule(process.cwd(), res);
      return moduleCache[mod];
    });
  })).then(function(modules) {
    if(config.readers) {
      return RSVP.all(config.readers.map(function(mod) {
        return resolve(loader, mod).then(function(res) {
          sweet.setReadtable(res);
        })
      })).then(function() {
        return modules;
      });
    }
    return modules;
  }).then(function(modules) {
    var result = sweet.compile(source, {
      modules: modules,
      sourceMap: !(config.sourceMap === 'false'),
      filename: fileRequest
    });

    loader.cacheable && loader.cacheable();
    loader.callback(null, result.code, result.sourceMap);
  }).catch(function(err) {
    loader.callback(err);
  });
};
