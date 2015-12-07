describe('Seven segment display directive', function () { 
	var HTML_WITH_REQUIRED_ATTRIBUTES = '<g class="seven-segment-display" data-digits="3" data-value="123"></g>',
		HTML_WITH_ALL_ATTRIBUTES = '<g class="seven-segment-display" data-digits="3" data-value="123" data-x="5" data-y="10" data-show-background="true"></g>',
		$compile,
		$scope;
	
	beforeEach(module('dashboard-ui'));

	beforeEach(inject(function ($injector) {
		$compile = $injector.get('$compile');
		$scope = $injector.get('$rootScope').$new();
	}));
	
	it('should have proper values of not requred (calculated) parameters', function () {
		var scope = getElementScope(HTML_WITH_REQUIRED_ATTRIBUTES, $compile, $scope);
		expect(scope.x).toEqual(0);
        expect(scope.y).toEqual(0);
        expect(scope.showBackground).toEqual(false);
	});
	
	it('should have proper values of given parameters', function () {
		var scope = getElementScope(HTML_WITH_ALL_ATTRIBUTES, $compile, $scope);
		expect(scope.value).toEqual(123);
		expect(scope.digits).toEqual(3);
		expect(scope.x).toEqual(5);
        expect(scope.y).toEqual(10);
        expect(scope.showBackground).toEqual(true);
	});
});