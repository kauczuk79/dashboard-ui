/*global describe, it, beforeEach, inject, expect*/
describe('Analog gauge directive', function () {
	var $compile,
		$scope;
	beforeEach(module('dashboard-ui'));
	beforeEach(inject(function(_$compile_, _$rootScope_) {
		$compile = _$compile_;
		$scope = _$rootScope_.$new();
	}))
	
	it('should has got proper default values', function() {
		var element = angular.element('<g class="analog-gauge" data-max-value="100" data-start-angle="-100" data-value="50"><g id="indicator"><rect y="15" x="97.5" width="5" height="85" fill="black"></rect></g></g>'),
			scope;
		$compile(element)($scope);
		$scope.$digest();
		scope = element.isolateScope();
		expect(scope.value).toEqual(50);
		expect(scope.startAngle).toEqual(-100);
		expect(scope.endAngle).toEqual(100);
		expect(scope.maxValue).toEqual(100);
		expect(scope.minValue).toEqual(0);
		//indicator origin is in (0,0) because of no SVG element as a parent of directive
		expect(scope.indicatorOriginX).toEqual(0);
		expect(scope.indicatorOriginY).toEqual(0);
	})
});