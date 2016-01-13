var gulp = require('gulp');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var flow = require('gulp-flowtype');

var es2015JsDir = 'src/**/*.js';
var flowDir = 'build/build_flow/';

gulp.task('default', ['flow:babel'], function() {
	return gulp.src(flowDir + '**/*.js')
		.pipe(sourcemaps.init())
		.pipe(flow({abort: true}))
		.pipe(babel({presets: ['react']}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist'));
});

gulp.task('typecheck', function(callback) {
	return gulp.src('src/**/*.js').pipe(flow({abort: true}));
});


gulp.task('flow:babel', function(callback) {
	gulp.src(es2015JsDir)
		.pipe(sourcemaps.init())
		.pipe(babel({"plugins": ["syntax-flow"], presets: ['es2015']}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(flowDir))
		.on('end', callback);
});
