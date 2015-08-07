/******************************************/
var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-ruby-sass'),
	concat = require('gulp-concat'),
	watch = require('gulp-watch'),
	rename = require("gulp-rename"),
	del = require('del'),
	minifyCSS = require('gulp-minify-css'),
	less = require('gulp-less')
	path = require('path');

/******************************************/


gulp.task('sass', function () {
	return sass('public/sass', {style: 'expanded'})
		.on('error', function (err) {
			console.error('Error!', err.message);
		})
		.pipe(rename('style.css'))
		.on('error', function (err) {
			console.error('Error!', err.message);
		})
		.pipe(gulp.dest('public/css'));
});

gulp.task('sass-min', ['sass'], function () {
	return sass('public/sass', {style: 'compressed'})
		.on('error', function (err) {
			console.error('Error!', err.message);
		})
		.pipe(rename('style.min.css'))
		.on('error', function (err) {
			console.error('Error!', err.message);
		})
		.pipe(gulp.dest('public/css'));
});

gulp.task('default', ['sass-min', 'watch']); 

gulp.task('watch', function () {
	watch('public/sass/*.scss', function() {
		gulp.start('sass-min');
	});
});