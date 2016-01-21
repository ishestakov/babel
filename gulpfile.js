'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var flow = require('gulp-flowtype');
var sourcemapReporter = require('jshint-sourcemap-reporter');
var clean = require('gulp-clean');
var webpack = require('webpack-stream');
var through = require('through2');
var plumber = require('gulp-plumber');

var buildDir = 'build/';
var jsExt = '**/*.js';
var jsxExt = '**/*.jsx';
var sourceDir = 'src/';
var typecheckDir = buildDir + 'flow_check/';

var currentDir = process.cwd();

gulp.task('default', ['react'], function() {
    return gulp.src(buildDir + 'dist/**/*.js')
        .pipe(webpack({
            entry: './build/dist/app.js',
            devtool: 'source-map',
            output: {
                filename: 'bundle.js'
            }
        }))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(through.obj(function(file, enc, callback){
            var isSourceMap = /\.map$/.test(file.path);
            if (!isSourceMap) {
                this.push(file);
            }
            callback();
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(buildDir + 'webpack'))

});


gulp.task('react',  function(){
    return gulp.src([sourceDir + jsExt, sourceDir + jsxExt])
        .pipe(plumber())
        .pipe(
            flow({
                all: true,
                abort: false,
                killFlow: true
            })
        )
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(babel({presets: ['es2015', 'react'], plugins: ['transform-class-properties']}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(buildDir + 'dist'));

});

gulp.task('clean', function(){
    return gulp.src(buildDir, {read: false}).pipe(clean());
});