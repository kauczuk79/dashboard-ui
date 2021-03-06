describe('Alphanumeric LCD directive', function () {
	var HTML_WITH_REQUIRED_ATTRIBUTES = '<g class="alphanumeric-lcd" data-lines="[\'test\']"></g>',
		HTML_WITH_ALL_ATTRIBUTES = '<g class="alphanumeric-lcd" data-lines="[\'test\']" data-x="10" data-y="10" data-columns="24" data-rows="3" data-show-background="true" data-scale="1.5"></g>',
		$compile,
		$scope;
	beforeEach(module('dashboard-ui'));

	beforeEach(inject(function ($injector) {
		$compile = $injector.get('$compile');
		$scope = $injector.get('$rootScope').$new();
	}));
	
	it('should have proper values of not requred (calculated) parameters', function () {
		var scope = getElementScope(HTML_WITH_REQUIRED_ATTRIBUTES, $compile, $scope);
		expect(scope.parameters.x).toEqual(0);
		expect(scope.parameters.y).toEqual(0);
		expect(scope.parameters.columns).toEqual(16);
		expect(scope.parameters.rows).toEqual(2);
		expect(scope.parameters.showBackground).toEqual(false);
		expect(scope.parameters.scale).toEqual(1.0);
	});

	it('should have proper values of given parameters', function () {
		var scope = getElementScope(HTML_WITH_ALL_ATTRIBUTES, $compile, $scope);
		expect(scope.lines).toEqual(['test']);
		expect(scope.parameters.x).toEqual(10);
		expect(scope.parameters.y).toEqual(10);
		expect(scope.parameters.columns).toEqual(24);
		expect(scope.parameters.rows).toEqual(3);
		expect(scope.parameters.showBackground).toEqual(true);
		expect(scope.parameters.scale).toEqual(1.5);
	});

	it('should call updateGaugeAngle when data-value was changed', function () {
		var scope = getElementScope(HTML_WITH_REQUIRED_ATTRIBUTES, $compile, $scope);
		spyOn(scope.$$watchers[0], 'fn').and.callThrough();
		scope.lines = ['test line'];
		scope.$digest();
		expect(scope.$$watchers[0].fn).toHaveBeenCalled();
	});
});