(function (angular) {
	"use strict";

	var app = angular.module("test", [
		"zen.video-embed"
	]);

	app.controller("testController", ["$scope", function ($scope) {
		function init () {
			defineScope();
		}

		function defineScope () {
			$scope.videosAsObj = [{
				id: "49222355",
				service: "vimeo",
			}, {
				id: "iNJdPyoqt8U",
				service: "youtube",
			}];

			$scope.videosAsUrl = [{
				url: "https://youtube.com/watch?v=iNJdPyoqt8U&rel=0",
			}, {
				url: "https://vimeo.com/49222355",
			}];
		}

		init();
	}]);
})(angular);