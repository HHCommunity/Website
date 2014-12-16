var gulp = require("gulp"),
	bower      = require("bower"),
	sass       = require("gulp-sass"),
	jade       = require("gulp-jade"),
	concat     = require("gulp-concat"),
	uglify     = require("gulp-uglify"),
	prefix     = require("gulp-autoprefixer"),
	rename     = require("gulp-rename"),
	gutil      = require("gulp-util"),
	minifyCSS  = require("gulp-minify-css");

globals = {
	// Working Directory
	dev: "app",
	// Compiled Code
	prod: "dist"
};

paths = {
	app:{
		"jade": globals.dev + "/jade",
		"scripts": globals.dev + "/scripts",
		"styles": globals.dev + "/styles",
		"images": globals.dev + "/images",
		"fonts": globals.dev + "/fonts",
		"videos": globals.dev + "/videos"
	},
	dist:{
		"scripts": globals.prod + "/js",
		"styles": globals.prod + "/css",
		"images": globals.prod + "/img",
		"fonts": globals.prod + "/fonts",
		"videos": globals.prod + "/videos"
	}
};

gulp.task("fonts", function() {
	gulp.src(paths.app.fonts + "/*")
		.pipe(gulp.dest(paths.dist.fonts));
});

gulp.task("videos", function() {
	gulp.src(paths.app.videos + "/*")
		.pipe(gulp.dest(paths.dist.videos));
});

gulp.task("images", function() {
		gulp.src(paths.app.images + "/*")
				.pipe(gulp.dest(paths.dist.images));
});

gulp.task("sass", function() {
	gulp.src(paths.app.styles + "/*.scss")
		.pipe(sass({
			css: paths.dist.styles,
			sass: paths.app.styles
		}))
		.pipe(prefix())
		.pipe(minifyCSS())
		.pipe(rename("styles.min.css"))
		.pipe(gulp.dest(paths.dist.styles))
		.on("error", function(err) {
			gutil.log("went to shit!");
		});
});

gulp.task("jade", function() {
	gulp.src(paths.app.jade + "/*.jade")
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest(globals.prod))
		.on("error", function(err) {
			gutil.log("went to shit!");
		});
});

gulp.task("scripts", function() {
	gulp.src(paths.app.scripts + "/*.js")
		.pipe(uglify())
		.pipe(concat("front-end.min.js"))
		.pipe(gulp.dest(paths.dist.scripts));
});

gulp.task("watch", function() {
	gulp.watch(paths.app.styles + "/*.scss", [ "sass" ]);
	gulp.watch(paths.app.jade + "/*.jade", [ "jade" ]);
	gulp.watch(paths.app.fonts + "/*", [ "fonts" ]);
	gulp.watch(paths.app.scripts + "/*.js", [ "scripts" ]);
	gulp.watch(paths.app.images + "/*", [ "images" ]);
	gulp.watch(paths.app.videos + "/*", [ "videos" ]);
});

gulp.task("default", [
	"sass",
	"jade",
	"images",
	"scripts",
	"fonts",
	"videos",
	"watch"
]);
