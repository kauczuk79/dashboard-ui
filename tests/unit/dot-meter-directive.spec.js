describe('Dot meter directive', function () { 
	var HTML_WITH_REQUIRED_ATTRIBUTES = '<g class="dot-meter" data-max-value="10" data-value="5"></g>',
		HTML_WITH_ALL_ATTRIBUTES = '<g class="dot-meter" data-min-value="10" data-max-value="100" data-value="20" data-x="5" data-y="10"></g>',
		$compile,
		$scope;
	
	beforeEach(module('dashboard-ui'));

	beforeEach(inject(function ($injector) {
		$compile = $injector.get('$compile');
		$scope = $injector.get('$rootScope').$new();
	}));
	
	it('should have proper values of not requred (calculated) parameters', function () {
		var scope = getElementScope(HTML_WITH_REQUIRED_ATTRIBUTES, $compile, $scope);
		expect(scope.minValue).toEqual(0);
		expect(scope.x).toEqual(0);
		expect(scope.y).toEqual(0);
	});
	
	it('should have proper values of given parameters', function () {
		var scope = getElementScope(HTML_WITH_ALL_ATTRIBUTES, $compile, $scope);
		expect(scope.value).toEqual(20);
		expect(scope.maxValue).toEqual(100);
		expect(scope.minValue).toEqual(10);
		expect(scope.x).toEqual(5);
		expect(scope.y).toEqual(10);
	});
	
	it('should call updateValue when data-value was changed', function () {
		var scope = getElementScope(HTML_WITH_REQUIRED_ATTRIBUTES, $compile, $scope);
		spyOn(scope.$$watchers[0], 'fn').and.callThrough();
		scope.value = 10;
		scope.$digest();
		expect(scope.$$watchers[0].fn).toHaveBeenCalled();
	});
});