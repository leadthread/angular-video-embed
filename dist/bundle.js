/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var VideoFactory_1 = __webpack_require__(2);
var templateUrl = __webpack_require__(6);
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
            templateUrl: templateUrl,
            scope: {
                url: "@",
                video: "=?",
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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ViddlerVideo_1 = __webpack_require__(3);
var VimeoVideo_1 = __webpack_require__(4);
var YouTubeVideo_1 = __webpack_require__(5);
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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
var Video_1 = __webpack_require__(0);
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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
var Video_1 = __webpack_require__(0);
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
}(Video_1.Video));
exports.VimeoVideo = VimeoVideo;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
var Video_1 = __webpack_require__(0);
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
}(Video_1.Video));
exports.YouTubeVideo = YouTubeVideo;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

var path = 'C:/Users/Tyler/code/leadthread/angular-video-embed/src/index.html';
var html = "<div ng-switch=\"video.service\" style=\"height: 100%; width: 100%;\">\r\n\t<div ng-switch-when=\"youtube\" style=\"height: 100%; width: 100%;\">\r\n\t\t<iframe width=\"100%\" height=\"100%\" ng-src=\"{{video.getTrustedUrl()}}\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>\r\n\t</div>\r\n\t<div ng-switch-when=\"vimeo\" style=\"height: 100%; width: 100%;\">\r\n\t\t<iframe width=\"100%\" height=\"100%\" ng-src=\"{{video.getTrustedUrl()}}\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>\r\n\t</div>\r\n\t<div ng-switch-when=\"viddler\" style=\"height: 100%; width: 100%;\">\r\n\t\t<iframe width=\"100%\" height=\"100%\" ng-src=\"{{video.getTrustedUrl()}}\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>\r\n\t</div>\r\n\t<div ng-switch-default>\r\n\t\tInvalid Video\r\n\t</div>\r\n</div>";
window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
module.exports = path;

/***/ })
/******/ ]);