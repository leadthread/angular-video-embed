
declare var angular: angular.IAngularStatic;

import { VideoFactory }   from "./factories/VideoFactory";
import { Video } 		  from "./videos/Video";
import { YouTubeVideo }   from "./videos/YouTubeVideo";
import { ViddlerVideo }   from "./videos/ViddlerVideo";
import { VimeoVideo }     from "./videos/VimeoVideo";
import { Player } 		  from "./players/Player";
import { IVideoCallback } from "./players/Player";
import { YouTubePlayer }  from "./players/YouTubePlayer";
import { ViddlerPlayer }  from "./players/ViddlerPlayer";
import { VimeoPlayer }    from "./players/VimeoPlayer";

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

app.service("zenVideoEmbedService", ZenVideoEmbedService);

app.directive("zenVideoEmbed", ["$sce", "zenVideoEmbedService", "$q", "$timeout", "$rootScope", function ($sce: ng.ISCEService, zenVideoEmbedService: ZenVideoEmbedService, $q: ng.IQService, $timeout: ng.ITimeoutService, $rootScope: ng.IRootScopeService) { 
	interface IZenVideoEmbedScope {
		url: string;
		video: Video;
		$watch: Function;
		getTrustedVideoUrl: (video: Video) => any;
		onReady: () => IVideoCallback;
		onPaused: () => IVideoCallback;
		onEnded: () => IVideoCallback;
		onBuffering: () => IVideoCallback;
		onPlayed: () => IVideoCallback;
	}

	return {
		restrict: "EA",
		templateUrl: templateUrl,
		scope : {
			url: "@",
			video: "=?",
			onReady: "&",
			onPaused: "&",
			onEnded: "&",
			onBuffering: "&",
			onPlayed: "&",
		},
		link: function ($scope: IZenVideoEmbedScope, $el: JQuery) {

			function init () { 
				$scope.getTrustedVideoUrl = getTrustedVideoUrl;

				if (!$scope.url && $scope.video instanceof Object) {
					$scope.video = VideoFactory.create($scope.video.id, $scope.video.service);
				} else if ($scope.url) {
					$scope.video = buildVideoFromUrl($scope.url);
				}
				defineListeners();
				$timeout(() => bindPlayer($scope.video));
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
					return zenVideoEmbedService.getVideoFromUrl(url);
				} else {
					return null;
				}
			}

			function createPlayer (video: Video): Player|null {
				if(video) {
					switch (video.service) {
						case "youtube":
							return new YouTubePlayer(video);
						case "vimeo":
							return new VimeoPlayer(video);
						case "viddler":
							return new ViddlerPlayer(video);
					}
				}
				return null;
			}

			function bindPlayer (video: Video) {
				if(video) {
					let player = createPlayer(video);

					return player.bind($q).then(function (player) { 
						player.onReady($scope.onReady());
						player.onEnded($scope.onEnded());
						player.onPlayed($scope.onPlayed());
						player.onPaused($scope.onPaused());
						player.onBuffering($scope.onBuffering());
					}, console.error);
				} else {
					return $q.reject("No Video")
				}

			}

			function getTrustedVideoUrl (video: Video): string {
				return video ? $sce.trustAsResourceUrl(video.getVideoUrl()) : null;
			}

			init();
		}
	};
}]);
