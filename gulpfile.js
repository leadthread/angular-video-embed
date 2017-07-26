// Dependencies
var gulp	      = require("gulp");
var concat	      = require("gulp-concat");
var rename	      = require("gulp-rename");
var uglify	      = require("gulp-uglify");
var templateCache = require("gulp-angular-templatecache");
var ts 		 	  = require("gulp-typescript");
var merge 		  = require("merge2");

// File Locations
var tsSrc = [
	"src/**/*.ts"
];

var htmlSrc = [
	"src/**/*.html"
];

// Destinations
var jsDest   = "dist";

var tsProjectScripts = ts.createProject("tsconfig.json", {
	declaration:false
});

// gulp starts here
gulp.task("default", ["compile", "watch"]);

gulp.task("watch", function () {
	gulp.watch(tsSrc,   ["scripts", "combine", "combine-min"]);
	gulp.watch(htmlSrc, ["html", "combine", "combine-min"]);
});

// Compiles all the files
gulp.task("compile", ["html", "scripts", "combine", "combine-min"]);
gulp.task("build",   ["html", "scripts", "combine", "combine-min"]);

gulp.task("scripts", function () {
	var streams = [
		gulp.src(tsSrc).pipe(tsProjectScripts()).js
	];

	return merge(streams)
		.pipe(concat("angular-video-embed.js"))
		.pipe(gulp.dest(jsDest))
		.pipe(uglify())
		.pipe(rename("angular-video-embed.min.js"))
		.pipe(gulp.dest(jsDest));
});

// handles html files
gulp.task("html", function () {
	return gulp.src(htmlSrc)
		.pipe(templateCache({
			module:"zen.video-embed.templates",
			standalone: true,
		}))
		.pipe(rename("angular-video-embed-templates.js"))
		.pipe(gulp.dest(jsDest));
});

gulp.task("combine", ["scripts", "html"], function () {
	return gulp.src([
		"dist/angular-video-embed-templates.js",
		"dist/angular-video-embed.js"
	])
	.pipe(concat("angular-video-embed.tpl.js"))
	.pipe(gulp.dest(jsDest));
});

gulp.task("combine-min", ["scripts", "html"], function () {
	return gulp.src([
		"dist/angular-video-embed-templates.js",
		"dist/angular-video-embed.min.js"
	])
	.pipe(concat("angular-video-embed.tpl.min.js"))
	.pipe(gulp.dest(jsDest));
});