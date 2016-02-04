'use strict';
var gulp = require('gulp'),
$ = require('gulp-load-plugins')();

var distFolder = 'dist';

gulp.task('styles', function () {
  gulp.src('./src/*.scss')
  .pipe($.sass().on('error', $.sass.logError))
  .pipe(gulp.dest(distFolder));
});

gulp.task('uglify', function () {
  gulp.src('src/angular-toastino.js')
  .pipe($.rename({suffix:'.min'}))
  .pipe($.uglify())
  .pipe(gulp.dest(distFolder));
});

// gulp.task('build', ['html', 'images', 'fonts', 'extras'], function () {
//   return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
// });
//
// gulp.task('deploy', ['build'], function() {
//   return gulp.src('dist')
//     .pipe($.subtree())
//     .pipe($.clean());
// });
