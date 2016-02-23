var gulp = require('gulp');
var runSeq = require('run-sequence');
var config = require('../../config.js');
var constant = require('../const.js');
var utils = require('../utils.js');


var watchBuild = function (env) {
	watcher(config.watch, function(){
		gulp.start(['build:' + env]);
	});
}

/* This task does not call its corresponding build task since the watching is
   coupled with the building of it
 */
gulp.task('watch-build:js',  function() {
	return utils.watch.js();
});

gulp.task('watch-build:html',  ['build:html'], function() {
	return utils.watch.html();
});

gulp.task('watch-build:css', ['build:css'],  function() {
	return utils.watch.css();
});

gulp.task('watch-build:img',  ['build:img'], function() {
	return utils.watch.img()
});

gulp.task('watch-build:fonts', ['build:fonts'], function() {
	return utils.watch.fonts()
});

gulp.task('watch-build:vendor', ['build:vendor'], function() {
	return utils.watch.vendor()
});


gulp.task('watch-build', [
		'watch-build:html',
		'watch-build:css',
		'watch-build:js',
		'watch-build:img',
		'watch-build:fonts',
		'watch-build:vendor'
	])

gulp.task('watch-build:clean', function (cb) {

	return runSeq('clean','watch-build', cb);
})