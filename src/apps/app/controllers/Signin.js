
angular.module('app')
	.controller('Auth.Signin', ['Auth', '$mdDialog', 'baseConfig',
       function (Auth, $mdDialog, baseConfig) {
			var _this = this;
			this.user = {};
			this.signin = function () {
				_this.errorMessage = null;
				Auth.signin(this.user)
					.then(function (res) {
						//user was authenticated correctly
						$mdDialog.hide(res);
					}, function (res){
						_this.errorMessage = "Incorrect email or password, try again";
						
					}); 
			};
			this.loginCancel = function () {
				$mdDialog.cancel();
			}
			this.changeToSignup= function () {
				
				$mdDialog.cancel()
					//according to the docs this should RESOLVE when dialog closes,
					//but after version 0.11 it REJECTS it instead, 
					//might not be an intended behavior and break with newer versions
					.catch(function () {
						var modalConf = {
							templateUrl: baseConfig.modalBase + 'signup.html',	
							clickOutsideToClose:true,
							controller: 'Auth.Signup as signupCtrl',
							
						}
						var modal = $mdDialog.show(modalConf)
						.then(function(res){
							//Manually call login confirmed to avoid concurrency issues
							Auth.loginConfirmed();
						});

					});
								
			}
			
	}])