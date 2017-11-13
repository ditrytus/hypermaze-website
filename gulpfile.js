var gulp = require('gulp');
var clean = require('gulp-clean');
var connect = require('gulp-connect');
var sass = require('gulp-sass');

var distFolder = './dist';
var srcFolder = './src';

var htmlPaths = srcFolder + '/**/*.html';
var sassPaths = srcFolder + '/**/*.sass';

var distStylesFolder = distFolder + '/styles';

gulp.task('clean', function() {
    return gulp.src(distFolder + '/**/*')
      .pipe(clean());
});

gulp.task('html',function(){
  return gulp.src(htmlPaths)
    .pipe(gulp.dest(distFolder))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  connect.server({
    root: distFolder,
    livereload: true
  });
  gulp.watch([htmlPaths,sassPaths], ['html','sass']);
});

gulp.task('css', function(){
  return gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
    .pipe(gulp.dest(distStylesFolder))
});

gulp.task('sass', function () {
  return gulp.src(sassPaths)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(distStylesFolder));
});

gulp.task('js', function(){
  return gulp.src([
      'node_modules/jquery/dist/jquery.slim.min.js',
      'node_modules/popper.js/dist/popper.min.js',
      'node_modules/bootstrap/dist/js/bootstrap.min.js'])
    .pipe(gulp.dest(distFolder + '/scripts'))
});

gulp.task('images', function() {
  return gulp.src(srcFolder + '/**/*.png')
  .pipe(gulp.dest(distFolder + '/images'));
});

gulp.task('build', [ 'html', 'css', 'sass', 'images', 'js' ]);
