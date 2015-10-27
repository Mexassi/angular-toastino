'use strict';
var gulp = require('gulp');
var requireDir = require('require-dir');
// load tasks

// config
gulp.paths = {
  base: [__dirname],
  src: [__dirname + '/src/**/*.js'],
  test: [__dirname + '/test/**/*js']
};

requireDir('./gulp-tasks');

gulp.task('build', ['test', 'jshint']);

gulp.task('default', ['uglify']);
