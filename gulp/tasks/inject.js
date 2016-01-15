var gulp = require('gulp');
var inject = require('gulp-inject');
var mainBowerFiles = require('main-bower-files');
var config = require('../../gulp.conf.js')

function injectFn (env) {
	env = env === undefined ? 'development' : env;
	var prf = config.paths[env]['resAlias'] || config.paths['resPrefix'] || 'public';
	//remove trailing slash
	var prefix = (prf.slice(-1) === '/') ? 
			prf.slice(0,-1):
			prf;
 
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

gulp.task('inject:production', function () {
	return injectFn("production");
}); 