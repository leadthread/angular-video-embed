/*
* @Author: Tyler Arbon
* @Date:   2017-07-26 11:35:45
* @Last Modified by:   Tyler Arbon
* @Last Modified time: 2017-07-26 12:07:08
*/

'use strict';

import { ViddlerVideo } from "./../videos/ViddlerVideo";
import { Video } 		from "./../videos/Video";
import { VimeoVideo }   from "./../videos/VimeoVideo";
import { YouTubeVideo } from "./../videos/YouTubeVideo";

export class VideoFactory {
	static createFromUrl(url: string): Video {
		let video: Video;

		video = YouTubeVideo.createFromUrl(url);
		if(video) {
			return video
		}

		video = VimeoVideo.createFromUrl(url);
		if (video) {
			return video
		}

		video = ViddlerVideo.createFromUrl(url);
		if(video) {
			return video
		}
	}
}