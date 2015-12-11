var mongoose = require('mongoose');
var restify = require('express-restify-mongoose');
var _ = require('lodash');

var express = require('express');
var router = express.Router();


  var router = express.Router();
  _.each(mongoose.models, (m, key) => {
    restify.serve(router, m);
  });


module.exports = router;
