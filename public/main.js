var rapApp = angular.module('rapApp', ['ngResource', 'ngRoute']);

rapApp.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl : '/templates/firstrap',
		controller : 'rapController'
	})
	.when('/:uniqueID', {
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

	// features dependent on imer
	$scope.showinput = true;
	$scope.showoutput = false;
	$scope.timeInS = 4000;
	$scope.showButton = false;
	

// countdown timer
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
			// show FB buttons
			$scope.showButton = true;
		}
		
	}
		$timeout(countDown, 1000)

	// show FEED popup
	$scope.popup = function() {
		console.log("popup")
			window.open("https://www.facebook.com/dialog/feed?app_id=473646152796474&display=popup&caption=An%20example%20caption&link=http://rap-now.herokuapp.com/&redirect_uri=http://rap-now.herokuapp.com/", "height=236, width=516") 
		}

	//  to close the popup when it works
	// Redirect to http://oursite.com/#close_window. Then on your site's homepage, include something like this:
	// 	if (window.location.hash == '#close_window') window.close();.


	// show the SEND popup
	$scope.PmPopup = function() {
		console.log("PmPopup")
			window.open("https://www.facebook.com/dialog/send?app_id=473646152796474&display=popup&caption=An%20example%20caption&link=https://rap-now.herokuapp.com&redirect_uri=https://rap-now.herokuapp.com", "height=236, width=516") 
		}
})
