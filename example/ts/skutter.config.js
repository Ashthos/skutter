'use strict';

/* global process:true*/

module.exports = {
	/* Root directory from which to search for features */
	featureRootPath: './Features',
	
	/* Libraries to utilise during execution */
	libraryPaths: [
		'./steps/example-steps'
	],

	/* The base url for the site.
	 * Set an environment variable 'webServerBaseUrl' to override
	 */
	get webServerBaseUrl(){ return process.env.webServerBaseUrl || 'chrome://version'; },

	/* The number of separate instances that will be created to run features.
	 * This number will be automatically reduced as necessary down to the total runnable features 
	 * count if higher than required.
	 */
	get threads() { return process.env.threads || 4; },

	/* For build servers etc, this will prevent a run from succeeding if @just has been applied
	 * to any of the features. Useful to prevent accidental check-ins with development @just tags.
	 */
	failAtJustRuns: false,

	/* How chatty the step and action executions are:
		0: Silent - No output
		1: Failure - Only information on why something failed
		2: Test - Details the test being performed
		3: Info - Non-verbose information about the execution process
		4: Diag - Diagnostic (full) information on the execution process.
	 */
	verbosity: 3,

	stub: {
		host: 'localhost',
		port: 9000
	},

	/* Selenium Settings */
	selenium: {
		/* Use a Selenium Grid - Default false to run locally */
		get useGrid(){ return process.env.useGrid || false; },
		/* Grid Url - Only relevant if using a grid */
		gridHubUrl: 'http://grid-server:4444/wd/hub'
	},

	/* Output all generated skutter files */
	outputRootPath: './output/',
	
	/* Tag filters, where the nett effect is to reduce the number of scenarios run.
	 * Only: Exclude anything without one (or more) of the specified tags.
	 * Exclude: Exclude anything with one (or more) of the specified tags.
	 */
	filters: {
		only: [],
		exclude: ["custom-tag-dont-run"]
	}

};