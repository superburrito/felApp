'use strict';

var app = angular.module('felApp', ['ngMaterial'])
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('pink')
    .accentPalette('orange');
})
.controller('MainCtrl', function ($scope, $http, $window) {

	$scope.setTraversed = false;

	// Image URLs for Image Sets
	var imageSet1 = {
		name: 'extraordinary set',
		set: [
			'https://s13.postimg.org/bh6j18qfr/Turkey_4.jpg',
			'https://s13.postimg.org/6wkcmb6qf/Turkey_3.jpg',
			'https://s13.postimg.org/f3ccdvwt3/Turkey_2.jpg',
			'https://s13.postimg.org/69lfws9uf/Turkey_1.jpg',
			'https://s13.postimg.org/gkxspg1jr/Tunisia_5.jpg',
			'https://s13.postimg.org/47kyijbvb/Tunisia_4.jpg',
			'https://s13.postimg.org/w8yzw8h5j/Tunisia_3.jpg',
			'https://s13.postimg.org/bdhayqac7/Tunisia_2.jpg',
			'https://s13.postimg.org/ihz47rhlj/Tunisia_1.jpg',
			'https://s13.postimg.org/u8d1p5adz/Russia_4.jpg',
			'https://s13.postimg.org/rsb8basbb/Russia_3.jpg',
			'https://s13.postimg.org/ckv8qy0gn/Russia_2.jpg',
			'https://s13.postimg.org/m6ot78rmf/Russia_1.jpg',
			'https://s13.postimg.org/j147h1907/Peru_4.jpg',
			'https://s13.postimg.org/khfpz6bx3/Peru_3.jpg',
			'https://s13.postimg.org/842vs9m8n/Peru_2.jpg',
			'https://s13.postimg.org/yqfch8qfr/Peru_1.jpg',
			'https://s13.postimg.org/4zwt97utz/Morocco_4.jpg',
			'https://s13.postimg.org/3m56dwvkn/Morocco_3.jpg',
			'https://s13.postimg.org/vnj7rm0uv/Morocco_2.jpg',
			'https://s13.postimg.org/3op20qz87/Morocco_1.jpg',
			'https://s13.postimg.org/ff2zi4s0n/Israel_4.jpg',
			'https://s13.postimg.org/ee2qt0b13/Israel_3.jpg',
			'https://s13.postimg.org/b8i52ssev/Israel_2.jpg',
			'https://s13.postimg.org/jfa4udihj/Israel_1.jpg'
		]
	}

	var imageSet2 = {
		name: 'ordinary set',
		set: [
			'https://s13.postimg.org/yagwzkg6v/US_4.jpg',
			'https://s13.postimg.org/4jtsdsv7b/US_3.jpg',
			'https://s13.postimg.org/6po38aynr/US_2.jpg',
			'https://s13.postimg.org/fyuuw5wxj/US_1.jpg',
			'https://s13.postimg.org/x0noy9bsn/UK_4.jpg',
			'https://s13.postimg.org/u7uhe8bg7/UK_3.jpg',
			'https://s13.postimg.org/40tai9t6f/UK_2.jpg',
			'https://s13.postimg.org/mhnp9394n/UK_1.jpg',
			'https://s13.postimg.org/g58jz962f/Thailand_4.jpg',
			'https://s13.postimg.org/kfn7uub5j/Thailand_3.jpg',
			'https://s13.postimg.org/efzgr6qd3/Thailand_2.jpg',
			'https://s13.postimg.org/eu0sqsagn/Thailand_1.jpg',
			'https://s13.postimg.org/nqbkuq12v/Malaysia_5.jpg',
			'https://s13.postimg.org/qyknlicqf/Malaysia_4.jpg',
			'https://s13.postimg.org/b1lvoskc7/Malaysia_3.jpg',
			'https://s13.postimg.org/va99aijnb/Malaysia_2.jpg',
			'https://s13.postimg.org/f0j37m8zb/Malaysia_1.jpg',
			'https://s13.postimg.org/z96gtc8af/Canada_4.jpg',
			'https://s13.postimg.org/ny3t4z1fb/Canada_3.jpg',
			'https://s13.postimg.org/xjxdl9sl3/Canada_2.jpg',
			'https://s13.postimg.org/kh1r202d3/Canada_1.jpg',
			'https://s13.postimg.org/wwygvqvp3/Australia_4.jpg',
			'https://s13.postimg.org/vvy86mepj/Australia_3.jpg',
			'https://s13.postimg.org/laiy8cxrr/Australia_2.jpg',
			'https://s13.postimg.org/i4yci5f5j/Australia_1_3_59_14_PM.jpg'
		]
	}

	// Randomise starting set
	var startingSet = imageSet1;
	var endingSet = imageSet2;
	var dice = Math.random();
	if (dice >= 0.5) {
		startingSet = imageSet2;
		endingSet = imageSet1;
	} 
	var currentSet = startingSet;

	// Set up logging
	var recordedTimes = [];
	var idx = 0;
	var imageLoadedTime = new Date();
	$scope.currentImageSrc = currentSet.set[idx];

	$scope.loadNextImage = function () {
		// Update image, reset time counter
		idx += 1;
		$scope.currentImageSrc = currentSet.set[idx];
		
		// Get time difference and log it		
		var imageSwitchedTime = new Date();
		var secondsSpent = (imageSwitchedTime.getTime() - imageLoadedTime.getTime())/1000;
		imageLoadedTime = imageSwitchedTime;

		recordedTimes.push({
			setName: currentSet.name,
			imageIndex: idx,
			imageUrl: currentSet.set[idx-1],
			seconds: secondsSpent
		})

		console.log(recordedTimes);

		var apiUrlPOST = '';

		// If two sets have been traversed
		if (currentSet == endingSet && idx > currentSet.set.length -1) {
			$scope.testCompleted = true;
			$window.localStorage.setItem('felApp-record', JSON.stringify(recordedTimes));
		/*
			return $http({
  			method: 'POST',
  			url: apiUrlPOST,
				data: { recordedInfo: JSON.stringify(recordedTimes) },
			})
			.then(function (response) {
				console.log("POST sent.");
				if(response) {
					console.log("Response is:" + response);
				}
			});*/

		// If only one set has been traversed 
		} else if (idx > currentSet.set.length - 1) {
			$scope.setTraversed = true;
		}
	}

	$scope.loadNextSet = function () {
		// Switch to second image set
		currentSet = endingSet;
		// Restart counter
		idx = 0;
		// Load Image, unhide view
		$scope.setTraversed = false;
		$scope.currentImageSrc = currentSet.set[idx-1];
	}

})
