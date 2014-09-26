'use strict';

// Include Gulp & Tools We'll Use
var gulp        = require('gulp');
var $           = require('gulp-load-plugins')();
var del         = require('del');
var runSequence = require('run-sequence');

var PATHS = {
	views: { src: 'src/views/**/*.jade', dest: 'dist/' },
	images: { src: 'src/img/**/*', dest: 'dist/img/' },
	sass: { src: 'src/sass/**/*', dest: 'dist/css/' },
	js: { src: 'src/js/*.js', dest: 'dist/js/' },
	fonts: { src: 'src/fonts/**', dest: 'dist/fonts/' }
};

var onError = function (err) {
    $.util.log($.util.colors.green(err));
    this.emit('end');
};

// Html templates
gulp.task('views', function() {
  	return gulp.src(PATHS.views.src)
	    .pipe($.jade({ pretty: true }))
   	 	.pipe($.plumber({ errorHandler: onError }))
	    .pipe(gulp.dest(PATHS.views.dest))
    	.pipe($.size({title: 'views'}));
});

// Images optimization task
gulp.task('images', function() {
	return gulp.src(PATHS.images.src)
		.pipe($.changed(PATHS.images.dest)) // Ignore unchanged files
		.pipe($.imagemin()) // Optimize
		.pipe(gulp.dest(PATHS.images.dest))
    	.pipe($.size({title: 'images'}));
});

// Styles task
gulp.task('sass', function () {
  return gulp.src(PATHS.sass.src)
    // .pipe($.plumber({ errorHandler: onError }))
    .pipe($.rubySass({
		style: 'expanded',
		compass: true,
    }))
    .on('error', onError)
    .pipe(gulp.dest(PATHS.sass.dest))
    .pipe($.size({title: 'sass'}));
});

// Lint JavaScript
gulp.task('jshint', function () {
  	return gulp.src(PATHS.js.src)
		.pipe($.plumber({ errorHandler: onError }))
		.pipe($.jshint())
		.pipe($.jshint.reporter('jshint-stylish'));
});

// Copy js files
gulp.task('scripts', ['jshint'], function () {
    return gulp.src([PATHS.js.src])
        .pipe($.plumber({ errorHandler: onError }))
        // .pipe($.if(PATHS.js.src, $.uglify(), $.concat({ path: 'scripts.min.js', stat: { mode: '0755' }})))
        .pipe($.uglify())
        .pipe(gulp.dest(PATHS.js.dest))
        .pipe($.size({title: 'scripts'}));
});

// Copy Web Fonts To Dist
gulp.task('fonts', function () {
  	return gulp.src([PATHS.fonts.src])
	    .pipe(gulp.dest(PATHS.fonts.dest));
});

// Watch for changes
gulp.task('watch', ['default'], function() {
    gulp.watch(PATHS.sass.src, ['sass']);
    gulp.watch(PATHS.js.src, ['scripts']);
    gulp.watch(PATHS.views.src, ['views']);
});

// Clean Output Directory
gulp.task('clean', del.bind(null, ['dist']));

// Default Task
gulp.task('default', ['clean'], function (cb) {
	runSequence('sass', ['jshint', 'scripts', 'views', 'images', 'fonts'], cb);
});

// Build Production Files
gulp.task('build', function () {
	// TODO: Add build task
});