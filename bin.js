#!/usr/bin/env node

/**
 * Module dependencies
 */
var linkshare = require('./')
  , nomnom = require('nomnom');

var opts = nomnom
  .script('linkshare-lookup')
  .nocolors()
  .option('id', {
    abbr: 'i',
    required: true,
    help: 'Linkshare api token'
  })
  .option('keywords', {
    abbr: 'k',
    required: true,
    help: 'Keywords to search'
  })
  .option('one', {
    abbr: '1',
    help: 'Limit to only one result',
    flag: true,
    default: false
  })
  .option('limit', {
    abbr: 'l',
    help: 'Limit number of results'
  })
  .option('page', {
    abbr: 'p',
    help: 'Result page',
  })
  .parse();

linkshare({keywords: opts.keywords})
  .id(opts.id)
  .limit(opts.limit)
  .one(opts.one)
  .page(opts.page)
  .done(function (err, res) {
    if (err) throw err;
    console.log(JSON.stringify(res));
  });
