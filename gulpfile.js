'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var flow = require('gulp-flowtype');
var sourcemapReporter = require('jshint-sourcemap-reporter');
var clean = require('gulp-clean');

var buildDir = 'build/';
var jsExt = '**/*.js';
var jsxExt = '*.jsx';
var sourceDir = 'src/';
var es5SourceDir = buildDir + 'es5/';

var currentDir = process.cwd();

gulp.task('default', ['react']);


gulp.task('react', ['typecheck'], function(){
    return gulp.src(es5SourceDir + jsExt)
        .pipe(sourcemaps.init())
        .pipe(babel({presets: ['react']}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(buildDir + 'dist'));

});

gulp.task('typecheck', ['es6:transpile'], function() {
    return gulp.src(es5SourceDir + jsExt)
        .pipe(flow({
                abort: true,
                reporter: {
                    reporter: function(errors) {
                        return sourcemapReporter.reporter(errors, { sourceRoot: currentDir + '/' + sourceDir });
                    }
                }
            })
        )
        
});

gulp.task('es6:transpile', function(callback) {
    gulp.src(sourceDir + jsExt)
        .pipe(sourcemaps.init())
        .pipe(babel({"plugins": ["syntax-flow"], presets: ['es2015']}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(es5SourceDir))
        .on('error', callback)
        .on('end', callback);
});

gulp.task('clean', function(){
    return gulp.src(buildDir, {read: false}).pipe(clean());
});
