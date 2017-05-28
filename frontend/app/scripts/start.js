'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

// Ensure environment variables are read.
require('../config/env');

const fs = require('fs');
const chalk = require('chalk');
const webpack = require('webpack');
const clearConsole = require('react-dev-utils/clearConsole');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const paths = require('../config/paths');
const config = require('../config/webpack.config.dev');

const useYarn = fs.existsSync(paths.yarnLockFile);

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}


let compiler = webpack(config);
compiler.watch(
  {},
  (error, stat) => {
    if (error) {
      console.log(error);
    }
    //console.log(stat);
    console.log('Compiler has finished execution.');
  }
);

