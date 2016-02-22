var gulp = require('gulp');
var inject = require('gulp-inject');
var mainBowerFiles = require('main-bower-files');
var config = require('../../config.js')

function injectFn () {
	
	//remove trailing slash
    var prefix = (config.paths.resPrefix.slice(-1) === '/') ? 
	    config.paths.resPrefix.slice(0,-1):
	    config.paths.resPrefix;	
 
	return gulp.src(config.paths.apps + '*/*.html')
		.pipe(inject(gulp.src(mainBowerFiles({includeDev: config.options.debug}), {read:false}),
		 	{ 
		 		name:'bower', 
		 		relative: false,
		 		addPrefix: prefix,
		 		
		 	}))
		.pipe(gulp.dest(config.paths.apps))
}
gulp.task('inject', function () {
	return injectFn();
}); 
