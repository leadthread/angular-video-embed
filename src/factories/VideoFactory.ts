/*
* @Author: Tyler Arbon
* @Date:   2017-07-26 11:35:45
* @Last Modified by:   Tyler Arbon
* @Last Modified time: 2017-07-27 11:13:51
*/

'use strict';

import { ViddlerVideo } from "./../videos/ViddlerVideo";
import { Video } 		from "./../videos/Video";
import { VimeoVideo }   from "./../videos/VimeoVideo";
import { YouTubeVideo } from "./../videos/YouTubeVideo";

export class VideoFactory {
	static create(id: string, service: string): Video {
		switch (service) {
			case "youtube":
				return new YouTubeVideo(id);
			case "vimeo":
				return new VimeoVideo(id);
			case "viddler":
				return new ViddlerVideo(id);
			default:
				return null;
		}
	}
	static createFromUrl(url: string): Video|null {
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

		return null;
	}
}