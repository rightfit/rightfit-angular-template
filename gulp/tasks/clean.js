var gulp = require('gulp');
var del = require('del');
var config = require('../../gulp.conf.js')

gulp.task('clean', function (cb) {
	return del(config.paths.clean, cb);
})

gulp.task('clean:development',['clean'], function (cb) {
	return del(config.paths.development.base, cb);
});
gulp.task('clean:production',['clean'], function (cb) {
	return del(config.paths.production.base, cb);
});