/*global describe, it, beforeEach, inject, expect, d3*/
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
		element = angular.element('<g class="analog-gauge" data-max-value="100" data-start-angle="-100" data-value="50"><g id="indicator"><rect y="15" x="97.5" width="5" height="85" fill="black"></rect></g></g>');
		$compile(element)($scope);
		$scope.$digest();
		scope = element.isolateScope();
	}));

	it('should has got proper values of not requred parameters', function () {
		expect(scope.endAngle).toEqual(100);
		expect(scope.minValue).toEqual(0);
	});

	it('should has got proper values of given parameters', function () {
		expect(scope.value).toEqual(50);
		expect(scope.startAngle).toEqual(-100);
		expect(scope.maxValue).toEqual(100);
	});
});