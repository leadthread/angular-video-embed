(function (angular) {
	"use strict";

	var app = angular.module("test", [
		"zen.video-embed"
	]);

	app.controller("testController", ["$scope", function ($scope) {
		function init () {
			defineScope();
			$scope.onPlayed = function() {
				console.log("played");
			}
		}

		function defineScope () {
			$scope.videosAsObj = [
				{
					id: "49222355",
					service: "vimeo",
				}, 
				{
					id: "9af6f97b",
					service: "viddler",
				}, 
				{
					id: "iNJdPyoqt8U",
					service: "youtube",
				}
			];

			$scope.videosAsUrl = [
				{
					url: "https://youtube.com/watch?v=iNJdPyoqt8U&rel=0",
				},
				{
					url: "https://www.viddler.com/embed/9af6f97b",
				},
				{
					url: "https://vimeo.com/49222355",
				}
			];
		}

		init();
	}]);
})(angular);