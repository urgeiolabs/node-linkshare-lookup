/**
 * Module dependencies
 */
var request = require('superagent')
  , xml2js = require('xml2js')
  , _ = require('underscore');

// API endpoint
var endpoint = 'http://productsearch.linksynergy.com/productsearch';

var Linkshare = module.exports = function (opts) {
  if (!(this instanceof Linkshare)) return new Linkshare (opts);

  this._keywords = opts.keywords;
};

Linkshare.prototype.id = function (id) {
  return this._id = id, this;
};

Linkshare.prototype.advertiser = function (id) {
  return this._advertiser = id, this;
};

Linkshare.prototype.limit = function (limit) {
  if (!limit) return this;
  return this._limit = limit, this;
};

Linkshare.prototype.one = function (one) {
  one = ('undefined' === typeof one) ? true : !!one;
  return this._one = one, this;
};

Linkshare.prototype.done = function (cb) {
  var one = this._one
    , limit = this._limit;

  // Ensure the callback only fires once
  cb = _.once(cb);

  return request
    .get(endpoint)
    .query({token: this._id})
    .query({keyword: this._keywords})
    .query({mid: this._advertiser})
    .query({max: one ? 1 : limit})
    .query({pagenumber: this._page})
    .end(function (err, res) {
      // Catch http errors
      if (err) return cb(err);

      xml2js.parseString(res.text, {trim: true}, function (err, res) {
        // Catch parsing errors
        if (err) return cb(err);

        var errors = res.result.Errors
          , items = res.result.item;

        // Catch api errors
        if (errors) return cb(new Error(formatError(errors)));

        // Format results
        var formatted = format(items);

        // Limit results
        if (one) {
          formatted = _.first(formatted) || null;
        } else if (limit) {
          formatted = _.first(formatted, limit);
        }

        return cb(null, formatted);
      });
    });
};

var format = function (items) {
  return items.map(function (i) {
    return {
      name: i.productname[0],
      listPrice: i.price[0]['_'],
      currency: i.price[0]['$']['currency'],
      url: i.linkurl[0],
      id: i.linkid[0]
    }
  });
};

var formatError = function (error) {
  return error[0].ErrorText;
};
