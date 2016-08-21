(function (angular) {
	"use strict";

	var app = angular.module("zen.video-embed", [
		"zen.video-embed.templates"
	]);

	app.directive("zenVideoEmbed", ["$sce", function ($sce) { 
		return {
			restrict: "EA",
			templateUrl: "index.html",
			scope : {
				video:"=",
			},
			link: function ($scope) {

				var validServices = ["youtube", "vimeo"];
				
				function init () { 
					checkServiceIsValid($scope.video);
					buildUrlForVideo($scope.video);
				}

				function buildUrlForVideo (video) {
					var url = "";
					switch (video.service) {
					case "youtube":
						url = "https://www.youtube.com/embed/" + video.id;
						break;
					case "vimeo":
						url = "https://player.vimeo.com/video/" + video.id + "?color=d4bd28&portrait=0&badge=0";
						break;
					default:
						throwUnknownService(video.service);
						break;
					}
					$scope.video.url = $sce.trustAsResourceUrl(url);
				}

				function checkServiceIsValid (video) {
					var valid = validServices.indexOf(video.service);
					if (valid < 0) {
						throwUnknownService(video.service);
					}
					return true;
				}

				//Errors
				function throwUnknownService(service) {
					throw "Unknown Video Service: \""+service+"\"";
				}

				init();
			}
		};
	}]);
})(angular);