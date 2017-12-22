const gulp = require('gulp');
const run = require('gulp-run');

require('load-gulp-tasks')(gulp, {
  pattern: ['tasks/**/*.js']
});

gulp.task('serve', ['default'], function() {
  return run('sls offline start', {
    cwd: './dist',
    verbosity: 3,
    silent: false
  }).exec();
});

gulp.task('default', ['generate:config', 'generate:handler']);
