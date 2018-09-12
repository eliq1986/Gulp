"use strict";


// NPM MODULES
const gulp = require("gulp");
const concat = require("gulp-concat");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const maps = require("gulp-sourcemaps");
const minifyCSS = require('gulp-clean-css');
const imageMin = require("gulp-imagemin");
const del = require("del");
const connect = require("gulp-connect");



// Concatanates JavaScript Files
gulp.task("concatScripts", ()=> {
return gulp.src(["js/circle/autogrow.js", "js/circle/circle.js"])
    .pipe(maps.init())
    .pipe(concat("app.js"))
    .pipe(maps.write("./"))
    .pipe(gulp.dest("js"));
});

// Minifies js files
gulp.task("minifyScripts",["concatScripts"], ()=> {
  return  gulp.src("./js/app.js")
    .pipe(uglify())
    .pipe(rename("all.min.js"))
    .pipe(gulp.dest("./js/"));
});

//places js files in dist directory
gulp.task("scripts", ["minifyScripts"], ()=> {
  return gulp.src(["js/all.min.js"])
  .pipe(gulp.dest("dist/scripts/"));
});




// Compiles sass files into css file
gulp.task("compileSass", ()=> {
  return gulp.src("sass/global.scss")
    .pipe(maps.init())
    .pipe(sass())
    .pipe(maps.write("./"))
    .pipe(gulp.dest("css"))
    .pipe(connect.reload());

});

// Minifies sass files
gulp.task("minifyCSS", ["compileSass"], ()=> {
    return gulp.src("css/global.css")
    .pipe(minifyCSS())
    .pipe(rename("all.min.css"))
    .pipe(gulp.dest("css"));

});

//places SASS files in dist directory
gulp.task("styles", ["minifyCSS"], ()=> {
  return gulp.src(["css/all.min.css"])

  .pipe(gulp.dest("dist/css/"));
});

gulp.task("watchSass", ()=> {
 gulp.watch("sass/**/**/*.scss", ["compileSass"])
});

// minifies images
gulp.task("imageMin", ()=> {
  return gulp.src("images/*")
  .pipe(imageMin())
  .pipe(gulp.dest("images"))
});

// //places minified files in dist directory
gulp.task("images", ["imageMin"], ()=> {
 return gulp.src("images/*")
 .pipe(gulp.dest("dist/content/"));
});

// deletes all files and directories in dist
gulp.task("clean", ()=> {
  del(["dist/content", "dist/css", "dist/scripts"])
});


//connects to server
gulp.task('connect',[] ,function() {
  connect.server({
    livereload: true
  });

});



// gulp build command
gulp.task("build",["clean", "scripts", "styles", "images", "connect"]);

// gulp command
gulp.task("default",["clean", "scripts", "styles","images","connect","watchSass"]);
