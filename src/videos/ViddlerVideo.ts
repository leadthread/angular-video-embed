/*
* @Author: Tyler Arbon
* @Date:   2017-07-26 11:00:35
* @Last Modified by:   Tyler Arbon
* @Last Modified time: 2017-07-27 11:13:22
*/

'use strict';

declare const ViddlerEmbed: any;

import { Video } from "./Video";

export class ViddlerVideo extends Video {
	protected static regex: RegExp = /https?:\/\/.*?(viddler)\.com\/(embed|v)\/([^?&\/]*)/;

	constructor(public id: string) {
		super(id);
		this.service = "viddler";
	}

	public getVideoUrl(): string {
		return "https://www.viddler.com/embed/" + this.id + "/?f=1&player=arpeggio&hideablecontrolbar=1&make_responsive=0&hideCommentEmbedIfNoComments=1&noControls=true";
	}

	/*==============================
	=            STATIC            =
	==============================*/

	static createFromUrl(url: string): ViddlerVideo {
		let results: RegExpMatchArray = ViddlerVideo.test(url);
		return (results && ["viddler"].indexOf(results[1]) >= 0) ? new ViddlerVideo(results[3]) : null;
	}
}