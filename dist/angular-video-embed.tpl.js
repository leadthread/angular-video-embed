angular.module('zen.video-embed.templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('index.html','<div ng-switch="video.service" style="height: 100%; width: 100%;">\r\n\t<div ng-switch-when="youtube" style="height: 100%; width: 100%;">\r\n\t\t<iframe width="100%" height="100%" ng-src="{{video.getTrustedUrl()}}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>\r\n\t</div>\r\n\t<div ng-switch-when="vimeo" style="height: 100%; width: 100%;">\r\n\t\t<iframe width="100%" height="100%" ng-src="{{video.getTrustedUrl()}}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>\r\n\t</div>\r\n\t<div ng-switch-when="viddler" style="height: 100%; width: 100%;">\r\n\t\t<iframe width="100%" height="100%" ng-src="{{video.getTrustedUrl()}}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>\r\n\t</div>\r\n\t<div ng-switch-default>\r\n\t\tInvalid Video\r\n\t</div>\r\n</div>');}]);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("videos/Video", ["require", "exports"], function (require, exports) {
    'use strict';
    exports.__esModule = true;
    var Video = (function () {
        function Video(id) {
            this.id = id;
        }
        Video.test = function (url) {
            return url.match(this.regex);
        };
        return Video;
    }());
    exports.Video = Video;
});
define("videos/ViddlerVideo", ["require", "exports", "videos/Video"], function (require, exports, Video_1) {
    'use strict';
    exports.__esModule = true;
    var ViddlerVideo = (function (_super) {
        __extends(ViddlerVideo, _super);
        function ViddlerVideo(id) {
            var _this = _super.call(this, id) || this;
            _this.id = id;
            _this.service = "viddler";
            return _this;
        }
        ViddlerVideo.prototype.getVideoUrl = function () {
            return "https://www.viddler.com/embed/" + this.id + "/?f=1&player=arpeggio&hideablecontrolbar=1&make_responsive=0&hideCommentEmbedIfNoComments=1&noControls=true";
        };
        ViddlerVideo.createFromUrl = function (url) {
            var results = ViddlerVideo.test(url);
            return (results && ["viddler"].indexOf(results[1]) >= 0) ? new ViddlerVideo(results[3]) : null;
        };
        ViddlerVideo.regex = /https?:\/\/.*?(viddler)\.com\/(embed|v)\/([^?&\/]*)/;
        return ViddlerVideo;
    }(Video_1.Video));
    exports.ViddlerVideo = ViddlerVideo;
});
define("videos/VimeoVideo", ["require", "exports", "videos/Video"], function (require, exports, Video_2) {
    'use strict';
    exports.__esModule = true;
    var VimeoVideo = (function (_super) {
        __extends(VimeoVideo, _super);
        function VimeoVideo(id) {
            var _this = _super.call(this, id) || this;
            _this.id = id;
            _this.service = "vimeo";
            return _this;
        }
        VimeoVideo.prototype.getVideoUrl = function () {
            return "https://player.vimeo.com/video/" + this.id + "?color=d4bd28&portrait=0&badge=0";
        };
        VimeoVideo.createFromUrl = function (url) {
            var results = VimeoVideo.test(url);
            return (results && ["vimeo"].indexOf(results[1]) >= 0) ? new VimeoVideo(results[2]) : null;
        };
        VimeoVideo.regex = /https?:\/\/.*?(vimeo)\.com\/([^?&]*)/;
        return VimeoVideo;
    }(Video_2.Video));
    exports.VimeoVideo = VimeoVideo;
});
define("videos/YouTubeVideo", ["require", "exports", "videos/Video"], function (require, exports, Video_3) {
    'use strict';
    exports.__esModule = true;
    var YouTubeVideo = (function (_super) {
        __extends(YouTubeVideo, _super);
        function YouTubeVideo(id) {
            var _this = _super.call(this, id) || this;
            _this.id = id;
            _this.service = "youtube";
            return _this;
        }
        YouTubeVideo.prototype.getVideoUrl = function () {
            return "https://www.youtube.com/embed/" + this.id + "?rel=0";
        };
        YouTubeVideo.createFromUrl = function (url) {
            var results = YouTubeVideo.test(url);
            return results ? new YouTubeVideo(results[1]) : null;
        };
        YouTubeVideo.regex = /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&]{10,12})/;
        return YouTubeVideo;
    }(Video_3.Video));
    exports.YouTubeVideo = YouTubeVideo;
});
define("factories/VideoFactory", ["require", "exports", "videos/ViddlerVideo", "videos/VimeoVideo", "videos/YouTubeVideo"], function (require, exports, ViddlerVideo_1, VimeoVideo_1, YouTubeVideo_1) {
    'use strict';
    exports.__esModule = true;
    var VideoFactory = (function () {
        function VideoFactory() {
        }
        VideoFactory.createFromUrl = function (url) {
            var video;
            video = YouTubeVideo_1.YouTubeVideo.createFromUrl(url);
            if (video) {
                return video;
            }
            video = VimeoVideo_1.VimeoVideo.createFromUrl(url);
            if (video) {
                return video;
            }
            video = ViddlerVideo_1.ViddlerVideo.createFromUrl(url);
            if (video) {
                return video;
            }
        };
        return VideoFactory;
    }());
    exports.VideoFactory = VideoFactory;
});
define("index", ["require", "exports", "factories/VideoFactory"], function (require, exports, VideoFactory_1) {
    "use strict";
    exports.__esModule = true;
    var app = angular.module("zen.video-embed", [
        "zen.video-embed.templates"
    ]);
    var ZenVideoEmbedService = (function () {
        function ZenVideoEmbedService() {
        }
        ZenVideoEmbedService.prototype.getVideoFromUrl = function (url) {
            if (typeof url === "undefined") {
                return undefined;
            }
            return VideoFactory_1.VideoFactory.createFromUrl(url);
        };
        ;
        ZenVideoEmbedService.prototype.getUrlFromVideo = function (video) {
            return video.getVideoUrl();
        };
        ;
        return ZenVideoEmbedService;
    }());
    app.service("ZenVideoEmbedService", ZenVideoEmbedService);
    app.directive("zenVideoEmbed", ["$sce", "ZenVideoEmbedService", function ($sce, ZenVideoEmbedService) {
            return {
                restrict: "EA",
                templateUrl: "index.html",
                scope: {
                    url: "@",
                    video: "=?"
                },
                link: function ($scope) {
                    function init() {
                        $scope.getTrustedVideoUrl = getTrustedVideoUrl;
                        defineListeners();
                    }
                    function onChange() {
                        $scope.video = buildVideoFromUrl();
                    }
                    function defineListeners() {
                        $scope.$watch(function () {
                            return $scope.url;
                        }, onChange);
                    }
                    function buildVideoFromUrl() {
                        if ($scope.url) {
                            return ZenVideoEmbedService.getVideoFromUrl($scope.url);
                        }
                        else {
                            return null;
                        }
                    }
                    function getTrustedVideoUrl(video) {
                        return $sce.trustAsResourceUrl(video.getVideoUrl());
                    }
                    init();
                }
            };
        }]);
});
