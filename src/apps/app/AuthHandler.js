module.exports = ['$rootScope', '$state', '$mdDialog', 'baseConfig','Auth',
      function ($rootScope, $state, $mdDialog, baseConfig, Auth) {
	$rootScope.$on('event:auth-loginRequired', function () {
		console.log('login required');
		//open signin modal
		var modalConf = {
			templateUrl: baseConfig.modalBase + 'signin.html',	
			clickOutsideToClose:true,
			controller: 'Auth.Signin as signinCtrl',
			
		}
		var modal = $mdDialog.show(modalConf)
			.then(function (res) {
				//successfully signed in, emit loginConfirmed event
				Auth.loginConfirmed();
			}, function () {
				//cancel login
				Auth.loginCancelled();
			});
		
		
	});
	$rootScope.$on('event:auth-loginConfirmed', function() {
		console.log('loginConfirmed');
	});
	
	$rootScope.$on('event:auth-loginCancelled', function() {
		console.log('loginCancelled');
	});
	
	$rootScope.$on('event:auth-signupConfirmed', function() {
		console.log('signUp Confirmed');
	});
	
	$rootScope.$on('event:auth-confirmRequired', function() {
		console.log('confirm Requires');
		$mdDialog.cancel();
		var modalConf = {
				templateUrl: baseConfig.modalBase + 'confirm.html',	
				clickOutsideToClose:true,
				controller: 'Auth.Confirm as confirmCtrl',
				
			}

		var modal = $mdDialog.show(modalConf);
	});
	
	$rootScope.$on('event:auth-confirmConfirmed', function() {
		console.log('confirm Confirmed');		
	});
	
	
	$rootScope.$on('$stateChangeError', 
			function (event, toState, toParams, fromState, fromParams, error) {
			console.log(event, error);
	})
}]