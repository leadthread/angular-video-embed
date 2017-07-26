/*
* @Author: Tyler Arbon
* @Date:   2017-07-26 11:02:10
* @Last Modified by:   Tyler Arbon
* @Last Modified time: 2017-07-26 12:15:03
*/

'use strict';

export abstract class Video {
	protected static regex: RegExp;
	public service: string;

	constructor(public id: string) {}

	static test(url: string): RegExpMatchArray {
		return url.match(this.regex);
	}

	public abstract getVideoUrl(): string;
}
