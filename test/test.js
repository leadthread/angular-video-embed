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
			$scope.videos = [{
				id: "49222355",
				service: "vimeo",
			}, {
				id: "TbliHS_5GhM",
				service: "youtube",
			}];
		}

		init();
	}]);
})(angular);