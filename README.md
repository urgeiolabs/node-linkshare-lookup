# node-linkshare-lookup

## Introduction

This module is a simple wrapper around the rakuten linkshare productsearch api.

## Installation

    npm install linkshare-lookup

## Usage

    linkshare-lookup -i <api key> -k <search keywords>

## Examples

Basic:

```javascript
var linkshare = require('linkshare-lookup');

linkshare({keywords: 'test'})
  .id('id')
  .done(function (err, result) { ... });
```

Select advertiser:

```javascript
var linkshare = require('linkshare-lookup');

linkshare({keywords: 'test'})
  .id('id')
  .advertiser('13798')
  .done(function (err, result) { ... });
```

Limit results:

```javascript
var linkshare = require('linkshare-lookup');

linkshare({keywords: 'test'})
  .id('id')
  .limit(5)
  .done(function (err, result) { ... });
```

Limit to only one result, a la mongodb findOne

```javascript
var linkshare = require('linkshare-lookup');

linkshare({keywords: 'test'})
  .id('id')
  .one()
  .done(function (err, result) { ... });
```

## Dependencies

* [superagent](http://github.com/visionmedia/superagent)
* [underscore](http://github.com/jashkenas/underscore)
* [xml2js](https://github.com/Leonidas-from-XIV/node-xml2js/)
* [nomnom](http://github.com/harthur/nomnom)

## License

MIT
