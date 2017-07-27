# Angular Video Embed
[![Latest Version](https://img.shields.io/github/release/zenapply/angular-video-embed.svg?style=flat-square)](https://github.com/zenapply/angular-video-embed/releases)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)

A simple directive for angular 1.x that makes embedding videos from various services easier.

Currently supported:
- [Viddler](http://viddler.com/)
- [Vimeo](http://vimeo.com/)
- [Youtube](http://youtube.com/)

## Installation

Install via [bower](https://bower.io/) - In the terminal:
```bash
bower install zenapply/angular-video-embed --save
```

Include the module in your main app
```js
angular.module('app', ['zen.video-embed']);
```

You must include the video service's library script in order to use that service
```html
<!-- YOUTUBE -->
<script src="https://www.youtube.com/iframe_api"></script>

<!-- VIMEO -->
<script src="https://player.vimeo.com/api/player.js"></script>

<!-- VIDDLER -->
<script src="https://static.cdn-ec.viddler.com/js/arpeggio/v3/build/main-built.js"></script>
```

## Usage
### Loading a video
#### Method 1 - Passing an object
###### Javascript
```js
$scope.video = {
	id: "49222355",
	service: "vimeo"
};
```

###### HTML
```html
<div zen-video-embed video="video" style="width: 600px; height: 400px;"></div>
```

#### Method 2 - Passing a video URL
###### Javascript
```js
$scope.url = "https://www.youtube.com/watch?v=iNJdPyoqt8U";
```

###### HTML
```html
<div zen-video-embed url="{{url}}" style="width: 600px; height: 400px;"></div>
```

### Registering event callbacks
###### Javascript
```js
$scope.url = "https://www.youtube.com/watch?v=iNJdPyoqt8U";
$scope.onPlayed = function () {console.log("onPlayed fired");}
$scope.onPaused = function () {console.log("onPaused fired");}
$scope.onEnded = function () {console.log("onEnded fired");}
$scope.onBuffering = function () {console.log("onBuffering fired");} // Only supported on Youtube
$scope.onReady = function () {console.log("onReady fired");}
```

###### HTML
```html
<div zen-video-embed url="{{url}}" on-played="onPlayed" on-paused="onPaused" on-ended="onEnded" on-buffering="onBuffering" on-ready="onReady" style="width: 600px; height: 400px;"></div>
```

### Gaining access to the Player Library Instance
###### Javascript
```js
// Each event callback receives a "Player Wrapper" instance which contains the underlying player library instance.
$scope.onReady = function (player) {
	if(player.video.service === "youtube") {
		player.player.setVolume(0);
	}
}
```

## Contributing
Contributions are always welcome!
If you would like to have another service added to the list please request it by opening up an issue or sending a pull request
