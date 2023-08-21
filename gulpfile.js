'use strict';

const { src, dest } = require('gulp');
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const changed = require('gulp-changed');
const cssbeautify = require('gulp-cssbeautify');
const cssnano = require('gulp-cssnano');
const fileinclude = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const removeComments = require('gulp-strip-css-comments');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const del = require('del');
const webpack = require('webpack-stream');
const browserSync = require('browser-sync').create();

/* ========== [PATHS] ========== */
const buildFolder = `./dist`;
const srcFolder = `./src`;

const path = {
  build: {
    html: `${buildFolder}/`,
    css: `${buildFolder}/css/`,
    js: `${buildFolder}/js/`,
    images: `${buildFolder}/images/`,
    fonts: `${buildFolder}/fonts/`,
  },
  src: {
    html: `${srcFolder}/*.html`,
    css: `${srcFolder}/scss/*.scss`,
    js: `${srcFolder}/js/*.js`,
    images: `${srcFolder}/images/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${srcFolder}/images/**/*.svg`,
    fonts: `${srcFolder}/fonts/**/*.{eot,woff,woff2,ttf,svg}`,
  },
  watch: {
    html: `${srcFolder}/**/*.html`,
    css: `${srcFolder}/scss/**/*.scss`,
    js: `${srcFolder}/js/**/*.js`,
    images: `${srcFolder}/**/*.{jpg,jpeg,png,svg,gif,webp,ico}`,
    fonts: `${srcFolder}/fonts/**/*.{eot,woff,woff2,ttf,svg}`,
  },
  clean: buildFolder,
};

/* ========== [TASKS] ========== */
function server() {
  browserSync.init({
    server: {
      baseDir: buildFolder,
    },
    logLevel: 'info',
    cors: true,
    notify: false,
    port: 3000,
  });
}

function copyFavicon() {
  return src(`${srcFolder}/favicon.ico`).pipe(dest(buildFolder));
}

function html() {
  return src(path.src.html, { base: srcFolder })
    .pipe(changed(path.build.html, { hasChanged: changed.compareContents }))
    .pipe(plumber())
    .pipe(fileinclude())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest(path.build.html))
    .pipe(browserSync.stream());
}

function scss() {
  return src(path.src.css, { base: `${srcFolder}/scss/` })
    .pipe(changed(path.build.css))
    .pipe(
      plumber({
        errorHandler: function (err) {
          notify.onError({
            title: 'SCSS Error',
            message: 'Error: <%= error.message %>',
          })(err);
          this.emit('end');
        },
      })
    )
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer())
    .pipe(cssbeautify())
    .pipe(dest(path.build.css))
    .pipe(
      cssnano({
        zindex: false,
        discardComments: {
          removeAll: true,
        },
      })
    )
    .pipe(removeComments())
    .pipe(
      rename({
        suffix: '.min',
        extname: '.css',
      })
    )
    .pipe(dest(path.build.css))
    .pipe(browserSync.stream());
}

function js() {
  return src(path.src.js, { base: `${srcFolder}/js/` })
    .pipe(changed(path.build.js))
    .pipe(
      plumber({
        errorHandler: function (err) {
          notify.onError({
            title: 'JavaScript Error',
            message: 'Error: <%= error.message %>',
          })(err);
          this.emit('end');
        },
      })
    )
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(dest(path.build.js))
    .pipe(browserSync.stream());
}

function images() {
  return src(path.src.images, { base: `${srcFolder}/images/` })
    .pipe(changed(path.build.images))
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 80, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: false }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest(path.build.images))
    .pipe(src(path.src.svg))
    .pipe(dest(path.build.images))
    .pipe(browserSync.stream());
}

function fonts() {
  return src(path.src.fonts, { base: `${srcFolder}/fonts/` })
    .pipe(changed(path.build.fonts))
    .pipe(dest(path.build.fonts))
    .pipe(browserSync.stream());
}

function clean() {
  return del(path.clean);
}

function watcher() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], scss);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.images], images);
  gulp.watch([path.watch.fonts], fonts);
}

const tasks = gulp.parallel(copyFavicon, html, scss, js, images, fonts);

const build = gulp.series(clean, tasks);
const watch = gulp.parallel(build, watcher, server);

/* ========== [EXPORTS] ========== */
exports.copyFavicon = copyFavicon;
exports.html = html;
exports.scss = scss;
exports.js = js;
exports.images = images;
exports.fonts = fonts;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = watch;
