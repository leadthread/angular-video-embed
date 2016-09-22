(function (angular) {
	"use strict";

	var app = angular.module("zen.video-embed", [
		"zen.video-embed.templates"
	]);

	app.factory("zenVideoEmbed", [function () {
		var validServices = ["youtube", "vimeo", "viddler"];
		
		function testYoutube (video, url) {
			var results = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&]{10,12})/);
			if (results) {
				video.service = "youtube";
				video.id = results[1];
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

		function testViddler (video, url) {
			var results = url.match(/https?:\/\/.*?(viddler)\.com\/(embed|v)\/([^?&\/]*)/);
			if (results) {
				video.service = (["viddler"].indexOf(results[1]) >= 0 ? "viddler" : undefined);
				video.id = results[3];
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
				if (typeof url === "undefined") {
					return undefined;
				}
				return testYoutube(testVimeo(testViddler({}, url), url), url);
			},
			getUrlFromVideo: function (video) {
				var url = "";
				switch (video.service) {
				case "youtube":
					url = "https://www.youtube.com/embed/" + video.id + "?rel=0";
					break;
				case "vimeo":
					url = "https://player.vimeo.com/video/" + video.id + "?color=d4bd28&portrait=0&badge=0";
					break;
				case "viddler":
					url = "https://www.viddler.com/embed/" + video.id + "/?f=1&player=arpeggio&secret=11469889&hideablecontrolbar=1&make_responsive=0&hideCommentEmbedIfNoComments=1&noControls=true";
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