var config = require("../config").options;
var args = require("minimist")(process.argv.slice(2));

module.exports = {
	debug: args.production ? !args.production : (config.debug || true),
	env: args.production ? 'production' : (config.debug ? 'development' : 'production')   
}