
angular.module('app')
.config(['$mdThemingProvider', function ($mdThemingProvider) {
	$mdThemingProvider.alwaysWatchTheme(true);
	
	$mdThemingProvider.theme('cyan')
		.primaryPalette('cyan')
		.accentPalette('red');
	
	$mdThemingProvider.theme('orange')
		.primaryPalette('orange')
		.accentPalette('indigo');
		
	$mdThemingProvider.theme('indigo') 
	.primaryPalette('indigo')
	.accentPalette('orange');
	
	$mdThemingProvider.theme('red')
	.primaryPalette('red')
	.accentPalette('cyan');
	
	$mdThemingProvider.theme('pink')
	.primaryPalette('pink')
	.accentPalette('green');
	
	$mdThemingProvider.theme('purple')
	.primaryPalette('purple')
	.accentPalette('green');
	
	$mdThemingProvider.theme('deep-purple')
	.primaryPalette('deep-purple')
	.accentPalette('green');
	
	$mdThemingProvider.theme('blue')
	.primaryPalette('blue')
	.accentPalette('orange');
	
	$mdThemingProvider.theme('light-blue')
	.primaryPalette('light-blue')
	.accentPalette('orange');
	
	$mdThemingProvider.theme('teal')
	.primaryPalette('teal')
	.accentPalette('orange');
	
	$mdThemingProvider.theme('green')
	.primaryPalette('green')
	.accentPalette('red');
	
	$mdThemingProvider.theme('light-green')
	.primaryPalette('light-green')
	.accentPalette('pink');
	
	$mdThemingProvider.theme('lime')
	.primaryPalette('lime')
	.accentPalette('pink');
	
	$mdThemingProvider.theme('yellow')
	.primaryPalette('yellow')
	.accentPalette('purple');
	
	$mdThemingProvider.theme('amber')
	.primaryPalette('amber')
	.accentPalette('blue');
	
	$mdThemingProvider.theme('deep-orange')
	.primaryPalette('deep-orange')
	.accentPalette('cyan');
	
	$mdThemingProvider.theme('brown')
	.primaryPalette('brown')
	.accentPalette('cyan');
	
	$mdThemingProvider.theme('grey')
	.primaryPalette('grey')
	.accentPalette('brown');

	$mdThemingProvider.theme('blue-grey')
	.primaryPalette('blue-grey')
	.accentPalette('orange');
}])