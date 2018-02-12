var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var webserver = require('gulp-webserver');
var livereload = require('gulp-livereload');
var notify = require("gulp-notify");
var plumber = require('gulp-plumber');
var cleanCSS = require('gulp-clean-css');

var inputLess = './assets/css/style.less';
var outputLess = './assets/css';
var inputHtml = ['./*.html', './pages/**/*.html'];
var inputJs = './assets/js/*.js';

var reportError = function (error) {
  notify({
    title: error.plugin,
    message: error.message
  }).write(error);
  this.emit('end');
}

gulp.task('less', function () {
  return gulp.src(inputLess)
    .pipe(plumber({ errorHandler: reportError }))
    .pipe(less({ outputStyle: 'compressed' }))
    .pipe(autoprefixer())
    .pipe(gulp.dest(outputLess))
    .pipe(livereload());
});

gulp.task('minify-css', () => {
  return gulp.src('./assets/css/style.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('html', function () {
  return gulp.src(inputHtml)
    .pipe(plumber({ errorHandler: reportError }))
    .pipe(livereload());
});

gulp.task('js', function () {
  return gulp.src([inputJs])
    .pipe(plumber({ errorHandler: reportError }))
    .pipe(livereload());
});

gulp.task('webserver', function () {
  return gulp.src('.')
    .pipe(plumber({ errorHandler: reportError }))
    .pipe(webserver({
      livereload: true,
      host: '0.0.0.0'
    }))
    .pipe(notify("You can find your page on http://localhost:8000"));
});

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch(inputLess, ['less', 'minify-css']);
  gulp.watch(inputHtml, ['html']);
  gulp.watch(inputJs, ['js']);
});

gulp.task('default', ['less', 'html', 'js', 'webserver', 'watch'], function () { });