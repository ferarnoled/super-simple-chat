(function() {

  'use strict';

  // *** dependencies *** //
  const express = require('express');
  const path = require('path');
  
  // *** express instance *** //
  const app = express();

  app.use(express.static(path.resolve(__dirname, './src/views')));
  
  module.exports = app;

}());
