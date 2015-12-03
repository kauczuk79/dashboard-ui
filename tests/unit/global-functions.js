var GET_ATTRIBUTE_MOCK_VALUE = 1234567890;
var d3_selection_prototype_node = function () {
	return {
		getBoundingClientRect: function () {
			return { left: 0, top: 0 };
		},
		getAttribute: function (attributeName) {
			return GET_ATTRIBUTE_MOCK_VALUE;
		}
	};
};

var getElementScope = function (html, $compile, $scope) {
	var element = angular.element(html);
	$compile(element)($scope);
	$scope.$digest();
	return element.isolateScope();
};