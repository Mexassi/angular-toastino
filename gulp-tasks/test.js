'use strict';
var gulp = require('gulp'),
    Server = require('karma').Server,
    requireDir = require('require-dir'),
    $ = require('gulp-load-plugins')();

var jsPath = gulp.paths.base;

var appName = 'angular-toastino';

var testFiles = [
  jsPath + '**/*.js'
];

gulp.task('test', function (done) {
  $.util.log($.util.colors.gray('Preparing testing environment for... ',
  $.util.colors.cyan('\n\n           ' + appName +'\n')));
  var server = new Server({
    configFile: jsPath + '/karma.conf.js',
    singleRun: false
  }, done).start();
});
