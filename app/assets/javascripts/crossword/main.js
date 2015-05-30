var app = angular.module('crossword', []);

app.controller('CrosswordController', function($scope) {
	var CELL_STATES = {
		active: "active",
		inactive: "inactive;"
	}

	$scope.grid = {columns: 30, rows: 30}
	$scope.grid.cells = [];
	for (var i=0; i < $scope.grid.rows; i++) {
		$scope.grid.cells[i] = [];

		for (var j=0; j < $scope.grid.columns; j++) {
			$scope.grid.cells[i].push({state: CELL_STATES.inactive});
		}
	}

	$scope.getNumber = function(value) {
		return new Array(value)
	}

	$scope.getCellSize = function() {
		return ($(".crossword-row").width() / $scope.grid.columns) + "px";
	}

	$scope.cellClick = function(cell) {
		if (cell.state == CELL_STATES.active) {
			cell.state = CELL_STATES.inactive;
		} else {
			cell.state = CELL_STATES.active;
		}
	}
});