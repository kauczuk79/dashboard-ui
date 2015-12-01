/*global describe, it, beforeEach, inject, expect, d3, spyOn*/
describe('Analog gauge directive', function () {
	var element,
		scope;

	function d3_selection_prototype_node() {
		return {
			getBoundingClientRect: function () {
				return { left: 0, top: 0 };
			}
		};
	}

	beforeEach(module('dashboard-ui'));
	beforeEach(inject(function (_$compile_, _$rootScope_) {
		var $compile,
			$scope;
		$compile = _$compile_;
		$scope = _$rootScope_.$new();
		d3.selection.prototype.node = d3_selection_prototype_node;
		element = angular.element('<g class="analog-gauge" data-max-value="100" data-start-angle="-100" data-value="50" data-indicator-origin-x="100" data-indicator-origin-y="100"><g id="indicator"><rect y="15" x="97.5" width="5" height="85" fill="black"></rect></g></g>');
		$compile(element)($scope);
		$scope.$digest();
		scope = element.isolateScope();
	}));

	it('should have proper values of not requred (calculated) parameters', function () {
		expect(scope.endAngle).toEqual(100);
		expect(scope.minValue).toEqual(0);
	});

	it('should have proper values of given parameters', function () {
		expect(scope.value).toEqual(50);
		expect(scope.startAngle).toEqual(-100);
		expect(scope.maxValue).toEqual(100);
		expect(scope.indicatorOriginX).toEqual(100);
		expect(scope.indicatorOriginY).toEqual(100);
	});
	
	it('should call updateGaugeAngle when data-value was changed', function() {
		spyOn(scope.$$watchers[0], 'fn').and.callThrough();
		scope.value = 10;
		scope.$digest();
		expect(scope.$$watchers[0].fn).toHaveBeenCalled();
	});
});