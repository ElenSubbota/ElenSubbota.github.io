const gulp          = require('gulp');
const sass          = require('gulp-sass');
const sourcemaps    = require('gulp-sourcemaps');
const watch         = require('gulp-watch');
var spritesmith     = require('gulp.spritesmith');
var svgSprite       = require('gulp-svg-sprite'),
    svgmin          = require('gulp-svgmin'),
    cheerio         = require('gulp-cheerio'),
    replace         = require('gulp-replace');



gulp.task('sass-compile', () => {
    return gulp.src('app/scss/**/*.scss')
           .pipe(sourcemaps.init())
           .pipe(sass({outputStyle: 'nested'}).on('error', sass.logError))
           .pipe(sourcemaps.write('./'))
           .pipe(gulp.dest('app/css/'))
})

gulp.task('watch', () => {
    gulp.watch('app/scss/**/*.scss', gulp.series('sass-compile'))
})

gulp.task('scripts', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
    'app/libs/mmenu/dist/jquery.mmenu.all.js',
    'app/libs/OwlCarousel2-2.3.4/dist/owl.carousel.min.js',
		'app/js/common.min.js', // Always at the end
		])
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Mifify js (opt.)
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
});
// gulp.task('svgSprite', function () {
//     return gulp.src('img/svg/*.svg') // svg files for sprite
//         .pipe(svgSprite({
//                 mode: {
//                     symbol: {
//                         sprite: "../sprite.svg"  //sprite file name
//                     }
//                 },
//             }
//         ))
//         .pipe(gulp.dest('img/svg/'));
// });
gulp.task('svgSpriteBuild', function () {
	return gulp.src('img/svg/*.svg')
	// minify svg
		.pipe(svgmin({
			js2svg: {
				pretty: true
			}
		}))
		// remove all fill, style and stroke declarations in out shapes
		.pipe(cheerio({
			run: function ($) {
				$('[fill]').removeAttr('fill');
				$('[stroke]').removeAttr('stroke');
				$('[style]').removeAttr('style');
			},
			parserOptions: {xmlMode: true}
		}))
		// cheerio plugin create unnecessary string '&gt;', so replace it.
		.pipe(replace('&gt;', '>'))
		// build svg sprite
		.pipe(svgSprite({
			mode: {
				symbol: {
					sprite: "../sprite.svg",
					render: {
						scss: {
							dest:'../../../sass/_sprite.scss',
							template: "sass/templates/_sprite_template.scss"
						}
					}
				}
			}
		}))
		.pipe(gulp.dest('img/sprite/'));
});
// PNG-sprites
gulp.task('sprite', function () {
  var spriteData = gulp.src('img/icon/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css'
  }));
  return spriteData.pipe(gulp.dest('sprites'));
});
