const gulp = require('gulp');
const { series } = require('gulp')
const sass = require('gulp-sass')(require('sass'));
const fileinclude = require('gulp-file-include');
const imagemin = require("gulp-imagemin");
const cssnano = require('gulp-cssnano');

function defaultTask(cb) {
    // place code for your default task here
    cb();
}

function buildStyles() {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('app/css'));
};

function include() {
    gulp.src(['app/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./dist/'));
}

function imgmin() {
  return gulp
  .src('app/img/*.*')
  .pipe(
    imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 80, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
      }),
    ])
  )
  .pipe(gulp.dest("dist/img"));
}

function iconmin() {
  return gulp
  .src('app/icon/*.*')
  .pipe(
    imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 80, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
      }),
    ])
  )
  .pipe(gulp.dest("dist/icon"));
}

function cssdist() {
  return gulp.src('app/css/*.css') 
      .pipe(cssnano())
      .pipe(gulp.dest('dist/сss'));
}

exports.default = defaultTask; // gulp
exports.file = include; // gulp file
exports.scss = buildStyles; // gulp scss
exports.css = cssdist;
exports.img = imgmin;
exports.ico = iconmin;

exports.dev = series(
  buildStyles,
  cssdist,
  // imgmin,
  iconmin,
  include
)

