var gulp = require('gulp');
var del = require('del');
var config = require('../../config.js')
var constant = require('../const.js');


gulp.task('clean', function (cb) {
	return del(config.paths[constant.env].base, cb);
})

