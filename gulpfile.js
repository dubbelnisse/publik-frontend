const gulp = require('gulp')
const mocha = require('gulp-mocha')

require('./src/compiler.js')
require('babel-core/register')

gulp.task('mocha', () => {
  return gulp
    .src([
      './src/specHelper.js',
      './src/**/_tests_/*.spec.js'
    ])
    .pipe(mocha({
      reporter: 'dot'
    }))
})

// Rerun the task when a file changes
gulp.task('watch', () => {
  gulp.watch([
    './src/**/*.js',
    './src/**/_tests_/*.spec.js'
  ], ['mocha'])
})

gulp.task('default', [
  'mocha',
  'watch'
])
