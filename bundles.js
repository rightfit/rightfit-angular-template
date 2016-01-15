//Bundles
//define your bundles here and include them on your entry point file with a script tag
//the format of each bundle obj is {entry: glob, out: string} 
//where out: is the name to the combined js file (the one used on the script tag)  
//and entry is a glob (string or array) with the files that make the bundle
//Glob pattern Reference: https://github.com/isaacs/node-glob

module.exports = {
	bundles : [
	   	{ 
	   		out: 'allApps.js',
	   		entry: './src/apps/**/*.module.js' 
	   	},
	   	{ 
	   		out: 'main.js',
	   		entry: './src/apps/{app/app.module.js,SharedModule/shared.module.js}' 
	   	},
	   	{
	   		out: 'mainE2E.js',
	   		entry: '{./src/apps/e2eApp/e2e.module.js,./src/apps/{app/app.module.js,SharedModule/shared.module.js}}'
	   	}
   	],
   	/* For css, just specify an output name and a selection pattern relative to the CSS directory 
   	 * 
   	 *  */
   	styles: {
   		out: 'main.css',
   		select: '**/*.css' //can be an array for more complexity 
   		
   	}
   	
}
