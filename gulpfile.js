const path = require('path');

const gulp = require('gulp');
const babel = require('gulp-babel');
const webpack = require('gulp-webpack');
const uglify = require('gulp-uglify');
//const sourcemaps = require('gulp-sourcemaps');

gulp.task('watch', ['client', 'server'], () => {
  gulp.watch('src/{containers,components}/**/*.{js,jsx}', ['server']);
  gulp.watch('src/**/*.{js,jsx}', ['client']);
});

gulp.task('server', () =>
  gulp.src('src/{containers,components}/**/*.{js,jsx}')
    .pipe(babel({
      presets: ['es2015', 'react']
    }))
    .pipe(gulp.dest('lib')));

gulp.task('client', () =>
  gulp.src('src/**/*.{js,jsx}')
    .pipe(babel({
      presets: ['es2015', 'react']
    }))
    .pipe(gulp.dest('app')));

gulp.task('build', () =>
  gulp.src('src/main.jsx')
    .pipe(webpack(require('./webpack.config')))
    .pipe(uglify())
    .pipe(gulp.dest('build')));

gulp.task('default', ['client', 'server']);