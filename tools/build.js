'use strict';

const bankai = require('bankai');
const fs = require('graceful-fs');
const mkdirp = require('mkdirp');
const path = require('path');
const process = require('process');
const pump = require('pump');
const runParallel = require('run-parallel');

const ENTRY_FILE = path.resolve(__dirname, '..', 'index.js');
const OUT_HTML_FILE = path.resolve(__dirname, '..', 'out', 'index.html');
const OUT_JS_FILE = path.resolve(__dirname, '..', 'out', 'bundle.js');
const OUT_CSS_FILE = path.resolve(__dirname, '..', 'out', 'bundle.css');

const BANKAI_OPTIONS = {
  html: {
    lang: 'en',
    dir: 'ltr',
    title: 'vorici chromatic calculator',
    body: '<div id="content"></div>'
  },
  js: {
    transform: 'babelify'
  },
  uglify: process.env.NODE_ENV === 'production'
};

function buildHTML(assets, callback) {
  pump(assets.html(), fs.createWriteStream(OUT_HTML_FILE), callback);
}

function buildJS(assets, callback) {
  pump(assets.js(), fs.createWriteStream(OUT_JS_FILE), callback);
}

function buildCSS(assets, callback) {
  pump(assets.css(), fs.createWriteStream(OUT_CSS_FILE), callback);
}

mkdirp.sync(path.resolve(__dirname, '..', 'out'));

const assets = bankai(ENTRY_FILE, BANKAI_OPTIONS);
runParallel([
  buildHTML.bind(null, assets),
  buildJS.bind(null, assets),
  buildCSS.bind(null, assets)
], (error) => {
  if (error) {
    throw error;
  }

  console.log('done');
  process.exit();
});
