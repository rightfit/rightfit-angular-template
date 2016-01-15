
angular.module('app')
	.controller('SideNavigation', ['$scope', '$mdSidenav', 'menu', '$state',
       function ($scope, $mdSidenav, menu, $state) {
		this.options = {};
		/* Load menu items*/
		this.options.menu = menu;
		
			$scope.close = function () {
				$mdSidenav('mainLeftNav').close(); //returns promise fyi
			}
			
							
			}])