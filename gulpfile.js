/*global require, rm*/
(function () {
    'use strict';

    var gulp = require('gulp'),
        gutil = require('gutil'),
        gulpConcat = require('gulp-concat'),
        rimraf = require('gulp-rimraf'),
        uglify = require('gulp-uglify'),
        rename = require('gulp-rename'),
        sourcemaps = require('gulp-sourcemaps');

    gulp.task('default', function () {
        return gutil.log('Gulp is running!');
    });

    gulp.task('clean', function () {
        gutil.log('===== Clean =====');
        return gulp.src('dist/*').pipe(rimraf());
    });

    gulp.task('concat', ['clean'], function () {
        gutil.log('===== Concat =====');
        return gulp.src('src/**/*.js')
            .pipe(gulpConcat('dasboard-ui.js'))
            .pipe(gulp.dest('./dist/'));
    });

    gulp.task('minify', ['clean', 'concat'], function () {
        gutil.log('===== Minify =====');
        return gulp.src('src/**/*.js')
            .pipe(gulpConcat('dasboard-ui.min.js'))
            .pipe(sourcemaps.init())
            .pipe(uglify())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./dist/'));
    });

    gulp.task('build', function () {
        gutil.log('===== BUILD =====');
        return gulp.start('clean')
            .start('concat')
            .start('minify');
    });

    gulp.task('watch', function () {
        gulp.watch('src/**/*.js', ['concat', 'minify']);
    });

}());