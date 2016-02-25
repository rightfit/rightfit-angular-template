# Angular materials template 
#### Template for developing RESTless Single Page Applications powered by NodeJS. 
#### Configured to pre-compile Sass and ES2015 files and to minimize production-ready code.
#### It includes AngularJS and several commonly used modules such as ui-router and ngMaterial for the development of rich and responsive interfaces.

#### Check our [demo over here](http://templatedemo.rightfit.it).

## Setup

#### Install [Node](https://nodejs.org/en/).
#### Download/fork the template and navigate to that directory with a terminal.
#### Install dependencies:
```
npm install //Installs node dependencies
npm install -g bower // Installs bower globally
bower install //Installs bower dependencies
```
**Tip**: Depending on your node installation and environment npm might timeout and do a partial installation. 
	Running `npm install` again usually solves most of the installations issues.

#### Install gulp globally for easy access:
`npm install -g gulp`

## Usage
To build the test template run `npm start`. This process might take around a minute the first time, afterwards it will listen for any changes on the source code and recompile (stop with `Ctrl + C`). After it finishes compiling you can see the results on your [localhost](http://localhost)
From here on you can work on top of the sample application or start from scratch based on the examples provided.

**Note:** When you're ready to deploy your code to a production server, run `gulp build --production` to build minified code. The application will be compiled in the production directory inside the dist directory.   

The sample application contains an example on how to develop a [material's](https://www.google.com/design/spec/material-design/introduction.html#) compliant SPA application with angular routing and RESTless token authentication (you can either sign-in with mock username 'user@auth' and password 'letmein', or just signup).

**Note:** You can run the server and build tools independent of each other, simply run `npm run server` for the node server and `gulp` for the build tools.


## Bundling 
The template is setup to bundle Javascript code specified on the bundles.js file. Simply add the path of all custom js code
needed for your application. You can use the "require" syntax on your source code to avoid needing to include too many js files. Simply include one file on your bundle and from there require all the other needed code. See bundles.js for more details. 

## Server configuration
Configure your hosting service to serve the application's resources:
The template comes with a lightweight Node server for fast development, however it is recommended to use a server application (e.g. Apache, Nginx) to serve static files. 

Configure your server to serve from the (...)/dist/debug/apps/<your-app-name> directory.
Also, set up an Alias for public resources such as vendor Javascript, css and images. By default, they will be under the "/public/" Alias and reside in the (...)/dist/debug/public/ directory. 

## Apache's virtual host configuration example:

```
<VirtualHost *:80>
	ServerName templatedemo.myserver.com
	DocumentRoot /var/www/rightfit-angular-template/dist/debug/apps/app/
	
	Alias /public/	/var/www/rightfit-angular-template/dist/debug/public/
</VirtualHost>
```

To change the value of the source and destination directories you can modify the config.js file, make sure to make a backup to avoid unforseen issues.   



 