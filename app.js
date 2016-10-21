'use strict';

var app = angular.module('felApp', ['ngMaterial'])
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('pink')
    .accentPalette('orange');
})
.controller('MainCtrl', function ($scope, $http) {

	$scope.setTraversed = false;

	// Image URLs for Image Sets
	var imageSet1 = {
		name: 'extraordinary set',
		set: [
			'https://s25.postimg.org/rgeylergv/Tunisia_5.jpg',
			'https://s25.postimg.org/7n2uspe33/Tunisia_4.jpg',
			'https://s25.postimg.org/x754z4zgv/Tunisia_3.jpg',
			'https://s25.postimg.org/m8tvgyavj/Tunisia_2.jpg',
			'https://s25.postimg.org/71dvwlj0v/Tunisia_1.jpg',
			'https://s25.postimg.org/xnqclkn7z/Peru_4.jpg',
			'https://s25.postimg.org/ohcnc17db/Peru_3.jpg',
			'https://s25.postimg.org/o5v6z9qxb/Peru_2.jpg',
			'https://s25.postimg.org/ivq87z6of/Peru_1.jpg',
			'https://s25.postimg.org/d8tvai45r/Morocco_4.jpg',
			'https://s25.postimg.org/6weq0o13j/Morocco_3.jpg',
			'https://s25.postimg.org/t9mgnh21b/Morocco_2.jpg',
			'https://s25.postimg.org/q41ux9jf3/Morocco_1.jpg',
			'https://s25.postimg.org/v3zb57p1r/Israel_4.jpg',
			'https://s25.postimg.org/xzcec2t1r/Israel_3.jpg',
			'https://s25.postimg.org/60i8l7rf3/Israel_2.jpg',
			'https://s25.postimg.org/uiexmujdb/Israel_1.jpg',
			'https://s25.postimg.org/5dnx9fjwv/Turkey_4.jpg',
			'https://s25.postimg.org/pz2p1c1hr/Turkey_3.jpg',
			'https://s25.postimg.org/mti3b4ivj/Turkey_2.jpg',
			'https://s25.postimg.org/hw4iq0gwf/Turkey_1.jpg',
			'https://s25.postimg.org/560acx8y7/Russia_4.jpg',
			'https://s25.postimg.org/6mbsv2bv3/Russia_3.jpg',
			'https://s25.postimg.org/e3l0aa1e7/Russia_2.jpg',
			'https://s25.postimg.org/iqr2c1or3/Russia_1.jpg'
		]
	}

	var imageSet2 = {
		name: 'ordinary set',
		set: [
			'https://s25.postimg.org/hccgk16kv/Thailand_4.jpg',
			'https://s25.postimg.org/3k2n25573/Thailand_3.jpg',
			'https://s25.postimg.org/nsq0nv4i7/Thailand_2.jpg',
			'https://s25.postimg.org/djxji1ggf/Thailand_1.png',
			'https://s25.postimg.org/stxep8byn/Canada_4.jpg',
			'https://s25.postimg.org/i8djd85n3/Canada_3.jpg',
			'https://s25.postimg.org/9emmw4iof/Canada_2.jpg',
			'https://s25.postimg.org/6ltfc3ibz/Canada_1.jpg',
			'https://s25.postimg.org/win3oplzj/Australia_4.jpg',
			'https://s25.postimg.org/g8wxltbbj/Australia_3.jpg',
			'https://s25.postimg.org/5nd29t4zz/Australie_2.jpg',
			'https://s25.postimg.org/8iuqueydr/Australia_1.jpg',
			'https://s25.postimg.org/fnck3g5n3/UK_4.jpg',
			'https://s25.postimg.org/lpk6txu33/UK_3.jpg',
			'https://s25.postimg.org/hugsrdaxb/UK_2.jpg',
			'https://s25.postimg.org/a302st6rz/UK_1.jpg',
			'https://s25.postimg.org/yks6gp9cf/US_4.jpg',
			'https://s25.postimg.org/sl4fd1ojz/US_3.jpg',
			'https://s25.postimg.org/toojp0973/US_2.jpg',
			'https://s25.postimg.org/a83u2he33/US_1.jpg',
			'https://s25.postimg.org/3voosnb0v/Malaysia_5.jpg',
			'https://s25.postimg.org/xc8w8t6rz/Malaysia_4.jpg',
			'https://s25.postimg.org/iubp0tfgv/Malaysia_3.jpg',
			'https://s25.postimg.org/dk6q9iv7z/Malaysia_2.jpg',
			'https://s25.postimg.org/7kiz5vafj/Malaysia_1.jpg'
		]
	}

	// Setup for each set, randomise starting set
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
			seconds: secondsSpent
		})
		console.log(recordedTimes);

		// If two sets have been traversed
		if (currentSet == endingSet && idx > currentSet.set.length -1) {
			$scope.testCompleted = true;
			return $http({
  			method: 'POST',
  			url: 'https://spreadsheets.google.com/feeds/list//1/public/basic?alt=json-in-script&callback=1uYLxVUejSUUWpYYxV03gnE6dthI21zJe8ipn_BW2QHM',
				data: { recordedInfo: JSON.stringify(recordedTimes) },
				headers: {
					'Access-Control-Allow-Origin': '*'
				}
			})
			.then(function (response) {
				console.log("POST sent.");
				if(response) {
					console.log("Response is:" + response);
				}
			});
		// If one set has been traversed 
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
		$scope.currentImageSrc = currentSet.set[idx];
	}

});	
