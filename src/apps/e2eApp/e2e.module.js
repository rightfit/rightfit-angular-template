'use strict'

angular.module('e2e', [
    'app',
    'ngMockE2E'
])
.run(['$httpBackend',function ($httpBackend) {
	
	var users = {
		//usrname	password
		'authUser': {password: 'letmein', Name: 'Admin', admin: true,  active:true},
		'user@auth': {password: 'letmein', Name: 'Auth user', admin: false, active:true}
	};

	var session = {};
	var confirmationCode = {};
	
	function makeid(length = 5)
	{
	    var text = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	    for( var i=0; i < length; i++ )
	        text += possible.charAt(Math.floor(Math.random() * possible.length));

	    return text;
	}
	
	$httpBackend.whenGET('/protected').respond(function (method, url, data, headers, params) {
		var token = headers.Authorization;
		if (!session[token]) {
			return [401]//return forbidden
		}
		else if(users[session[token]].active == false){
			return [423];//logged in but not confirmed 
		}
		else {
			return [200];
		}
	})
	$httpBackend.whenPOST('/api/signout').respond(function (method, url, data, headers, params) {
		var token = headers.Authorization;
		if(token) {
			delete session[token];
		}
		return [200];
	})
	$httpBackend.whenPOST('/api/signin').respond(function (method, url, data, headers, params) {
		var user = angular.fromJson(data);
		if (users[user.email] && users[user.email].password == user.password) {
			var tkn = makeid();
			session[tkn] = user.email; 
			return [200, {token:tkn}];
		}
		else {
			return [401];
		}
	})
	
	$httpBackend.whenPOST('/api/signup').respond(function (method, url, data, headers, params) {
		var user = angular.fromJson(data);
		//Validation
		if (!user.email) {
			return [400, {error: 'Missing email'}];
		}
		
		if (users[user.email]) {
			//user exists already, return error 
			return [400, {error: 'That user already exists'}];			
		}
		else {
			//assuming everything is valid
			//create user
			users[user.email] = {
				password: user.password,
				Name: user.Name,
				admin: false,
				active: false
			}
			
			//login user
			var tkn = makeid();
			session[tkn] = user.email;
			//confirmation code
			var cc =  makeid(16);
			console.log(cc);
			confirmationCode[user.email] = cc;
			return [200, {token:tkn}];
		}
	})
	
	$httpBackend.whenPOST('/api/confirm').respond(function (method, url, data, headers, params) {
		var user = angular.fromJson(data);
		//Validation
		if (!user.email || !user.email) {
			return [400, {error: 'Missing email or code'}];
		}
		
		if (!users[user.email]) {
			return [400, {error: `User ${user.email} doesn't exist `}]
		}
		else if(confirmationCode[user.email] !== user.code){
			return [400, {error: 'Incorrect confirmation code'}]
		}
		else {
			delete confirmationCode[user.email];
			users[user.email].active = true;
			return [200];
		}
			
	})
	
	$httpBackend.whenGET('/^\/public\//').passThrough();
	$httpBackend.whenGET('').passThrough();
}])



/*load app components using the require syntax 
	for multiple files use bulk-require ( e.g. require('bulk-require')(__dirname, ['./controllers/*']); )
*/
//load constants
require('./constants.js')
