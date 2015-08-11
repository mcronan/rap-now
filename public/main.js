var rapApp = angular.module('rapApp', ['ngResource', 'ngRoute']);

rapApp.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl : '/templates/firstrap',
		controller : 'rapController'
	})
})

rapApp.factory('rapFactory', function($resource) {

	// make a basline route for database
	var model = $resource('/api/raps')

	return {
		model  : model, 
		// model.query returns an array of objects
		raps   : model.query()
	}
})



rapApp.controller('rapController', function($scope, $timeout, rapFactory) {

// countdown timer

	
		
	// list of raps from rapFactory
	$scope.raps = rapFactory.raps;

	// add rap to doc 
	$scope.addRap = function() {
								// this = $scope
		var userRap = new rapFactory.model(this.newRap)

		// sends POST to api/raps
			userRap.$save(function(returnData) {
				console.log("hello", returnData)
				rapFactory.raps.push(returnData)
				console.log(rapFactory.raps)
			})		
			// empties the object
			this.newRap = {};
		}

	// for the button
	$scope.showinput = true;
	$scope.showoutput = false;
	$scope.timeInS = 5000;
	
	var countDown = function() {
		var theTime = $scope.timeInS -= 1000;
		var timer = $timeout(countDown, 1000)
			if(theTime === 0) {
			// cancel the timer
			$timeout.cancel(timer)
			// fire addRap() when 0
			$scope.addRap()
			// remove button
			$scope.showinput = false;
			// show new rap
			$scope.showoutput = true;
		}
		
	}
		$timeout(countDown, 1000)
				
})
