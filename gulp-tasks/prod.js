var streamqueue = require('streamqueue');
var pjson       = require('../package.json');
var del         = require('del');
var gulp        = require('gulp');
var $           = require('gulp-load-plugins')();
var vars        = require('./vars.js');

// 1 Clean the dist
gulp.task('prod:clean', function() {
  del([vars.dist]);
});
// 2 Set the styles
gulp.task('styles', function() {
  var stream = streamqueue({objectMode: true});

  stream.queue(
    gulp.src(vars.paths.css)
      .pipe($.concat('styles.css'))
  );

  stream.queue(
    gulp.src(vars.paths.less)
      .pipe($.concat('styles.less'))
      .pipe($.less())
      .on('error', function(err) {
        console.log(err);
        this.emit('end');
      })
  );

  return stream.done()
    .pipe($.concat('app.css'))
    .pipe($.minifyCss())
    .pipe(gulp.dest(vars.dist + '/css/'));
});
// 3 Set the fonts
gulp.task('fonts', function() {
  return gulp.src(vars.paths.fonts)
    .pipe(gulp.dest(vars.dist + '/fonts/'));
});
// 4 Set the img
gulp.task('img', function() {
   return gulp.src(vars.paths.images)
    .pipe(gulp.dest(vars.dist + '/img/'));
});
// 5 Copy the externals libs
gulp.task('js-lib', function() {
  return gulp.src(vars.paths.js.libs)
    .pipe(gulp.dest(vars.dist + '/js/'));
});
// 6 Copy the static files
gulp.task('copy-static-files', function() {
  return gulp.src(vars.paths.misc)
    .pipe(gulp.dest(vars.dist));
});
// 7 Format the js
gulp.task('js', function() {
  var stream = streamqueue({ objectMode: true });

  stream.queue(
    gulp.src(vars.paths.js.src)
      .pipe($.concat('src.js'))
  );

  stream.queue(
    gulp.src(vars.paths.partials)
      .pipe($.htmlmin({collapseWhitespace: true, removeComments: true}))
      .pipe($.angularTemplatecache({module: vars.appName}))
  );

  return stream.done()
    .pipe($.replace('@@ZIWO_VERSION@@', vars.ziwoVersion))
    .pipe($.replace(vars.api.pattern, vars.api.url))
    .pipe($.concat('app.js'))
    .pipe($.babel({
      presets: ['es2015'],
      compact: true
    }))
    .on('error', function(err) {
      console.log(err);
      this.emit('end');
    })
    .pipe(gulp.dest(vars.dist + '/js/'));
});
// 8 Inject the libs
gulp.task('inject-js-lib', ['js-lib', 'copy-static-files', 'js'], function() {
  var target  = gulp.src(vars.dist + '/index.html');
  var sources = gulp.src(vars.paths.js.libs.concat([vars.dist + '/js/app.js']), {read: false});

  return target.pipe($.inject(sources, {
    relative: true,
    transform: function(filepath, file) {
      return '<script type="text/javascript" src="js/'+ file.relative +'"></script>';
    }
  }))
  .pipe(gulp.dest(vars.dist));
});
// 9 Minify the js
gulp.task('minify-js', ['inject-js-lib'], function() {
  return gulp.src(vars.dist + '/index.html')
    .pipe($.useref())
    .pipe($.if('*.js', $.uglify({mangle: false})))
    .pipe(gulp.dest(vars.dist));
});
// 10 Clean the unused files
gulp.task('clean-js-libs', ['minify-js'], function() {
  del([vars.dist + '/js/']);
});

gulp.task('build:prod', [
  'prod:clean',
  'styles',
  'fonts',
  'img',
  'clean-js-libs'
]);
