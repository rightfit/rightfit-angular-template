# Angular materials template 
#### Template for developing RESTless Single Page Applications powered by NodeJS. 
#### Configured to pre-compile Sass and ES2015 files and to minimize production-ready code.
#### It includes AngularJS and several commonly used modules such as ui-router, ui-boostrap and ngMaterial for the development of rich and responsive interfaces.

# Setup

### Install [Node ](https://nodejs.org/en/).
### Download the template and navigate to that directory with a terminal.
### Install dependencies:
```
npm install //Installs node dependencies
npm install -g bower // Installs bower globally
bower install //Installs bower dependencies
```

### Install gulp globally for easy access:
`npm install -g gulp`

### To build and deploy the sample application with a mock authentication backend, just run gulp from the command line:
`gulp `

This command will build compiled code in  debug mode. From there on it will keep listening for any changes done to the source code (stop it with `Ctrl + C`).
To build and deploy with bundled and minification do `gulp publish` instead. 

##Bundling 
The gulpfile is setup to deploy Javascript specified on the bundles.js file. Simply add the path of all custom js code
needed for your application. You can use the "require" syntax on your source code to avoid needing to include too many js files. Simply include one file on your bundle and from there require all the other needed code.

### Configure your hosting service to serve the application's resources:
Configure your server to serve from the (...)/build/debug/ directory. You should be able to see the app in your browser (e.g. http://localhost/apps/app/).
To deploy into different directories you can customize the paths in "gulp.conf.js".

#### Note: Make sure the application has access to the public directory, set up your server to fetch from the public file. Be aware that the url to the public files must match the resource prefix setting on your gulp.conf.js (being "public/" the default value). 

### The sample application contains an example on how to develop a [material's](https://www.google.com/design/spec/material-design/introduction.html#) compliant SPA application with angular routing and RESTless token authentication (you can either sign-in with mock username 'user@user' and password 'letmein', or just signup).

 