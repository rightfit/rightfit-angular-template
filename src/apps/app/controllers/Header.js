
angular.module('app')
	.controller('Header', ['$scope','$mdSidenav', 
       function ($scope, $mdSidenav) {
			this.options = {};
			this.navBarToggle = function () {
				$mdSidenav('mainLeftNav').toggle(); //returns promise fyi
			}
	}])