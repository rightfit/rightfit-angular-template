
angular.module('app')
	.controller('MainContent', ['$scope', '$mdSidenav', 
       function ($scope, $mdSidenav) {
			$scope.cards = [
                {
                	src: '/public/img/SassLogo.png',
                	title: 'Do more with less!',
                	text: 'Make css painless with the use of the built-in Sass pre-compiler. Just write your \
                		.scss files in the CSS folder of your app and they will be compiled into plain CSS.'
                },
                {
                	src: '/public/img/gulpLogo.png',
                	title: 'Automize builds with Gulp',
                	text: 'This template is powered by Gulp\'s tasks builder. Modify config.js to configure the building process.'
                },
                {
                	src: '/public/img/angular-logo.svg',
                	title: 'Easily create materials spec applications',
                	text: 'This template comes with AngularJS and some of its most commonly used modules, such as Material\
                		for seamless implementation of Google\'s Material specification, as well as ui-router for powerful \
                		Single Page Application development.'
                },
                {
                	src: '/public/img/babel.png',
                	title: 'Code with the latest specifications',
                	text: 'Babel support allows developers to code using ECMA2015 standards. The template will compile \
                		unsupported code to standard JavaScript.'
                },
                ]
					
					
			
	}])