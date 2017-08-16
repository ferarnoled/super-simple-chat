(function() {

  'use strict';

  // *** dependencies *** //
  const express = require('express');
  const path = require('path');
  
  // *** express instance *** //
  const app = express();

  console.log(path.resolve(__dirname, '../views'));
  app.use("/chat", express.static(path.resolve(__dirname, '../views')));
  //app.use(express.static('public'));
  
  module.exports = app;

}());
