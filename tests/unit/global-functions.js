var d3_selection_prototype_node = function () {
	return {
		getBoundingClientRect: function () {
			return { left: 0, top: 0 };
		},
		getAttribute: function (attributeName) {
			return null;
		}
	};
};

var getElementScope = function (html, $compile, $scope) {
	var element = angular.element(html);
	$compile(element)($scope);
	$scope.$digest();
	return element.isolateScope();
};