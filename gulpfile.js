var requireDir = require('require-dir');
var gulp       = require('gulp');

requireDir('./gulp-tasks');

gulp.task('clean', ['dev:clean', 'prod:clean'])
gulp.task('dev', ['serve']);
gulp.task('default', ['build:prod']);
