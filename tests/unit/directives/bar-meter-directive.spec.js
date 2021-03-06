describe('Bar meter directive', function () { 
	var HTML_WITH_REQUIRED_ATTRIBUTES = '<g class="bar-meter" data-max-value="100" data-value="50"><rect id="bar" x="10" y="5" width="180" height="30" /></g>',
		HTML_WITH_ALL_ATTRIBUTES = '<g class="bar-meter" data-max-position="150" data-max-value="150" data-min-position="10" data-min-value="-10" data-value="50" data-vertical="true" data-x="10" data-y="10"><rect id="bar" x="10" y="5" width="180" height="30" /></g>',
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
		expect(scope.parameters.maxPosition).toEqual(GET_ATTRIBUTE_MOCK_VALUE);
		expect(scope.parameters.minPosition).toEqual(0);
		expect(scope.parameters.minValue).toEqual(0);
		expect(scope.parameters.vertical).toEqual(false);
	});
	
	it('should have proper values of given parameters', function () {
		var scope = getElementScope(HTML_WITH_ALL_ATTRIBUTES, $compile, $scope);
		expect(scope.parameters.maxPosition).toEqual(150);
		expect(scope.parameters.maxValue).toEqual(150);
		expect(scope.parameters.minPosition).toEqual(10);
		expect(scope.parameters.minValue).toEqual(-10);
		expect(scope.parameters.vertical).toEqual(true);
		expect(scope.parameters.x).toEqual(10);
		expect(scope.parameters.y).toEqual(10);
		expect(scope.value).toEqual(50);
	});
	
	it('should call updateValue when data-value was changed', function () {
		var scope = getElementScope(HTML_WITH_REQUIRED_ATTRIBUTES, $compile, $scope);
		spyOn(scope.$$watchers[0], 'fn').and.callThrough();
		scope.value = 10;
		scope.$digest();
		expect(scope.$$watchers[0].fn).toHaveBeenCalled();
	});
});