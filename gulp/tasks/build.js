var gulp = require('gulp');
var runSeq = require('run-sequence');
var config = require('../../config.js');
var merge = require('merge-stream');
var filter = require('gulp-filter');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');


gulp.task('build', function () {
	//move src to a new destination
	
	//move app's html
	var apps = gulp.src(config.paths.src + 'apps/**/*.html')
		.pipe(gulp.dest(config.paths.apps));
	
	//compile and relocate css 
	var sassFilter = filter('*.scss', {restore: true});
	var stylesFilter = filter(config.styles.select);
	var css = gulp.src(config.paths.src + 'css/*')
		.pipe(sassFilter)
		.pipe(sass().on('error', sass.logError))
		.pipe(sassFilter.restore)
		.pipe(stylesFilter)
		.pipe(sourcemaps.init())
		.pipe(concat(config.styles.out))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.paths.css))
	
	
	//move img
	var img = gulp.src(config.paths.src + 'img/*')
		.pipe(gulp.dest(config.paths.img));
	
	//move js
	var js = gulp.src(config.paths.src + 'js/*')
		.pipe(gulp.dest(config.paths.js));

	//move fonts
	var fonts = gulp.src(config.paths.src + 'fonts/*')
		.pipe(gulp.dest(config.paths.fonts));

	return merge(apps, js, css, img, fonts);
})

gulp.task('build:development', function () {
	
	return runSeq(
		'build',
		['bundle','inject'],
		'deploy:development',
		function () {console.log("All done!");}		
		)

})

gulp.task('build:production', function () {
	return runSeq(
		'build',
		['bundle','inject'],
		'minify',
		'deploy:production',
		function () {console.log("All done!");}	
		);

})

gulp.task('build:development:clean',  function () {
	
	return runSeq(
		'clean:development',
		'build:development'
		)

})

gulp.task('build:production:clean',  function () {
	return runSeq(
			'clean:production',
			'build:production'
			)

})
