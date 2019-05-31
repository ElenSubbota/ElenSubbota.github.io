var gulp           = require('gulp');
    // pug            = require('gulp-pug');
var sass           = require('gulp-sass');
var csso           = require('gulp-csso');
var sourcemaps     = require('gulp-sourcemaps');
var browserSync    = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
var concat         = require('gulp-concat');
var spritesmith    = require('gulp.spritesmith');
var fileinclude    = require('gulp-file-include');
const imagemin     = require('gulp-imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminJpegtran = require('imagemin-jpegtran');


// Таск для оптимизации изображений
gulp.task('img', () =>
    gulp.src('src/img/*')
        .pipe(imagemin([
          imagemin.gifsicle({interlaced: true}),
          imagemin.jpegtran({progressive: true}),
          imagemin.optipng({optimizationLevel: 5}),
          imagemin.svgo({
              plugins: [
                  {removeViewBox: true},
                  {cleanupIDs: false}
              ]
        })
    ]))
        .pipe(gulp.dest('build/img/'))
);

gulp.task('fonts', function() {
    return gulp.src('./src/static/fonts/**/*.*')
      .pipe(gulp.dest('./build/static/fonts/'));
});

gulp.task('html', function(done) {
  gulp.src('src/html/[^_]*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.reload({
      stream: true
    }));
    done();
});


gulp.task('sprite', function () {
  var spriteData = gulp.src('src/img/icon/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.scss',
    padding: 20,
    algorithm: "top-down"
  }));
  return spriteData.pipe(gulp.dest('build/sprites/'));
});

// Слияние бибилиотек в один файл
gulp.task('scripts:lib', function () {
    return gulp.src(['node_modules/jquery/dist/jquery.min.js',
     'node_modules/owl.carousel/dist/owl.carousel.min.js'])
        .pipe(concat('libs.min.js'))
        .pipe(gulp.dest('build/static/js/'))
        .pipe(browserSync.reload({
          stream: true
        }));
})
// копирование js файла в build
gulp.task('scripts', function () {
    return gulp.src('src/static/js/main.js')
        .pipe(gulp.dest('build/static/js/'))
        .pipe(browserSync.reload({
          stream: true
        }));
})

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    });
});

// gulp.task('pug', function () {
//     return gulp.src('src/pug/pages/*.pug')
//         .pipe(pug({
//             pretty:true
//         }))
//         .pipe(gulp.dest('build'))
//         .pipe(browserSync.reload({
//           stream: true
//         }));
// })
// компиляция sass
gulp.task('sass', function () {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    // плагин csso обьединяет свойства в один класс в конечный css, если они были раскиданы по разным частям в процессе разработки
    .pipe(csso())
    .pipe(autoprefixer({
            browsers: ['last 15 versions'],
            cascade: true
       }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/css/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('watch', () => {
    // gulp.watch('src/pug/**/*.pug', gulp.series('pug'));
    gulp.watch('src/html/**/*.html', gulp.series('html'));
    gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('src/static/js/**/*.js', gulp.series('scripts'))
});

gulp.task('default',gulp.series(
  gulp.parallel('html', 'sass', 'scripts:lib', 'scripts', 'fonts'),
  gulp.parallel('watch', 'browser-sync')
));
