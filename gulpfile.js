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
var typecheckDir = buildDir + 'flow_check/';

var currentDir = process.cwd();

// Skip class transformation for flowtype checks as Flow understand classes but doesnt' understand other es6 features.
var es6BabelFlowTranspilingPlugins=[
'check-es2015-constants',
//'transform-es2015-arrow-functions',
'transform-es2015-block-scoped-functions',
'transform-es2015-block-scoping',
'transform-es2015-computed-properties',
'transform-es2015-destructuring',
'transform-es2015-for-of',
'transform-es2015-function-name',
'transform-es2015-literals',
'transform-es2015-modules-commonjs',
'transform-es2015-object-super',
'transform-es2015-parameters',
'transform-es2015-shorthand-properties',
'transform-es2015-spread',
'transform-es2015-sticky-regex',
'transform-es2015-template-literals',
'transform-es2015-typeof-symbol',
'transform-es2015-unicode-regex',
'transform-regenerator',
'syntax-flow'
];

gulp.task('default', ['react']);


gulp.task('react', ['typecheck'], function(){
    return gulp.src(typecheckDir + jsExt)
        .pipe(sourcemaps.init())
        .pipe(babel({presets: ['es2015', 'react']}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(buildDir + 'dist'));

});

gulp.task('typecheck', ['es6:flow:transpile'], function() {
    return gulp.src(typecheckDir + jsExt)
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

gulp.task('es6:flow:transpile', function(callback) {
    gulp.src(sourceDir + jsExt)
        .pipe(sourcemaps.init())
        .pipe(babel({"plugins": es6BabelFlowTranspilingPlugins}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(typecheckDir))
        .on('error', callback)
        .on('end', callback);
});

gulp.task('clean', function(){
    return gulp.src(buildDir, {read: false}).pipe(clean());
});