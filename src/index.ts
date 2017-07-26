
declare var angular: angular.IAngularStatic;

import { Video } from "./videos/Video";
import { VideoFactory } from "./factories/VideoFactory";
import { YouTubeVideo } from "./videos/YouTubeVideo";

const templateUrl = require("./index.html");

var app = angular.module("zen.video-embed", [
]);

class ZenVideoEmbedService {
	getVideoFromUrl(url: string): Video {
		if (typeof url === "undefined") {
			return undefined;
		}
		return VideoFactory.createFromUrl(url);
	};
	getUrlFromVideo(video: Video): string {
		return video.getVideoUrl();
	};
}

app.service("ZenVideoEmbedService", ZenVideoEmbedService);

app.directive("zenVideoEmbed", ["$sce", "ZenVideoEmbedService", function ($sce: ng.ISCEService, ZenVideoEmbedService: ZenVideoEmbedService) { 
	interface IZenVideoEmbedScope {
		url: string;
		video: Video;
		$watch: Function;
		getTrustedVideoUrl: (video: Video) => any;
	}

	return {
		restrict: "EA",
		templateUrl: templateUrl,
		scope : {
			url: "@",
			video: "=?",
		},
		link: function ($scope: IZenVideoEmbedScope) {

			function init () { 
				$scope.getTrustedVideoUrl = getTrustedVideoUrl;

				if (!$scope.url && $scope.video instanceof Object) {
					$scope.video = VideoFactory.create($scope.video.id, $scope.video.service);
				} else if ($scope.url) {
					$scope.video = buildVideoFromUrl($scope.url);
				}

				console.log($scope.video);

				defineListeners();
			}

			function onChange (n: string, o: string) {
				if(n!==o) {
					$scope.video = buildVideoFromUrl(n);
				}
			}

			function defineListeners () {
				$scope.$watch(function () {
					return $scope.url;
				}, onChange);
			}

			function buildVideoFromUrl (url: string): Video {
				if (url) {
					return ZenVideoEmbedService.getVideoFromUrl(url);
				} else {
					return null;
				}
			}

			function getTrustedVideoUrl (video: Video): string {
				return video ? $sce.trustAsResourceUrl(video.getVideoUrl()) : null;
			}

			init();
		}
	};
}]);
