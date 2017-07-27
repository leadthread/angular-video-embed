/*
* @Author: Tyler Arbon
* @Date:   2017-07-27 10:37:38
* @Last Modified by:   Tyler Arbon
* @Last Modified time: 2017-07-27 15:06:57
*/

'use strict';

declare const YT: any;

import {Player} from "./Player";
import {IVideoCallback} from "./Player";
import {YouTubeVideo} from "./../videos/YouTubeVideo";

export class YouTubePlayer extends Player {
	constructor(protected video: YouTubeVideo) {
		super(video);
	}

	isLibraryLoaded(): boolean {
		return typeof YT !== 'undefined' && !!YT.loaded;
	}

	getLibrary(): any {
		return YT;
	}

	bind($q: ng.IQService): ng.IPromise<this> {
		return this.onLibraryLoaded($q).then(() => {
			var id = this.video.id;
			var lib = this.getLibrary();
			this.player = new lib.Player(this.video.toString(), {
				videoId: id,
				height: "100%",
				width: "100%",
				events: {
					'onReady': this.fireReady,
					'onStateChange': this.fireStateChange
				}
		    });
		    return this;
		});
	}

	protected fireStateChange = (event: any) => {
		switch (event.data) {
			case YT.PlayerState.ENDED:
				return this.fireEnded(event);
			case YT.PlayerState.PLAYING:
				return this.firePlayed(event);
			case YT.PlayerState.PAUSED:
				return this.firePaused(event);
			case YT.PlayerState.BUFFERING:
				return this.fireBuffering(event);
		}
	}
}