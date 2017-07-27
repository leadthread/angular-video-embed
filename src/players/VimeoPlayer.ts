/*
* @Author: Tyler Arbon
* @Date:   2017-07-27 10:37:38
* @Last Modified by:   Tyler Arbon
* @Last Modified time: 2017-07-27 14:38:01
*/

'use strict';

declare const Vimeo: any;

import {Player} from "./Player";
import {VimeoVideo} from "./../videos/VimeoVideo";

export class VimeoPlayer extends Player {
	constructor(protected video: VimeoVideo) {
		super(video);
	}

	isLibraryLoaded(): boolean {
		return typeof Vimeo !== 'undefined';
	}

	getLibrary(): any {
		return Vimeo;
	}

	bind($q: ng.IQService): ng.IPromise<this> {
		return this.onLibraryLoaded($q).then(() => {
			var id = this.video.id;
			var lib = this.getLibrary();
			this.player = new lib.Player(this.video.toString(), {
				id: id,
		    });
		    this.player.on('play', this.firePlayed);
		    this.player.on('loaded', this.fireReady);
		    this.player.on('pause', this.firePaused);
		    this.player.on('ended', this.fireEnded);
		    return this;
		});
	}

	onBuffering() {
		console.warn("Buffering event listener is not supported for Vimeo");
	}
}