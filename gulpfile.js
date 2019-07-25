const gulp = require('gulp');
const fs = require('fs');
const hb = require('gulp-hb');
var del = require('del');

var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

const autoprefixer = require('gulp-autoprefixer');

var sassOptions = {
  errLogToConsole: true,
  sourceComments: 'map',
  outputStyle: 'expanded'
};

gulp.task('sass', function () {
  return gulp.src('scss/**/*.scss')
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
});

gulp.task('watch', ['templates', 'sass', 'copyjs',  'browser-sync'], function () {
  gulp.watch('scss/**/*.scss', ['sass']);
  gulp.watch('src/**/*.json', ['templates']);
  gulp.watch('src/**/*.js', ['templates' , 'copyjs']);
  gulp.watch('src/**/*.hbs', ['templates']);
  gulp.watch("src/**/*.html", ['templates']);
});

// Basic

function basic() {
    return gulp
        .src('./src/assets/*.html')
        .pipe(hb()
            .partials('./src/assets/partials/**/*.hbs')
            .helpers('./src/assets/helpers/*.js')
            .helpers({
                unsaludo: function () { 
                    return 'hola estoy saludando';
                 },
                ifvalue: function (conditional, options) {
                    if (options.hash.value === conditional) {
                        return options.fn(this)
                    } else {
                        return options.inverse(this);
                    }
                }
            })
            .data('./src/assets/data/**/*.{js,json}')
        )
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
}

gulp.task('templates', basic);

gulp.task('copyjs', function () {
    del.sync('./dist/*.js')
    gulp.src('./src/assets/*.js')
        .pipe(gulp.dest('./dist/'));
});

gulp.task('browser-sync',['templates'], function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});
