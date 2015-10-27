'use strict';
var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

gulp.task('uglify', function () {
    gulp.src('src/**/*.js')
    .pipe($.uglify())
    .pipe(gulp.dest('build'));
});
