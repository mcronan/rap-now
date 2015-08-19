var rapApp = angular.module('rapApp', ['ngResource', 'ngRoute']);

rapApp.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl : '/templates/firstrap',
		controller : 'rapController'
	})
	.when('index', {
		templateUrl : '/templates/firstrap',
		controller : 'rapController'
	})
	.when('/:uniqueID', {
		templateUrl : '/templates/firstrap',
		controller : 'rapController'
	})
	.when('/rapUrl', {
		templateUrl : 'templates/firstrap',
		controller : 'rapController'
	})
})

rapApp.factory('rapFactory', function($resource) {

	// make a basline route for database
	var model = $resource('/api/raps')
	return {
		model  : model, 
		// model.query returns an array of objects
		raps   : model.query(),
		// this is not an array, cannot push to it
		// userModel  : userModel,
	}
})
// ***************************** timer *****************************

// remember to link this up with other timer

// this used to be on the old timer, keeping it here for
// reference to "document.querySelector"
    // var fiveMinutes = 60 * 1,
    //     display = document.querySelector('#time');
    // startTimer(fiveMinutes, display);


rapApp.controller('rapController', function($location, $scope, $timeout, $routeParams, $http, rapFactory) {

	// not working with prevent default
	$scope.paste = function (e) {
		console.log(e.originalEvent.clipboardData.getData('text/plain'))
    // console.log(e.originalEvent.clipboardData.getData('text/plain'));
}
	// if it has a uniqueID, let it be!
	if(!$routeParams.uniqueID) {
		$location.url('/'+ window.hash)
	}

	// list of raps from rapFactory
	$scope.raps = rapFactory.raps;
	// $scope.userModel = rapFactory.userModel

	// not using
	$scope.user = {};
	var userID = $routeParams.uniqueID
	console.log(userID)

// ***************************** Rap Route *****************************

	$scope.addRap = function() {
		// this keeps the latest rap in the client, ready to 
		// be appended, so the user only sees their latest rap. 
		// Everything else stored in the database any
		var myEl = angular.element( document.querySelector( '#finishedRap' ) );
			// $scope.newRap = ""
			myEl.append($scope.newRap.rap); 
		

		$scope.currentUser = userID;
		// if it can't find it, then set it to an empty object
		$scope.newRap = $scope.newRap || {};
		$scope.newRap.creator = $scope.currentUser;

		var userRap = new rapFactory.model(this.newRap)
			// sends POST to api/raps
				userRap.$save(function(returnData) {
					rapFactory.raps.push(returnData)
					console.log(returnData.raps)
				
					})
			
			// empties the object
			this.newRap = {};
		}

// ***************************** rapUrl Route ***************************
	var myArray = [];
	$scope.newArray = [];
	var gameData = $http.post('/rapUrl', {userID : userID}).then(function(returnData){
		console.log('returnData', returnData)
			for(var key in returnData) {
			myArray.push(returnData[key])
			}	
			var mapper = myArray.map(function(data) {
				console.log("rap map", data.raps)
				$scope.newArray.push(data.raps)
				})
		})

// ***************************** Timer *****************************

	// features dependent on timer
	$scope.showinput = true;
	$scope.showoutput = false;
	$scope.timeInS = 5000;
	$scope.showButton = false;

    // countdown timer
	var countDown = function() {
		var theTime = $scope.timeInS -= 100;
		var timer = $timeout(countDown, 100)
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

	$timeout(countDown, 100)


// ******************** TIMER Other ***********************

// var myDate = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
// console.log(myDate)



// var now = new Date();
// var totalEnd = now.setHours(now.getHours() + 8);
// var time = countdown( null, totalEnd, countdown.HOURS|countdown.MINUTES|countdown.SECONDS );
// alert(time.days);




	// // features dependent on timer
	// $scope.showinput = true;
	// $scope.showoutput = false;
	// $scope.timeInS = 6000;
	// $scope.showButton = false;

 //    // countdown timer


	

	// 	var showtime = function(newTime) {
				
	// 			var countDown = function() {
	// 			var theTime = $scope.timeInS -= 1000;
	// 			var timer = $timeout(countDown, 1000)
	// 			if(theTime === 0) {
	// 				// cancel the timer
	// 				$timeout.cancel(timer)
	// 				// fire addRap() when 0
	// 				$scope.addRap()
	// 				// remove button
	// 				$scope.showinput = false;
	// 				// show new rap
	// 				$scope.showoutput = true;
	// 				// show FB buttons
	// 				$scope.showButton = true;
	// 	} 

	// 		console.log($scope.timeInS)
	// 		var newTime = $scope.timeInS

	// 		var minutes = (newTime/60000)
	// 		var seconds = (newTime/1000)
	// 		console.log(minutes + ':' + seconds)
	// 		}
	// }
	// $timeout(countDown, 1000)
		
















		
// ******************** Adding a scope, directive ***********************
})


		//Directive that returns an element which adds buttons on click which show an alert on click
		// rapApp.directive("addbuttonsbutton", function(){
		// 	var me = "this is me"
		// 	return {
		// 		restrict: "E",
		// 		template: me
		// 	}
		// });


	





	// these don't work with dynamic urls
	// show FEED popup
	// $scope.popup = function() {
	// 	console.log("popup")
	// 		window.open("https://www.facebook.com/dialog/feed?app_id=473646152796474&display=popup&caption=An%20example%20caption&+escape(window.location.href)&redirect_uri=window.location.href", "height=236, width=516")}

	//  to close the popup when it works
	// Redirect to http://oursite.com/#close_window. Then on your site's homepage, include something like this:
	// 	if (window.location.hash == '#close_window') window.close();.


	// show the SEND popup
	// $scope.PmPopup = function() {
	// 	console.log("PmPopup")
	// 		window.open("https://www.facebook.com/dialog/send?app_id=473646152796474&display=popup&caption=An%20example%20caption&link=https://rap-now.herokuapp.com/:uniqueID&redirect_uri=https://rap-now.herokuapp.com/:uniqueID", "height=236, width=516") 
	// 	}


