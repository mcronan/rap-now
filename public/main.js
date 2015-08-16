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
	.when('/templates/secondrap', {
		templateUrl : 'templates/secondrap',
		controller : 'rapController'
	})
	.when('/game', {
		templateUrl : 'templates/secondrap',
		controller : 'rapController'
	})
})

rapApp.factory('rapFactory', function($resource) {

	// make a basline route for database
	var model = $resource('/api/raps')
	var userModel = $resource('/api/userIDs')
	return {
		model  : model, 
		// model.query returns an array of objects
		raps   : model.query(),
		// this is not an array, cannot push to it
		userModel  : userModel
	}
})

rapApp.controller('rapController', function($scope, $timeout, $routeParams, $http, rapFactory) {
		
	// list of raps from rapFactory
	$scope.raps = rapFactory.raps;
	$scope.userModel = rapFactory.userModel;
	// not using
	$scope.user ={}
	var userID = $routeParams.uniqueID
	console.log(userID)

	// match p1 userID with p1 rap
	// show p1's rap

	// add rap to doc 
	$scope.addRap = function() {

	// sort on the front end, we only have once pice of data
	$scope.currentUser = userID;
	$scope.newRap.creator = $scope.currentUser;

		// this.newRap.creator=[$scope.user._id]
								// this = $scope
		var userRap = new rapFactory.model(this.newRap)
		// sends POST to api/raps
			userRap.$save(function(returnData) {
				rapFactory.raps.push(returnData)
				console.log("this is return", returnData)
				console.log("this is return + creator", returnData.creator)
				if(userID === returnData.creator) {
					console.log("hello")
				}
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
		// else if((theTime === 0) && ($scope.newRap.creator ===)
		
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
 		// our user ID from URL
	
				// .then is similar to the success object in Ajax
				// this is not the $resource model, so it doesn't 
				// use the api/raps base route
	$http.post('/game', {userID : userID}).then(function(returnData){
			// rapFactory.userModel = returnData.data.userID
			// console.log("uniqueID", returnData.data.userID)
			console.log('rapCreator', returnData)
			
		})

	// get _ID to feed createRap
	// sends request to userRoute with the url ID
	// rapFactory.userModel.get({userID : $routeParams.uniqueID}).then(function(data){
	// 	$scope.user = data;
	// 	// this will fire when add rap fires
	// })
	// put in with raps to send over to server


})
