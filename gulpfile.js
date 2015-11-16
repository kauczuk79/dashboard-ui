(function() {
    'use strict';
    /*global console, require, rm*/

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

    function swallowError(error) {
        console.log(error.toString());
        this.emit('end');
    }

    gulp.task('clean', function() {
        return gulp.src(['./dist/*', '!./dist/assets'])
            .pipe(rimraf());
    });

    gulp.task('js:clean', function() {
        return gulp.src('./dist/*.js')
            .pipe(rimraf());
    })

    gulp.task('js:concat', function(callback) {
        return gulp.src('src/**/*.js')
            .pipe(concat('dasboard-ui.js', {
                newLine: '\n'
            }))
            .pipe(gulp.dest('./dist/'));
    });

    gulp.task('style:compile', function() {
        return gulp.src('src/**/*.scss')
            .pipe(sass({
                outputStyle: 'expanded'
            }))
            .on('error', swallowError)
            .pipe(gulp.dest('./dist/'));
    });

    gulp.task('style:concat', function() {
        return gulp.src('./dist/**/*.css')
            .pipe(concatCss('dashboard-ui.css'))
            .pipe(gulp.dest('./dist/'));
    });

    gulp.task('style:clean', function() {
        return gulp.src('./dist/*.css')
            .pipe(rimraf());
    })

    gulp.task('style:cleantemp', function() {
        return gulp.src(['./dist/directives', './dist/styles'])
            .pipe(rimraf());
    });

    gulp.task('js:minify', function() {
        return gulp.src('src/**/*.js')
            .pipe(concat('dasboard-ui.min.js'))
            .pipe(sourcemaps.init())
            .pipe(uglify())
            .on('error', swallowError)
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./dist/'));
    });

    gulp.task('build', function(callback) {
        runSequence('clean', 'style:compile', 'style:concat', 'js:concat', 'js:minify', 'style:cleantemp', callback);
    });

    gulp.task('watch', function() {
        gutil.log('Gulp is running!');
        gulp.watch('src/**/*.js', function() {
            runSequence('js:clean', 'js:concat', 'js:minify');
        });
        gulp.watch('src/**/*.scss', function() {
            runSequence('style:clean', 'style:compile', 'style:concat', 'style:cleantemp');
        });
    });

}());