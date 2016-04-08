require('./jquery.timeago.js');

var Vue = require('vue');
var app = require('./app');
var utils = require('./utils');
var config = window.commentsConfig;

utils.csrfToken($, config.csrfToken);
utils.vueExtra(Vue);

app('#comments', config);
