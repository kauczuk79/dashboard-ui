(function () {
    'use strict';
    /*global require, rm*/

    var gulp = require('gulp'),
        gutil = require('gutil'),
        concat = require('gulp-concat'),
        rimraf = require('gulp-rimraf'),
        uglify = require('gulp-uglify'),
        rename = require('gulp-rename'),
        sourcemaps = require('gulp-sourcemaps'),
        sass = require('gulp-sass'),
        concatCss = require('gulp-concat-css'),
        runSequence = require('run-sequence');

    gulp.task('clean', function () {
        return gulp.src('dist/*')
            .pipe(rimraf());
    });

    gulp.task('js:concat', function () {
        return gulp.src('src/**/*.js')
            .pipe(concat('dasboard-ui.js', {
                newLine: '\n'
            }))
            .pipe(gulp.dest('./dist/'));
    });

    gulp.task('sass:compile', function () {
        return gulp.src('src/**/*.scss')
            .pipe(sass())
            .pipe(gulp.dest('./dist/'));
    });

    gulp.task('style:concat', ['sass:compile'], function () {
        gulp.src('./dist/**/*.css')
            .pipe(concatCss('dashboard-ui.css'))
            .pipe(gulp.dest('./dist/'));
        return gulp.src('./dist/directives')
            .pipe(rimraf());
    });

    gulp.task('js:minify', function () {
        return gulp.src('src/**/*.js')
            .pipe(concat('dasboard-ui.min.js'))
            .pipe(sourcemaps.init())
            .pipe(uglify())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./dist/'));
    });

    gulp.task('build', function () {
        runSequence('clean', 'js:concat', 'js:minify', 'style:concat');
    });

    gulp.task('watch', function () {
        gutil.log('Gulp is running!');
        gulp.watch('src/**/*.js', ['js:concat', 'js:minify']);
    });

}());