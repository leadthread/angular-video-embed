# Angular Video Embed
[![Latest Version](https://img.shields.io/github/release/zenapply/angular-video-embed.svg?style=flat-square)](https://github.com/zenapply/angular-video-embed/releases)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)

A simple directive for angular 1.x that makes embedding videos from various services easier.

Currently supported:
- [Youtube](http://youtube.com/)
- [Vimeo](http://vimeo.com/)

## Installation

Install via [bower](https://bower.io/) - In the terminal:
```bash
bower install zenapply/angular-video-embed --save
```

Include the module in your main app
```js
angular.module('app', ['zen.video-embed']);
```

## Usage
### Method 1 - Passing an object
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

### Method 2 - Passing a video URL
###### Javascript
```js
$scope.url = "https://www.youtube.com/watch?v=iNJdPyoqt8U";
```

###### HTML
```html
<div zen-video-embed url="{{url}}" style="width: 600px; height: 400px;"></div>
```

## Contributing
Contributions are always welcome!
If you would like to have another service added to the list please request it by opening up an issue or sending a pull request
