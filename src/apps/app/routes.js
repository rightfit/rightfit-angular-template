angular.module('app')
	.config(['$stateProvider', '$urlRouterProvider','baseConfig',
	function ($stateProvider, $urlRouterProvider, baseConfig) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
			/*.state('login', {
				url:'/login',
				
				views: {
					content: {
						templateUrl: baseConfig.templatesBase + 'login.html',
						controller: 'Signin as SigninCtrl'
					}
				}
			})*/
			.state('logout', {
				url:'/logout',
				//views:
				controller: ['Auth','$state', function (Auth, $state) {
					Auth.logout()
						.then(function () {
							$state.go('home.default');
						})
				}]
			})
			.state('mainLayout',
			{
				abstract: true,
				url:'/',
				views: {
					'': {
						templateUrl: baseConfig.templatesBase + 'mainLayout.html',
						controller: 'MainLayout as mlCtrl'
					},
					'header@mainLayout': {
						templateUrl: baseConfig.templatesBase + 'mainLayout@header.html', 
						controller: 'Header as hdrCtrl'
					},
					'nav@mainLayout': {
						templateUrl: baseConfig.templatesBase + 'mainLayout@nav.html',
						resolve: {
							menu: [function () {
								//this should return a promise with the menu items
								//this could be fetch from a server
								return [
								{
									name:'HOME',
									state: 'home.default'				
								},
								{
									name:'SETUP',
									state: 'home.setup'				
								},								
								{
									name:'THEMES',
									state: 'home.themes'	
								},
								{
									name:'AUTHENTICATION', 
									state: 'home.auth'	
								}]
								
							}]
						},
						controller: 'SideNavigation as navCtrl'
					},
					'content@mainLayout': {
						template: '<div layout="column" class="overflow-hidden" flex ui-view=""> </div>'						
					}, 
					'footer@mainLayout' : {
						templateUrl: baseConfig.templatesBase + 'mainLayout@footer.html'
					}
					
				},

			})
			.state('home', {	
				abstract: true,
				parent:'mainLayout',
				template: '<md-content md-scroll-y flex layout-padding class="main-content-container">\
					<div ui-view layout="column" flex layout-fill layout-align="top center">\
					</div>\
					<md-content>'
				//templateUrl: baseConfig.templatesBase + 'home.html',
				
			})
			.state('home.default', {
				url: '',
				templateUrl: baseConfig.templatesBase + 'home.default.html',
				controller: 'MainContent'
			})
			.state('home.setup',{
				url: 'setup',
				templateUrl: baseConfig.templatesBase + 'home.setup.html',
			})
			.state('home.themes', {
				url:'themes',
				templateUrl: baseConfig.templatesBase + 'home.themes.html', 
				controller: 'MainContent'
			})
			.state('home.auth', {
				resolve:{
					auth: ['$http', function ($http) {
						return $http.get('/protected');
					}]
						
				},
				url:'auth',
				template: '<h2> You are inside a protected view </h2>'
			})
	}])
/* Routing events handling */
.run(['$rootScope', '$mdComponentRegistry',  
      function ($rootScope, $mdComponentRegistry) {
		$rootScope.$on('$stateChangeSuccess', 
			function (event, toState, toParams, fromState, fromParams) {
				//close side navigation when changing transition
				$mdComponentRegistry.when('mainLeftNav')
					.then(function (nav) {
						nav.close();
					});
		
	})
	 
}])

