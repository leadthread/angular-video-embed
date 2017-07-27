/*
* @Author: Tyler Arbon
* @Date:   2017-07-27 10:37:38
* @Last Modified by:   Tyler Arbon
* @Last Modified time: 2017-07-27 15:09:49
*/

'use strict';

import {Video} from "./../videos/Video";
import * as _ from "lodash";

export interface IVideoCallback {
	(player: Player): void;
}

export interface IVideoCallbacks {
	ready:     IVideoCallback[];
	played:      IVideoCallback[];
	paused:     IVideoCallback[];
	ended: 	   IVideoCallback[];
	buffering: IVideoCallback[];
}

export abstract class Player {
	protected player: any;
	protected callbacks: IVideoCallbacks;

	constructor(protected video: Video) {
		this.callbacks = {
			ready: [],
			played: [],
			paused: [],
			ended: [],
			buffering: [],
		};
	}

	abstract isLibraryLoaded(): boolean;
	abstract getLibrary(): any;
	abstract bind($q: ng.IQService): ng.IPromise<this>;

	protected fireCallbacks(cbs: IVideoCallback[]): void {
		_.forEach(cbs, (cb: IVideoCallback) => {
			cb(this);
		});
	}

	onLibraryLoaded = ($q: ng.IQService): ng.IPromise<boolean> => {
		let waitTimeMax = 3000;
		let waitInterval = 100;
		let waitedFor = 0;
		return $q((resolve, reject): void => {
			let wait = () => {
				if (waitedFor >= waitTimeMax) {
					reject("Library for "+this.video.service+" did not load");
					return false;
				}
				if (this.isLibraryLoaded()) {
					resolve();
					return true;
				}
				waitedFor+=waitInterval;
				setTimeout(wait, waitInterval);
			}
			wait();
		});
	}

	onReady(callback: IVideoCallback): void {
		if(_.isFunction(callback)) {
			this.callbacks.ready.push(callback);
		}
	}

	onPlayed(callback: IVideoCallback): void {
		if(_.isFunction(callback)) {
			this.callbacks.played.push(callback);
		}
	}

	onEnded(callback: IVideoCallback): void {
		if(_.isFunction(callback)) {
			this.callbacks.ended.push(callback);
		}
	}

	onBuffering(callback: IVideoCallback): void {
		if(_.isFunction(callback)) {
			this.callbacks.buffering.push(callback);
		}
	}

	onPaused(callback: IVideoCallback): void {
		if(_.isFunction(callback)) {
			this.callbacks.paused.push(callback);
		}
	}

	protected firePlayed = (event: any): void => {
		this.fireCallbacks(this.callbacks.played)
	}

	protected fireReady = (event: any): void => {
		this.fireCallbacks(this.callbacks.ready)
	}

	protected firePaused = (event: any): void => {
		this.fireCallbacks(this.callbacks.paused)
	}

	protected fireEnded = (event: any): void => {
		this.fireCallbacks(this.callbacks.ended)
	}

	protected fireBuffering = (event: any): void => {
		this.fireCallbacks(this.callbacks.buffering)
	}
}
