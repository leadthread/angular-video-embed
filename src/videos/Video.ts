/*
* @Author: Tyler Arbon
* @Date:   2017-07-26 11:02:10
* @Last Modified by:   Tyler Arbon
* @Last Modified time: 2017-07-27 11:03:27
*/

'use strict';

export abstract class Video {
	public service: string;
	public uuid: number;

	constructor(public id: string) {
		this.uuid = Math.floor(Math.random()*10000);
	}
	public bindTo(htmlId: string): any {
		
	}
	public toString(): string {
		return [this.service, this.id, this.uuid].join("-");
	}

	/*================================
	=            ABSTRACT            =
	================================*/
	
	public abstract getVideoUrl(): string;

	/*==============================
	=            STATIC            =
	==============================*/

	protected static regex: RegExp;

	static test(url: string): RegExpMatchArray {
		return url.match(this.regex);
	}

	
}
