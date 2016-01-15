var gulp = require('gulp');
var requireDir = require('require-dir');
var config = require('./gulp.conf.js');
var watcher = require('gulp-watch');
var runSeq = require('run-sequence');

requireDir('./gulp/tasks', { recurse:true });


var watchBuild = function (env) {
	watcher(config.watch, function(){
		gulp.start(['build:' + env]);
	});
}

gulp.task('default', ['clean', 'build:development:clean'], function () {
	watchBuild('development');
}); 

gulp.task('publish', ['build:production:clean']);


