var gulp = require('gulp'),
    sass = require('gulp-sass'),
    inky = require('inky'),
    inlineCss = require('gulp-inline-css'),
    inlinesource = require('gulp-inline-source'),
    logger = require('gulp-logger');


//STYLES

gulp.task('styles', function () {
  return gulp.src('./scss/*.scss')
    .pipe(logger())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
});

//CONVERTE INKY
gulp.task('inky', function() {
  return gulp.src('./templates/**/*.html')
    .pipe(logger())
    .pipe(inlinesource())
    .pipe(inky())
    .pipe(inlineCss({
        preserveMediaQueries: true,
        removeLinkTags: false
    }))
    .pipe(gulp.dest('./dist'));
});
gulp.task('watch', () => {
    gulp.watch('src/html/**/*.html', gulp.series('inky'));
    gulp.watch('src/scss/**/*.scss', gulp.series('styles'));
});
//WATCH
// gulp.task('default', gulp.series(['styles', 'inky','watch']));
gulp.task('default',function() {
    // gulp.series(['styles','inky','watch']);
    gulp.watch('src/html/**/*.html', gulp.series('inky'));
    gulp.watch('./scss/**/*.scss', gulp.series('styles'));

});
