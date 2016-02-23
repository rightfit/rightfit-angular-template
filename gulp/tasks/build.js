var gulp = require('gulp');
var runSeq = require('run-sequence');
var config = require('../../config.js');
var constant = require('../const.js');
var utils = require('../utils.js');


gulp.task('build:html',  function() {
	return utils.build.html();
});

gulp.task('build:css',  function() {
	return utils.build.css();
});

gulp.task('build:js',  function() {
	return utils.build.js();
});

gulp.task('build:img',  function() {
	return utils.build.img();
});

gulp.task('build:fonts',  function() {
	return utils.build.fonts();
});

gulp.task('build:vendor',  function() {
	return utils.build.vendor();
});


gulp.task('build', [
		'build:html',
		'build:css',
		'build:js',
		'build:img',
		'build:fonts',
		'build:vendor'
	])

gulp.task('build:clean', function (cb) {

	return runSeq('clean','build', cb);
})