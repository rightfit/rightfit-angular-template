var conf = require('./config.js');
var express = require('express');
var proxy = require('express-http-proxy');
var argv = require('minimist')(process.argv.slice(2));

var serverConf = conf.server || {}; 
var ENV = argv['p'] ? 'production':'development'; 
var PORT = argv['port'] || serverConf.port || 80;
var src = argv['_'][0] || 'app';

var app = express();

app.use('/' + (conf.paths[ENV].resAlias || conf.resPrefix ||  'public' ), express.static(conf.paths[ENV].publicBase));
app.use(express.static(conf.paths[ENV].base + 'apps/' + src));
if (serverConf.proxy && serverConf.proxy.host) {
	app.use(serverConf.proxy.path || '/api', proxy(serverConf.proxy.host, {
	forwardPath: function(req, res) {
		return require('url').parse(req.url).path;
    }
	}));
}
app.use(function(req, res, next) {
  res.status(404).send('404 page not found');
});

var server = app.listen(PORT, function () {
	if (serverConf.proxy && serverConf.proxy.host) {
		console.log('Server proxy from url' + (serverConf.proxy.path || '/api') + 'to host ' + serverConf.proxy.host)
	}
    console.log('Server listening on port '+ PORT);
});

server.on('error', function (error) {
	var message = ''; 
	switch(error.code) {
		case "EADDRINUSE":
			message = "Port:" + error.port  + " is already in use.\n\
You can specify another port on the config.js in the server.port property.\n\
Alternatively, you can choose a port with the --port parameter (e.g: --port=\"8000\")";
			break;
		default:
			message = "Error setting up server: " + error.message;
	}
	console.log(message);

});