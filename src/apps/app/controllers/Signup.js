
angular.module('app')
	.controller('Auth.Signup', ['Auth', '$mdDialog', 'baseConfig','$rootScope',
       function (Auth, $mdDialog, baseConfig, $rootScope) {
		var _this = this;
		this.user = {};
		this.signup = function (user) {
			_this.errorMessage = null;
			Auth.signup(user)
				.then(function (res) {
					//user account was created successfully
					$mdDialog.hide(res);
				}, function (res){
					_this.errorMessage = res.error || 'Failed to sign up.';
					
				}); 
		};
		this.loginCancel = function () {
			$mdDialog.cancel();
		}	
		this.changeToSignin= function () {
			
			$mdDialog.cancel()
				//according to the docs this should RESOLVE when dialog closes,
				//but after version 0.11 it REJECTS it instead, 
				//might not be an intended behavior and break with newer versions
				.catch(function () {
						var modalConf = {
						templateUrl: baseConfig.modalBase + 'signin.html',	
						clickOutsideToClose:true,
						controller: 'Auth.Signin as signinCtrl',
						
					}
					var modal = $mdDialog.show(modalConf)
					.then(function (res) {
						//if promise gets resolved it means the user has successfully signed up
						//which means we can resolve this promise
						Auth.loginConfirmed();
					},  function () {
						//cancel login
						Auth.loginCancelled();
					});
				})			
		}
			
	}])