
declare var angular: angular.IAngularStatic;

import { Video } from "./videos/Video";
import { VideoFactory } from "./factories/VideoFactory";
import { YouTubeVideo } from "./videos/YouTubeVideo";

var app = angular.module("zen.video-embed", [
	"zen.video-embed.templates"
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
		templateUrl: "index.html",
		scope : {
			url: "@",
			video: "=?",
		},
		link: function ($scope: IZenVideoEmbedScope) {

			function init () { 
				$scope.getTrustedVideoUrl = getTrustedVideoUrl;
				defineListeners();
			}

			function onChange () {
				$scope.video = buildVideoFromUrl();
			}

			function defineListeners () {
				$scope.$watch(function () {
					return $scope.url;
				}, onChange);
			}

			function buildVideoFromUrl () {
				if ($scope.url) {
					return ZenVideoEmbedService.getVideoFromUrl($scope.url);
				} else {
					return null;
				}
			}

			function getTrustedVideoUrl (video: Video) {
				return $sce.trustAsResourceUrl(video.getVideoUrl());
			}

			init();
		}
	};
}]);
