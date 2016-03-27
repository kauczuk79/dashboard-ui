module.exports = function(config) {
  config.set({
    basePath: '..',
    frameworks: ['jasmine'],
	files: [
		'node_modules/angular/angular.js',
		'node_modules/d3/d3.js',
		'node_modules/angular-route/angular-route.js',
		'node_modules/angular-mocks/angular-mocks.js',
		'dist/dashboard-ui.js',
        'tests/unit/**/*.js',
		'tests/unit/*.js'
	],
	reporters: ['mocha'],
	//browsers: ['Chrome', 'Firefox', 'IE'],
	browsers: ['Firefox'],
    singleRun: false
  });
};