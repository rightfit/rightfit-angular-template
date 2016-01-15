
angular.module('app')
	.controller('Auth.Confirm', ['Auth', '$mdDialog', 'baseConfig',
       function (Auth, $mdDialog, baseConfig) {
			var _this = this;
			this.user = {};
			this.confirm = function () {
				_this.errorMessage = null;
				Auth.confirm(this.user)
					.then(function (res) {
						//user was authenticated correctly
						$mdDialog.hide(res);
					}, function (res){
						_this.errorMessage = "Incorrect email or code, try again";
						
					}); 
			};
			this.confirmCancel = function () {
				$mdDialog.cancel();
			}			
			
	}])