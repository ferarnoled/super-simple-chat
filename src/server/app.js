(function() {

  'use strict';

  // *** dependencies *** //
  const express = require('express');
  const path = require('path');

  app.use(express.static(path.resolve(__dirname, './src/views')));
  
  // *** express instance *** //
  const app = express();
  
  module.exports = app;

}());
