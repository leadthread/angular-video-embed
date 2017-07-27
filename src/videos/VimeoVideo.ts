/*
* @Author: Tyler Arbon
* @Date:   2017-07-26 11:00:35
* @Last Modified by:   Tyler Arbon
* @Last Modified time: 2017-07-27 11:03:18
*/

'use strict';

declare const Vimeo: any;

import { Video } from "./Video";

export class VimeoVideo extends Video {
	protected static regex: RegExp = /https?:\/\/.*?(vimeo)\.com\/([^?&]*)/;

	constructor(public id: string) {
		super(id);
		this.service = "vimeo";
	}

	public getVideoUrl(): string {
		return "https://player.vimeo.com/video/" + this.id + "?color=d4bd28&portrait=0&badge=0";
	}

	/*==============================
	=            STATIC            =
	==============================*/

	static createFromUrl(url: string): VimeoVideo {
		let results: RegExpMatchArray = VimeoVideo.test(url);
		return (results && ["vimeo"].indexOf(results[1]) >= 0) ? new VimeoVideo(results[2]) : null;
	}
}