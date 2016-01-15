
angular.module('app')
	.controller('MainLayout', ['$scope',  
       function ($scope) { 
			this.themes = 
			[
				'red',
				'pink',
				'purple',
				'deep-purple',
				'indigo',
				'blue',
				'light-blue',
				'cyan',
				'teal',
				'green',
				'light-green',
				'lime',
				'yellow',
				'amber',
				'orange',
				'deep-orange',
				'brown',
				'grey',
				'blue-grey',
			]
			
						
			this.primaryTheme = this.themes[Math.floor(Math.random() * (this.themes.length))];
			this.secondaryTheme = this.themes[Math.floor(Math.random() * (this.themes.length))]; 
	}])