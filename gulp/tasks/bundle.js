var gulp = require('gulp');
var browserify = require('browserify');
var es = require('event-stream');
var vSource = require('vinyl-source-stream');
var glob = require('glob');
var config = require('../../gulp.conf.js');


gulp.task('bundle', function () {	

	
	var tasks = config.bundles.map(function (bundle) {

		var conf = {
			debug: config.options.debug
		};
		conf.entries = glob.sync(bundle['entry']) ;
		return browserify(conf)
			.bundle()
			.on('error', function (err) {
				console.log(err.message);
				this.emit('end')
			})
			.pipe(vSource(bundle['out']))
			.pipe(gulp.dest(config.paths.appJs));

	});
	
	return es.merge.apply(null, tasks);
});