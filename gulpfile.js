const gulp = require('gulp');
const replace = require('gulp-replace');
const shell = require('gulp-shell');
const exec = require('child_process').exec;
const del = require('del');

gulp.task('preprocess', () => {
  return gulp.src('dist/**/*.js')
    .pipe(replace(/".*(config\/config.json)"/, (_, g1) => `process.cwd() + "/config.json"`))
    .pipe(gulp.dest('pkg/'))
});

gulp.task('build', ['preprocess'], (done) => {
  exec('node_modules/pkg/lib-es5/bin.js pkg/bot.js --target armv7 --out-path dist/bin/', done);
});

gulp.task('clean', ['build'], () => {
  return del(['pkg']);
});

gulp.task('pkg', ['preprocess', 'build', 'clean']);
