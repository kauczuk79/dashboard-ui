describe('Led light directive', function () { 
	var HTML_WITH_REQUIRED_ATTRIBUTES = '<circle class="led-light" data-mode="on" cx="50" cy="50" r="40" fill="green"></circle>',
		HTML_WITH_ALL_ATTRIBUTES = '<circle class="led-light" data-mode="blinking" data-blinking-interval="250" data-blinking-delay="100" data-turn-off-level="0.10" data-turn-on-level="0.9" data-x="5" data-y="10" cx="50" cy="50" r="40" fill="green"></circle>',
		$compile,
		$scope;
	
	beforeEach(module('dashboard-ui'));

	beforeEach(inject(function ($injector) {
		$compile = $injector.get('$compile');
		$scope = $injector.get('$rootScope').$new();
	}));
	
	it('should have proper values of not requred (calculated) parameters', function () {
		var scope = getElementScope(HTML_WITH_REQUIRED_ATTRIBUTES, $compile, $scope);
		expect(scope.blinkingInterval).toEqual(500);
		expect(scope.blinkingDelay).toEqual(0);
		expect(scope.turnOffLevel).toEqual(0.0);
		expect(scope.turnOnLevel).toEqual(1.0);
		expect(scope.x).toEqual(0);
		expect(scope.y).toEqual(0);
	});
	
	it('should have proper values of given parameters', function () {
		var scope = getElementScope(HTML_WITH_ALL_ATTRIBUTES, $compile, $scope);
		expect(scope.mode).toEqual('blinking');
		expect(scope.blinkingInterval).toEqual(250);
		expect(scope.blinkingDelay).toEqual(100);
		expect(scope.turnOffLevel).toEqual(0.1);
		expect(scope.turnOnLevel).toEqual(0.9);
		expect(scope.x).toEqual(5);
		expect(scope.y).toEqual(10);
	});
});