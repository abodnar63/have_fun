var app = angular.module('crossword', []);

app.controller('CrosswordController', function($scope) {
	var CELL_STATES = {
		active: "active",
		inactive: "inactive"
	}

	//generating crossword cells data
	$scope.grid = {columns: 10, rows: 10};
	$scope.grid.cells = [];

	_.times($scope.grid.rows, function(i) {
		$scope.grid.cells[i] = [];

		_.times($scope.grid.columns, function(j) {
			$scope.grid.cells[i].push({state: CELL_STATES.inactive, row: i, column: j});
		});
	});

	//generating crossword numbers data
	$scope.crossword = {};
	//rename numbers to groups
	//in template display group length instead of numbers
	$scope.crossword.vgroups = _.times($scope.grid.rows, function() { return new Array(); });
	$scope.crossword.hgroups = _.times($scope.grid.columns, function() { return new Array(); });
	
	$scope.updateCellSize = function() {
		$scope.cellSize = ($(".crossword-container").width() / $scope.grid.columns) + "px";
	}

	$scope.cellClick = function(cell) {
		$scope.toggleCellActivation(cell);
	}

	$scope.toggleCellActivation = function(cell) {
		if ($scope.isCellActive(cell)) {
			cell.state = CELL_STATES.inactive;
		} else {
			cell.state = CELL_STATES.active;
		}

		$scope.refresNumbers();
	}

	$scope.isCellActive = function(cell) {
		return cell.state == CELL_STATES.active;
	}

	$scope.refresNumbers = function() {

		$scope.refreshRowNumbers($scope.grid.rows, $scope.grid.columns, $scope.crossword.hgroups, true);
		$scope.refreshRowNumbers($scope.grid.columns, $scope.grid.rows, $scope.crossword.vgroups);
	}

	$scope.getReverse = function(items) {
		return items.slice().reverse();
	}

	$scope.refreshRowNumbers = function(rows, columns, groups, isHorizontal) {
		//refreshing vertical numbers
		_.times(rows, function(i) {
			groups[i] = [];
			var counter = 0;
			_.times(columns, function(j) {
				var cell = $scope.grid.cells[j][i];
				if (isHorizontal) {
					cell = $scope.grid.cells[i][j];
				}
				if ($scope.isCellActive(cell)) {
					counter++;
				} else {
					//if not and previous cells are active, adds new number to horizontal numbers
					if (counter > 0) {
						groups[i].push(counter);
						//reset counter
						counter = 0;
					}
				}
			});
		});
	}

	$scope.setupData = function() {
		$scope.updateCellSize();
	}
	
});