// define entry for browserify
const jsEntry = 'main.js';
const jsDir = './app/js/';
const jsFiles = [jsEntry];

const autoprefixer = require('gulp-autoprefixer'),
  browserify = require('browserify'),
  babelify = require('babelify'),
  browsersync = require('browser-sync').create(),
  buffer = require('vinyl-buffer'),
  gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  reload = browsersync.reload,
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  source = require('vinyl-source-stream'),
  sourcemaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify');

// -------------------------------------
// HTML TASK
// -------------------------------------
function html() {
  return gulp.src('./public/*.html').pipe(reload({ stream: true }));
}

// -------------------------------------
// STYLES TASK
// -------------------------------------
function styles() {
  return gulp
    .src('./app/styles/scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(plumber())
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(rename('style.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/styles/css/'))
    .pipe(reload({ stream: true }));
}

async function scripts() {
  jsFiles.map(function (entry) {
    return browserify({
      entries: [jsDir + entry],
    })
      .transform(babelify, { presets: ['@babel/preset-env'] })
      .bundle()
      .pipe(plumber())
      .pipe(source('bundle.js'))
      .pipe(rename({ extname: '.min.js' }))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./public/js'))
      .pipe(reload({ stream: true }));
  });
}

// -------------------------------------
// BROWSER-SYNC TASKS
// -------------------------------------
function browserSync() {
  // Initialize browsersync
  browsersync.init({
    server: {
      baseDir: './public',
    },
    notify: false,
    open: false,
  });
}

// -------------------------------------
// Watch TASK
// -------------------------------------
function watch() {
  gulp.watch('./public/*.html', html);
  gulp.watch('./app/styles/scss/**/*.scss', styles);
  gulp.watch('./app/js/**/*.js', scripts);
}

gulp.task('default', gulp.parallel(html, styles, scripts, browserSync, watch));
