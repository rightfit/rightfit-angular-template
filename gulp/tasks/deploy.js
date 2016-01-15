var gulp = require('gulp');
var config = require('../../gulp.conf.js');
var merge = require('merge-stream');
var changed = require('gulp-changed');


var deploy  = function (env) {
	var src = gulp.src(config.paths.apps + '**/*.html')
		.pipe(gulp.dest(config.paths[env].base + 'apps/'));
	
	var appJS = gulp.src(config.paths.appJs + '*.js')
		.pipe(gulp.dest(config.paths[env].appJs)); //move app-js to end directory
	
	var css = gulp.src(config.paths.css + '*.css')
		.pipe(gulp.dest(config.paths[env].css)); //move css to end directory
	
	var img = gulp.src(config.paths.img + '*')
		.pipe(changed(config.paths[env].img))
		.pipe(gulp.dest(config.paths[env].img)); //move images to end directory
	
	var fonts = gulp.src(config.paths.fonts + '*')
		.pipe(changed(config.paths[env].fonts))
		.pipe(gulp.dest(config.paths[env].fonts));
	//move bower components
	var bowerTsk = gulp.src(config.paths.bowerDir + '**/*')
		.pipe(gulp.dest(config.paths[env].publicBase + 'bower_components'));
	return merge(src, appJS, css, img, bowerTsk);
	
}
gulp.task('deploy:development', function () {

	return deploy('development');
})

gulp.task('deploy:production', function () {

	return deploy('production');
})