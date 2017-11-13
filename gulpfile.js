var gulp = require('gulp');
var clean = require('gulp-clean');
var connect = require('gulp-connect');

var distFolder = './dist';
var srcFolder = './src';

var htmlPaths = srcFolder + '/**/*.html';

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
  gulp.watch(htmlPaths, ['html']);
});

gulp.task('css', function(){
  return gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
    .pipe(gulp.dest(distFolder + '/styles'))
});

gulp.task('js', function(){
  return gulp.src([
      'node_modules/jquery/dist/jquery.slim.min.js',
      'node_modules/popper.js/dist/popper.min.js',
      'node_modules/bootstrap/dist/js/bootstrap.min.js'])
    .pipe(gulp.dest(distFolder + '/js'))
});

gulp.task('build', [ 'html', 'css', 'js' ]);
