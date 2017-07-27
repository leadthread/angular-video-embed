/*
* @Author: Tyler Arbon
* @Date:   2017-07-27 10:37:38
* @Last Modified by:   Tyler Arbon
* @Last Modified time: 2017-07-27 15:03:39
*/

'use strict';

declare const ViddlerEmbed: any;

import {Player} from "./Player";
import {ViddlerVideo} from "./../videos/ViddlerVideo";

export class ViddlerPlayer extends Player {
	constructor(protected video: ViddlerVideo) {
		super(video);
	}

	isLibraryLoaded(): boolean {
		return typeof ViddlerEmbed !== 'undefined';
	}

	getLibrary(): any {
		return ViddlerEmbed;
	}

	bind($q: ng.IQService): ng.IPromise<this> {
		return this.onLibraryLoaded($q).then(() => {
			var id = this.video.id;
			var lib = this.getLibrary();
			this.player = new ViddlerEmbed({
				videoId: id,
				target: '#'+this.video.toString(),
				width: "100%",
				height: "100%",
			});
		    this.player.manager.events.on('videoPlayer:play', this.firePlayed);
		    this.player.manager.events.on('videoPlayer:playerReady', this.fireReady);
		    this.player.manager.events.on('videoPlayer:pause', this.firePaused);
		    this.player.manager.events.on('videoPlayer:ended', this.fireEnded);
		    return this;
		});
	}
}