angular.module('comrise.shared')
.factory('Auth', ['URLS', '$localStorage', 'authService', '$http','$rootScope', '$q',
                  function (URLS, $localStorage, authService, $http, $rootScope, $q ) {
	var urlBase64Decode = function (str) {
        var output = str.replace('-', '+').replace('_', '/');
        switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += '==';
                break;
            case 3:
                output += '=';
                break;
            default:
                throw 'Illegal base64url string!';
        }
        return window.atob(output);
    }

    var getClaimsFromToken = function () {
        var token = $localStorage.token;
        var user = {};
        if (typeof token !== 'undefined') {
            var encoded = token.split('.')[1];
            user = JSON.parse(urlBase64Decode(encoded));
        }
        return user;
    }

    var tokenClaims = {}//getClaimsFromToken();
    
	var _successAuth = function successAuth(res) {
        $localStorage.token = res.data.token;
        /*
	        Calling loginConfirmed here causes concurrency issues with mdDialog service
	        since loginconfirmed will trigger the re-send of requests, 
	        which could potentially broadcast an event that tries to open a new mdDialog.
	        When that happens, it will attempt to automatically close any open dialog,
	        but since our dialog was already closing, it creates a conflict where the dialog stays 
	        rendered but pushed out of the mdDialog stack, causing it to become non responsive.
	        In order to avoid this behavior, it's better to call this manually from the controller that
	        opened the modal on the first place
        */
        //authService.loginConfirmed(); 
        console.log('login success');
        return res.data;
    }
	
	var _successSignup = function (res){
	
        $localStorage.token = res.data.token;
        //authService.loginConfirmed();
        $rootScope.$broadcast('event:auth-signupConfirmed', {});
        console.log('signup success');
        return res.data;
    }
	var _successConfirm = function(res) {
        //$localStorage.token = res.token;
        //broadcast this as we cannot alter authService.
        $rootScope.$broadcast('event:auth-confirmConfirmed', {});
        console.log('confirm success');
        return res.data;
    }
	var _authConfig = {
			ignoreAuthModule:true 
    	}
	
	return {
		signup: function (data) {
            return $http.post(URLS.BASE_API + '/signup', data, _authConfig)
            	.then(_successSignup)
            	.catch(function (res) {
            		//we want to return plain data to any chained error handler            		
            		return $q.reject(res.data);
            	});
        },
        signin: function (data) {
        	
            return $http.post(URLS.BASE_API + '/signin', data, _authConfig)
            	.then(_successAuth)
            	.catch(function (res) {
            		//we want to return plain data to any chained error handler      
            		return $q.reject(res.data);
            	});
        },
        confirm: function (data) {
            return $http.post(URLS.BASE_API + '/confirm', data, _authConfig)
            	.then(_successConfirm)
            	.catch(function (res) {
            		//we want to return plain data to any chained error handler            		
            		return $q.reject(res.data);
            	});
        },
        logout: function () {
            tokenClaims = {};
            return $http.post(URLS.BASE_API + '/signout', {}, _authConfig)
            	.then(function () {
            		delete $localStorage.token;
            	});            
        },
//        restricted: function (data, success, error) {
//            $http.post(URLS.SEARCH_API + '/restricted', data).success(success).error(error)
//        },
        getTokenClaims: function () {
            return tokenClaims;
        },
        //wrapper for the authService common methods
        loginCancelled: function () {
        	authService.loginCancelled();
        },
        loginConfirmed: function () {
        	authService.loginConfirmed();
        }
	};
	
}])
/**
 * This interceptor will handle appending the token to the header. Also it will delete token when the response is 401 (User not found) or 
 * 419 (Expired)
 */
.factory('AuthInterceptor', ['$q',  '$localStorage', '$rootScope', 'httpBuffer',
                             function ($q,$localStorage, $rootScope, httpBuffer) {
    return {
        request: function (config) {

            config.headers = config.headers || {};
            if ($localStorage.token) {
//                config.headers.Authorization = 'Bearer ' + $localStorage.token;
            	config.headers.Authorization = $localStorage.token;
            }
            return config;
        },
        responseError: function (response) {
            if (response.status === 401) {// || response.status === 403) {
                delete $localStorage.token;

            } else if (response.status === 419) {
            	delete $localStorage.token;
            //response when the account is locked and needs to be confirmed to proceed
            } else if (response.status === 423) {
            	var deferred = $q.defer();
            	httpBuffer.append(response.config, deferred);
            	console.log(httpBuffer);
            	console.log(deferred);
            	
                $rootScope.$broadcast('event:auth-confirmRequired', response);
                return deferred.promise;
            }
            return $q.reject(response);
        }
    };
}])