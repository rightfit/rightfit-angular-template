'use strict'

angular.module('app', [
    'comrise.shared',
    'ui.router',
    'ngMessages',
    'ngAnimate'
    
])
.config(['$mdThemingProvider', function ($mdThemingProvider){
}])
.run(require('./AuthHandler.js'));

/*load app components using the require syntax 
	for multiple files use bulk-require ( e.g. require('bulk-require')(__dirname, ['./controllers/*']); )
*/
//include themes
require('./themes.js') 
//include constants
require('./constants.js');
//Auth handler
require('./AuthHandler.js');
//include routing
require('./routes.js');
//include controllers
require('bulk-require')(__dirname, ['./controllers/*']);
//include controllers
require('bulk-require')(__dirname, ['./services/*']) ;
