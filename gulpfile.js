var gulp = require('gulp');
var requireDir = require('require-dir');
var config = require('./config.js');
var runSeq = require('run-sequence');
var utils = require('./gulp/utils.js');

requireDir('./gulp/tasks', { recurse:true });


// var watchBuild = function (env) {
// 	watcher(config.watch, function(){
// 		gulp.start(['build:' + env]);
// 	});
// }

gulp.task('default', ['watch-build:clean'], function () {
	console.log("Done building. Listening for changes...");
}); 
