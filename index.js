/**
 * Module dependencies
 */
var request = require('superagent')
  , _ = require('underscore');

// API endpoint
var endpoint = 'http://productsearch.linksynergy.com/productsearch';

module.exports = function (opts) {
  return new Linkshare (opts);
};

var Linkshare = function (opts) {
  this._keywords = opts.keywords;
};

Linkshare.prototype.id = function (id) {
  return this._id = id, this;
};

Linkshare.prototype.advertiser = function (id) {
  return this._advertiser = id, this;
};

Linkshare.prototype.done = function (cb) {
  return request
    .get(endpoint)
    .query({token: this._id})
    .query({keyword: this._keywords})
    .query({mid: this._advertiser})
    .end(function (err, res) {
      if (err) return cb(err);
      return cb(null, res.text);
    });
};
