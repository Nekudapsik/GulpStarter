'use strict';

// Include Gulp & Tools We'll Use
var gulp        = require('gulp');
var $           = require('gulp-load-plugins')();
var del         = require('del');
var runSequence = require('run-sequence');

var AUTOPREFIXER_BROWSERS = [
	'ie >= 10',
	'ie_mob >= 10',
	'ff >= 30',
	'chrome >= 34',
	'safari >= 7',
	'opera >= 23',
	'ios >= 7',
	'android >= 4.4',
	'bb >= 10'
];

var PATHS = {
	views: { src: 'src/views/**/*.jade', dist: 'dist/' }
};

gulp.task('views', function() {
  	return gulp.src(PATHS.views.src)
	    .pipe($.jade({
	      	pretty: true
	    }))
	    .pipe(gulp.dest(PATHS.views.dist));
});

gulp.task('watch', function() {
    gulp.watch(PATHS.views.src, ['views']);
});

// gulp.task('sass', ['images'], function () {
//   return gulp.src(config.src)
//     .pipe(sass({
//       compass: true,
//       bundleExec: true,
//       sourcemap: true,
//       sourcemapPath: '../sass'
//     }))
//     .on('error', handleErrors)
//     .pipe(gulp.dest(config.dest));
// });