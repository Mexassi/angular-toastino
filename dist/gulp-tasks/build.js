'use strict';
var gulp = require('gulp'),
$ = require('gulp-load-plugins')();

var distFolder = 'dist/dist';

gulp.task('clean', function () {
    var src = gulp.src(gulp.paths.base + '/dist', {read: false});
    $.util.log($.util.colors.green('dist folder cleaned and removed √'));
    return src.pipe($.clean());
});

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

gulp.task('root', function() {
  return gulp.src([gulp.paths.base + '/gulpfile.js',
                   gulp.paths.base + '/bower.json',
                   gulp.paths.base + '/package.json',
                   gulp.paths.base + '/README.md',])
  .pipe(gulp.dest(gulp.paths.base + '/dist/',{ overwrite: false }));
});

gulp.task('tasks', function() {
  return gulp.src(gulp.paths.base + '/gulp-tasks/build.js')
  .pipe(gulp.dest(gulp.paths.base + '/dist/gulp-tasks/'));
});

gulp.task('html', function() {
  return gulp.src(gulp.paths.base + '/src/index.html')
  .pipe(gulp.dest(gulp.paths.base + '/dist/src/', { overwrite: false }));
});

gulp.task('libs', function() {
  return gulp.src([gulp.paths.base + '/src/jquery.min.js',
                   gulp.paths.base + '/src/bootstrap.css',
                   gulp.paths.base + '/src/styles.css',
                   gulp.paths.base + '/src/angular-toastino.js'])
  .pipe(gulp.dest(gulp.paths.base + '/dist/src', { overwrite: false }));
});

gulp.task('deploy', ['build'], function() {
  return gulp.src(gulp.paths.base + '/dist/src')
    .pipe($.subtree())
    .pipe($.clean());
});
