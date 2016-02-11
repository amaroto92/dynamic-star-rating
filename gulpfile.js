


var gulp = require('gulp'),
	minifyCss = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
	connect = require('gulp-connect'),
  rename = require('gulp-rename');
 
gulp.task('webserver', function() {
  connect.server();
});
 
gulp.task('default', ['webserver']);

gulp.task('compile',function(){
  gulp.src('dynamic-star-rating.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(rename ('dynamic-star-rating.min.css'))
    .pipe(gulp.dest('dist'));
  gulp.src('dynamic-star-rating.js')
    .pipe(uglify())
    .pipe(rename ('dynamic-star-rating.min.js'))
    .pipe(gulp.dest('dist'));
});