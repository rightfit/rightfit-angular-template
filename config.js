
var bundleConf = require('./bundles.js');

var buildDev = './dist/debug/';
var buildProd = './dist/production/';
var src = './src/';
var bowerDir = './bower_components/';
var resPrefix = 'public/' //trailing slash is required


module.exports = {

	paths : {
		src: src,		
		bowerDir: bowerDir,
		resPrefix: resPrefix,
		development: {
			base: buildDev,
			publicBase: buildDev + resPrefix,
			appJs: buildDev + resPrefix + 'appJS',
			js: buildDev + resPrefix + 'js',
			css: buildDev + resPrefix + 'css',
			img: buildDev + resPrefix + 'img',
			fonts: buildDev + resPrefix + 'fonts',
		},
		production: {
			base: buildProd,
			publicBase: buildProd + resPrefix,
			appJs: buildProd + resPrefix + 'appJS',
			js: buildProd + resPrefix + 'js',
			css: buildProd + resPrefix + 'css',
			img: buildProd + resPrefix + 'img',
			fonts: buildProd + resPrefix + 'fonts',
		}
				
	},
	options : {
		debug: true
	},
	bundles: bundleConf.bundles,
	styles: bundleConf.styles,
	server: {
		port: 8080,
		// You can specify an external host if needed, perhaps for your API calls for instance
		// a matching path will trigger the proxy request
		// proxy: {
		// 	host: "proxy.host.here.com",
		// 	path: "/api"
		// }
	}
	

}