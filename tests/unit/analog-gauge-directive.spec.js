/*global describe, it, beforeEach, inject, expect, d3, spyOn*/
describe('Analog gauge directive', function () {
	var HTML_WITH_REQUIRED_ATTRIBUTES = '<g class="analog-gauge" data-max-value="100" data-start-angle="-100" data-value="50"><g id="indicator"><rect y="15" x="97.5" width="5" height="85" fill="black"></rect></g></g>',
		$compile,
		$scope;

	function d3_selection_prototype_node() {
		return {
			getBoundingClientRect: function () {
				return { left: 0, top: 0 };
			},
			getAttribute: function(attributeName) {
				return null;
			}
		};
	}
	
	function getElementScope(html) {
		var element = angular.element(html);
		$compile(element)($scope);
		$scope.$digest();
		return element.isolateScope();
	}
	
	beforeEach(module('dashboard-ui'));

	beforeEach(inject(function ($injector) {
		$compile = $injector.get('$compile');
		$scope = $injector.get('$rootScope').$new();
		d3.selection.prototype.node = d3_selection_prototype_node;
	}));

	it('should have proper values of not requred (calculated) parameters', function () {
		var scope = getElementScope(HTML_WITH_REQUIRED_ATTRIBUTES);
		expect(scope.x).toEqual(0);
		expect(scope.y).toEqual(0);
		expect(scope.endAngle).toEqual(100);
		expect(scope.minValue).toEqual(0);
	});

	it('should have proper values of given parameters', function () {
		var scope = getElementScope('<g class="analog-gauge" data-x="10" data-y="10" data-min-value="10" data-max-value="100" data-start-angle="-100" data-end-angle="120" data-value="50" data-indicator-origin-x="100" data-indicator-origin-y="100"><g id="indicator"><rect y="15" x="97.5" width="5" height="85" fill="black"></rect></g></g>');
		expect(scope.x).toEqual(10);
		expect(scope.y).toEqual(10);
		expect(scope.value).toEqual(50);
		expect(scope.startAngle).toEqual(-100);
		expect(scope.endAngle).toEqual(120);
		expect(scope.minValue).toEqual(10);
		expect(scope.maxValue).toEqual(100);
		expect(scope.indicatorOriginX).toEqual(100);
		expect(scope.indicatorOriginY).toEqual(100);
	});

	it('should call updateGaugeAngle when data-value was changed', function () {
		var scope = getElementScope(HTML_WITH_REQUIRED_ATTRIBUTES);
		spyOn(scope.$$watchers[0], 'fn').and.callThrough();
		scope.value = 10;
		scope.$digest();
		expect(scope.$$watchers[0].fn).toHaveBeenCalled();
	});
});