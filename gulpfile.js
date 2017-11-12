var gulp = require('gulp');
var clean = require('gulp-clean');

var distFolder = './dist';

gulp.task('clean', function() {
    return gulp.src(distFolder + '/**/*')
      .pipe(clean());
});

gulp.task('html', ['clean'],function(){
  return gulp.src('*.html')
    .pipe(gulp.dest(distFolder))
});

gulp.task('css', ['clean'],function(){
  return gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
    .pipe(gulp.dest(distFolder + '/styles'))
});

gulp.task('js', ['clean'], function(){
  return gulp.src([
      'node_modules/jquery/dist/jquery.slim.min.js',
      'node_modules/popper.js/dist/popper.min.js',
      'node_modules/bootstrap/dist/js/bootstrap.min.js'])
    .pipe(gulp.dest(distFolder + '/js'))
});

gulp.task('build', [ 'clean', 'html', 'css', 'js' ]);
