var gulp = require('gulp');
var uglify = require('gulp-uglify');
var mincss = require('gulp-minify-css');
var config = require('../../gulp.conf.js');

gulp.task('minify:js', function () {
	return gulp.src(config.paths.appJs + '*.js')
	.pipe(uglify())
	.pipe(gulp.dest(config.paths.appJs));
	
});

gulp.task('minify:css', function () {
	return gulp.src(config.paths.css + '*.css')
	.pipe(mincss())
	.pipe(gulp.dest(config.paths.css));
	
}); 


gulp.task('minify', ['minify:js', 'minify:css']);

