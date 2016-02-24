var config = require("../config.js");
var constants = require("./const.js")
var gulp = require("gulp");
var gulpif = require("gulp-if");
var lazypipe = require("lazypipe");
var uglify = require("gulp-uglify");
var mincss = require("gulp-cssnano");
var filter = require("gulp-filter");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var concat = require("gulp-concat");
var browserify = require("browserify");
var watchify = require("watchify");
var assign = require("lodash/fp/assign");
var glob = require("glob");
var gutil = require('gulp-util');
var vSource = require('vinyl-source-stream');
var inject = require('gulp-inject');
var mainBowerFiles = require('main-bower-files');
var changed = require('gulp-changed');
var merge = require('merge-stream');
var watcher = require('gulp-watch');



var build = {
	js: buildJS,
	html: buildHtml,
	css: buildCSS,
	fonts: buildFonts,
	img: buildImg,
	vendor: buildVendor,
	
}

var watch = {
	js: watchJS,
	html: watchHtml,
	css: watchCSS,
	fonts: watchFonts,
	img: watchImg,
	vendor: watchVendor
}	

module.exports = {
	build: build,
	watch: watch
}

var ENV = constants.env; 
var DEBUG = constants.debug;
//remove trailing slash
var prefix = (config.paths.resPrefix.slice(-1) === '/') ? 
    config.paths.resPrefix.slice(0,-1):
    config.paths.resPrefix;	

var b_opts = {
	debug: DEBUG,
}

//options for Main Bower files
var mbf_opts = {
	includeDev: DEBUG
}

//bundling function
function bundleJS (b, bundle) {
	return b.bundle()
		.on('error', function (err) {
			console.log(err.message);
			this.emit('end')
		})
		.pipe(vSource(bundle['out']))
		.pipe(gulp.dest(config.paths[ENV].appJs));
}
//build js
function buildJS(watch) {

	var tasks = config.bundles.map(function (bundle) {

		var conf = {
			entries: glob.sync(bundle['entry']),
			cache: {},
  			packageCache: {},
		}
		conf = assign(conf, b_opts);

	    var b = browserify(conf);
		//use watchify if changes will be tracked, otherwise use browserify
		if (watch) {
			b = watchify(b);
			b.on('update', function () {
				gutil.log("Re-bundle...");
				return bundleJS(b, bundle);	
			}); // on any dep update, runs the bundler
			b.on('log', gutil.log); // output build logs to terminal
		}
	    bundleJS(b, bundle);

	});	
	return tasks;
}

//build sass
function buildCSS() {
	//gather sass files and css and throw-em to dist folder
	//compile and relocate css 
	var sassFilter = filter('*.scss', {restore: true});
	var stylesFilter = filter(config.styles.select);
	gutil.log("Bulding css...");
	return gulp.src(config.paths.src + 'css/*')
		.pipe(sassFilter)
		.pipe(sass().on('error', sass.logError))
		.pipe(sassFilter.restore)
		.pipe(stylesFilter)
		.pipe(sourcemaps.init())
		.pipe(concat(config.styles.out))
		.pipe(sourcemaps.write())
		//minimize if in production
		.pipe(gulpif(!DEBUG, minifyCSS))
		.pipe(gulp.dest(config.paths[ENV].css))
		.on("end", function() { gutil.log("Done bulding css") });

}


var injectHtml = lazypipe()
	.pipe(function () {
		return inject(gulp.src(mainBowerFiles(mbf_opts), {read:false}),
		 	{ 
		 		name:'bower', 
		 		relative: false,
		 		addPrefix: prefix,
		 		//quiet:true
		 	})
	});
//inject vendor
function buildHtml() {	
	var apps_src = config.paths.src + 'apps/**/*.html';	
	//only inject index.html files, ignore everything else
	//maybe make it configurable? 	
	var injectFilter = filter('**/index.html', {restore: true});	
	
	gutil.log("Bulding html...");
	return gulp.src(apps_src)
		.pipe(injectFilter)
		.pipe(injectHtml())
		.pipe(injectFilter.restore)
		.pipe(gulp.dest(config.paths[ENV].base + 'apps/'))
		.on("end", function() { gutil.log("Done bulding html") });
}

//build img (move them to dist)
function buildImg() {
	gutil.log("Bulding images...");
	return gulp.src(config.paths.src + 'img/*')
		.pipe(changed(config.paths[ENV].img))
		.pipe(gulp.dest(config.paths[ENV].img)) //move unchanged images to end directory
		.on("end", function() { gutil.log("Done bulding imgs") });
}

//build fonts (move them to dist)
function buildFonts() {
	gutil.log("Bulding fonts...");
	return gulp.src(config.paths.src + 'fonts/*')
		.pipe(changed(config.paths[ENV].fonts))
		.pipe(gulp.dest(config.paths[ENV].fonts)) //move unchanged fonts to end directory
		.on("end", function() { gutil.log("Done bulding fonts") });
}

//build vendor js (including bower components) (move them to dist)
function buildVendor() {
	gutil.log("Bulding vendor scripts...");
	var js =  gulp.src(config.paths.src + 'js/*')
		.pipe(changed(config.paths[ENV].js))
		.pipe(gulp.dest(config.paths[ENV].js)); //move unchanged js to end directory


	var bower = gulp.src(mainBowerFiles(mbf_opts),  { base: config.paths.bowerDir })
		.pipe(changed(config.paths[ENV].publicBase + 'bower_components'))
		.pipe(gulp.dest(config.paths[ENV].publicBase + 'bower_components'));

	return merge(js, bower)
		.on("end", function() { gutil.log("Done bulding vendor scripts") });
}


//minify css
function minifyCSS() {
	return lazypipe()
		.pipe(mincss());
}

//minify js
function minifyJS() {
	return lazypipe()
		.pipe(uglify());
}


//helper function for starting a build function
function startBuild(name, args) {
	args = args || [];
	if (build[name] != undefined) {
		return build[name].apply(this, args);
	}
}


//helper function for watching builds based on resource type
function watchBuild (name, src) {
	if (!src) src = config.paths.src + name + '/*';
	watcher(src, function(){
		startBuild(name);
	});
}
//watch sass/css
function watchCSS(){
	watchBuild('css', config.paths.src + 'css/*.{css,scss}');
}

//watch vendor js
function watchVendor(){
	var src = [
		config.paths.src + 'js/*', //non packaged js
		config.paths.bowerDir + '**/*' //bower deps		
	];

	watchBuild('vendor', src);
}

//watch images
function watchImg() {
	watchBuild('img');
}

//watch fonts
function watchFonts() {
	watchBuild('fonts');
}

//watch bundled files (might be done inside bundle)
function watchJS(){
	//bundling uses a different type of watching mechanism
	//so we'll just call the function with the watch flag set to true
	startBuild('js', [true]);
}

//watch html files
function watchHtml(){
	var apps_src = config.paths.src + 'apps/**/*.html';	
	watchBuild('html', apps_src);
}


