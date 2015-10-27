'use strict';
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var requireDir = require('require-dir');
// load tasks
requireDir('./gulp-tasks');

gulp.task('default', ['uglify']);
