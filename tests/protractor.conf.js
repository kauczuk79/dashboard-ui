exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: ['e2e/**/*.js'],
	framework: 'jasmine2',
	jasmineNodeOpts: {
		showColors: true,
		silent: true,
		defaultTimeoutInterval: 360000,
		print: function () {
		}
	},
	onPrepare: function() {
      var SpecReporter = require('jasmine-spec-reporter');
      // add jasmine spec reporter
      jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));
   }
}