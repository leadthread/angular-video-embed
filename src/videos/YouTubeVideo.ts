/*
* @Author: Tyler Arbon
* @Date:   2017-07-26 11:00:35
* @Last Modified by:   Tyler Arbon
* @Last Modified time: 2017-07-27 11:05:44
*/

'use strict';

declare const YT: any;

import { Video } from "./Video";

export class YouTubeVideo extends Video {
	protected static regex: RegExp = /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&]{10,12})/;

	constructor(public id: string) {
		super(id);
		this.service = "youtube";
	}

	public getVideoUrl(): string {
		return "https://www.youtube.com/embed/" + this.id + "?rel=0";
	}

	/*==============================
	=            STATIC            =
	==============================*/

	static createFromUrl(url: string): YouTubeVideo {
		let results: RegExpMatchArray = YouTubeVideo.test(url);
		return results ? new YouTubeVideo(results[1]) : null;
	}

	
}