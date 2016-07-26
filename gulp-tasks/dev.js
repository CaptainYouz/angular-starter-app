var streamqueue = require('streamqueue');
var pjson       = require('../package.json');
var vars        = require('./vars.js');
var del         = require('del');
var gulp        = require('gulp');
var $           = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();

// GENERAL TASKS
gulp.task('dev:clean', function() {
  del(vars.paths.devDistResult);
});

// Static Server + watching scss/html files
gulp.task('serve', ['dev:clean', 'dev:img', 'dev:less', 'dev:inject', 'dev:js'], function() {
  browserSync.init({
    server: vars.devServer
  });

  gulp.watch(vars.paths.less, ['dev:less']);
  gulp.watch(vars.paths.js.src, ['dev:js']);
  gulp.watch(vars.paths.partials, ['dev:partials']);
  gulp.watch(vars.paths.index, ['dev:inject']);
  gulp.watch([vars.paths.partials, vars.paths.misc, vars.paths.js.src]).on('change', browserSync.reload);
});

/**
 * Inject all external styles into the index html
 */
gulp.task('dev:inject', ['dev:js'], function() {
  var cssSources   = gulp.src(vars.paths.css, {read: false});
  var jsLibSources = gulp.src(vars.paths.js.libs, {read: false});
  var jsSources    = gulp.src(vars.paths.js.src.concat([vars.devServer + '/js/templates.js']), {read: false});

  return gulp.src(vars.paths.index)
  .pipe(gulp.dest(vars.devServer))
  .pipe($.inject(cssSources, {
    relative: true,
    transform: function(filepath, file) {
      return '<link href="'+ filepath +'" rel="stylesheet">';
    }
  }))
  .pipe($.inject(jsLibSources, {
    relative: true,
    transform: function(filepath, file) {
      return '<script type="text/javascript" src="'+ filepath +'"></script>';
    }
  }))
  .pipe($.inject(jsSources, {
    relative: true,
    starttag: '<!-- inject:sources:js -->',
    transform: function(filepath, file) {
      return '<script type="text/javascript" src="'+ vars.devServer +'/js/'+ file.relative +'"></script>';
    }
  }))
  .pipe(gulp.dest(vars.devServer));
});

//
// JS
//
gulp.task('dev:js', ['dev:partials'], function() {
  return gulp.src(vars.paths.js.src)
    .pipe($.cached('babelyify'))
    .pipe($.replace(vars.api.pattern, vars.api.url))
    .pipe($.babel({
      presets: ['es2015'],
      compact: true
    }))
    .on('error', function(err) {
      console.log(err);
      this.emit('end');
    })
    .pipe(gulp.dest(vars.devServer + '/js'));
});

//
// PARTIALS
//
gulp.task('dev:partials', function() {
  return gulp.src(vars.paths.partials)
    .pipe($.htmlmin({collapseWhitespace: true, removeComments: true}))
    .pipe($.angularTemplatecache({module: vars.appName}))
    .pipe($.concat('templates.js'))
    .pipe(gulp.dest(vars.devServer + '/js'));
});

//
// STYLES
//
gulp.task('dev:less', ['dev:fonts'], function() {
  return gulp.src(vars.paths.less)
    .pipe($.concat('app.less'))
    .pipe($.less())
    .on('error', function(err) {
      console.log(err);
      this.emit('end');
    })
    .pipe(gulp.dest(vars.devServer + '/css'))
    .pipe(browserSync.stream());
});

gulp.task('dev:fonts', function() {
  return gulp.src(vars.paths.fonts)
    .pipe(gulp.dest(vars.devServer + '/fonts/'));
});

//
// IMAGE
//
gulp.task('dev:img', function() {
   return gulp.src(vars.paths.images)
    .pipe(gulp.dest(vars.devServer + '/img/'));
});
