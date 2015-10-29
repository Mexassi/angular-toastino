'use strict';
var gulp = require('gulp'),
$ = require('gulp-load-plugins')();

gulp.task('styles', function () {
  gulp.src('./src/*.scss')
  .pipe($.sass().on('error', $.sass.logError))
  .pipe(gulp.dest('build'));
});

gulp.task('uglify', function () {
  gulp.src('src/angular-toastino.js')
  .pipe($.rename({suffix:'.min'}))
  .pipe($.uglify())
  .pipe(gulp.dest('build'));
});
