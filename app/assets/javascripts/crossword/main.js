var app = angular.module('crossword', []);

app.controller('CrosswordController', function($scope) {
	$scope.grid = {columns: 30, rows: 30}

	$scope.getNumber = function(value) {
		return new Array(value)
	}

	$scope.getCellSize = function() {
		return ($(".crossword-row").width() / $scope.grid.columns) + "px";
	}

	$scope.cellClick = function(event) {
		$(event.target).toggleClass("active");
	}
});