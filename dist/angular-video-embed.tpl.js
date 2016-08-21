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
				url: "@?",
				video: "=?",
			},
			link: function ($scope) {

				var validServices = ["youtube", "vimeo"];
				
				function init () { 
					checkScopeIsValid();
					buildVideoFromUrl();
					checkServiceIsValid();
					buildUrlForVideo();
				}

				function buildVideoFromUrl () {
					if (!$scope.video && !!$scope.url) {
						var results;
						$scope.video = {};

						//test for youtube
						results = $scope.url.match(/https?:\/\/.*?(youtube|youtu\.be).*v=([^\?&]*)/);
						if (results) {
							$scope.video.service = (["youtube", "youtu.be"].indexOf(results[1]) >= 0 ? "youtube" : undefined);
							$scope.video.id = results[2];
						}

						//test for vimeo
						results = $scope.url.match(/https?:\/\/.*?(vimeo)\.com\/([^?&]*)/);
						if (results) {
							$scope.video.service = (["vimeo"].indexOf(results[1]) >= 0 ? "vimeo" : undefined);
							$scope.video.id = results[2];
						}
					}
				}

				function buildUrlForVideo () {
					var url = "";
					switch ($scope.video.service) {
					case "youtube":
						url = "https://www.youtube.com/embed/" + $scope.video.id;
						break;
					case "vimeo":
						url = "https://player.vimeo.com/video/" + $scope.video.id + "?color=d4bd28&portrait=0&badge=0";
						break;
					default:
						throwUnknownService($scope.video.service);
						break;
					}
					$scope.video.url = $sce.trustAsResourceUrl(url);
				}

				function checkScopeIsValid () {
					if (!$scope.url && !$scope.video) {
						throw "Neither video or url is defined";
					}

					return true;
				}

				function checkServiceIsValid () {
					var valid = validServices.indexOf($scope.video.service);
					if (valid < 0) {
						throwUnknownService($scope.video.service);
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