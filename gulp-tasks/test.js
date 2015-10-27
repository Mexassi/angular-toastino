'use strict';
var gulp = require('gulp'),
    Server = require('karma').Server,
    $ = require('gulp-load-plugins')();

var jsPath = gulp.paths.base;

var appName = 'Angular-toastino';

var testFiles = [
  gulp.paths.base + 'gulp-tasks/**/*.js',
  gulp.paths.base + 'src/**/*.js',
  gulp.paths.base + 'test/**/*.js'
];

gulp.task('test:watch', function (done) {
  $.util.log($.util.colors.gray('Preparing testing environment for... ',
  $.util.colors.cyan('\n\n           ' + appName +'\n')));
  var server = new Server({
    configFile: jsPath + '/karma.conf.js',
    singleRun: false
  }, done);
  server.start();
});

gulp.task('test', function (done) {
  $.util.log($.util.colors.gray('Preparing testing environment for... ',
  $.util.colors.cyan('\n\n           ' + appName +'\n')));
  var server = new Server({
    configFile: jsPath + '/karma.conf.js',
    singleRun: true
  }, done);
  server.start();
});

gulp.task('jshint', function () {
  return gulp.src(testFiles)
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'));
});
