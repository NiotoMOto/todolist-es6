var mongoose = require('mongoose');
var requireDir = require('require-dir');
requireDir('./models');

mongoUrl = 'mongodb://localhost/chat';
mongoose.connect(mongoUrl);
