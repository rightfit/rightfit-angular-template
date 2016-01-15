'use strict'

angular.module('comrise.shared', [ 
   'ngMaterial',
   'http-auth-interceptor',
   'ngStorage'])
.constant('sharedConfig', {
	templatesBase: 'templates/' //base url of html templates 
})
.config(['$httpProvider', function($httpProvider){
	//push Authentication Intercept (/services/Auth.svc.js)
	$httpProvider.interceptors.push('AuthInterceptor');
}]);


/*load app components using the require syntax 
	for multiple files use bulk-require
*/
//load constants
require('./constants.js');
//include controllers
require('bulk-require')(__dirname, ['./controller/*']);
//include controllers
require('bulk-require')(__dirname, ['./services/*']);

