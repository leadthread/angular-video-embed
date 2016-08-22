angular.module('zen.video-embed.templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('index.html','<div ng-switch="video.service" style="height: 100%; width: 100%;">\r\n\t<div ng-switch-when="youtube" style="height: 100%; width: 100%;">\r\n\t\t<iframe width="100%" height="100%" ng-src="{{video.url}}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>\r\n\t</div>\r\n\t<div ng-switch-when="vimeo" style="height: 100%; width: 100%;">\r\n\t\t<iframe width="100%" height="100%" ng-src="{{video.url}}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>\r\n\t</div>\r\n\t<div ng-switch-default>\r\n\t\tInvalid Video\r\n\t</div>\r\n</div>');}]);
(function (angular) {
	"use strict";

	var app = angular.module("zen.video-embed", [
		"zen.video-embed.templates"
	]);

	app.factory("zenVideoEmbed", [function () {
		var validServices = ["youtube", "vimeo"];
		
		function testYoutube (video, url) {
			var results = url.match(/https?:\/\/.*?(youtube|youtu\.be).*v=([^\?&]*)/);
			if (results) {
				video.service = (["youtube", "youtu.be"].indexOf(results[1]) >= 0 ? "youtube" : undefined);
				video.id = results[2];
			}
			return video;
		}

		function testVimeo (video, url) {
			var results = url.match(/https?:\/\/.*?(vimeo)\.com\/([^?&]*)/);
			if (results) {
				video.service = (["vimeo"].indexOf(results[1]) >= 0 ? "vimeo" : undefined);
				video.id = results[2];
			}
			return video;
		}
		
		function throwUnknownService (service) {
			throw "Unknown Video Service: \""+service+"\"";
		}

		return {
			getSupportedServices: function () {
				return validServices;
			},
			getVideoFromUrl: function (url) {
				return testYoutube(testVimeo({}, url), url);
			},
			getUrlFromVideo: function (video) {
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
				return url;
			},
			checkServiceIsValid: function (video) {
				var valid = validServices.indexOf(video.service);
				if (valid < 0) {
					throwUnknownService(video.service);
				}
				return true;
			}
		};
	}]);

	app.directive("zenVideoEmbed", ["$sce", "zenVideoEmbed", function ($sce, zenVideoEmbed) { 
		return {
			restrict: "EA",
			templateUrl: "index.html",
			scope : {
				url: "@",
				video: "=?",
			},
			link: function ($scope) {

				function init () { 
					defineListeners();
				}

				function onChange () {
					checkScopeIsValid();
					buildVideoFromUrl();
					buildUrlForVideo();
				}

				function defineListeners () {
					$scope.$watch(function () {
						return $scope.url;
					}, onChange);
				}

				function buildVideoFromUrl () {
					if ($scope.url) {
						$scope.video = zenVideoEmbed.getVideoFromUrl($scope.url);
					}
				}

				function buildUrlForVideo () {
					$scope.video.url = $sce.trustAsResourceUrl(zenVideoEmbed.getUrlFromVideo($scope.video));
				}

				function checkScopeIsValid () {
					if (!$scope.url && !$scope.video) {
						throw "Neither video or url is defined";
					}

					return true;
				}

				init();
			}
		};
	}]);
})(angular);