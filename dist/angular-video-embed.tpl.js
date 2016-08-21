angular.module('zen.video-embed.templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('index.html','<div ng-switch="video.service" style="height: 100%; width: 100%;">\r\n\t<div ng-switch-when="youtube" style="height: 100%; width: 100%;">\r\n\t\t<iframe width="100%" height="100%" ng-src="{{video.url}}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>\r\n\t</div>\r\n\t<div ng-switch-when="vimeo" style="height: 100%; width: 100%;">\r\n\t\t<iframe width="100%" height="100%" ng-src="{{video.url}}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>\r\n\t</div>\r\n\t<div ng-switch-default>\r\n\t\tUnknown Video Service: "{{video.service}}"\r\n\t</div>\r\n</div>');}]);
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