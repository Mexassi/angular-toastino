'use strict';
var gulp = require('gulp');
var requireDir = require('require-dir');
var browserSync = require('browser-sync').create();
var inject2 = require('gulp-inject');
var sass = require('gulp-sass');
// load tasks

// config
gulp.paths = {
  base: [__dirname],
  src: [__dirname + '/src/**/*.js'],
  test: [__dirname + '/test/**/*js'],
  libs: [__dirname + '/bower_components']
};

requireDir('./gulp-tasks');

gulp.task('build', ['test', 'jshint']);

gulp.task('inject', function () {
  var target = gulp.src('./src/index.html');
  var sources = gulp.src(['./angular.min.js', './angular-toastino.js'], {read: false});
  return target.pipe(inject2(sources))
  .pipe(gulp.dest('./src'));
});

gulp.task('sass', function () {
  gulp.src('./src/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/*.scss', ['sass']);
});

gulp.task('serve', [ 'inject', 'sass:watch'], function () {
  browserSync.init({
    server: './src'
  });
});

gulp.task('default', ['serve']);
