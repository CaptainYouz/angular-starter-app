var streamqueue = require('streamqueue');
var gulp        = require('gulp');
var gutil       = require('gulp-util');
var concat      = require('gulp-concat');
var replace     = require('gulp-replace');
var htmlmin     = require('gulp-htmlmin');
var ngtemplates = require('gulp-angular-templatecache');
var less        = require('gulp-less');
var jshint      = require('gulp-jshint');
var uglify      = require('gulp-uglify');
var minifyCss   = require('gulp-minify-css');
var livereload  = require('gulp-livereload');
var babel       = require('gulp-babel');

var appName     = 'skeleton-app';
var app         = 'app';
var dist        = 'dist';

var env         = (gutil.env.env === 'production') ? gutil.env.env : 'development';

gutil.log('Building of the ' + env + ' environment.');

var paths = {
  js: {
    libs: [
      'bower_components/moment/min/moment.min.js',
      'bower_components/lodash/lodash.min.js',
      'bower_components/angular/angular.min.js',
      'bower_components/angular-bootstrap/ui-bootstrap.min.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
      'bower_components/angular-ui-router/release/angular-ui-router.min.js',
    ],
    src: [
      app + '/app.js',
      app + '/**/*-module.js',
      app + '/**/*-service.js',
      app + '/**/*-directives.js',
      app + '/**/*-filter.js',
      app + '/**/*-controller.js'
    ]
  },
  partials: [
    app + '/**/*.html', '!' + app + '/index.html', '!' + app + '/plugins/**/*.html'
  ],
  css: [
    'bower_components/font-awesome/css/font-awesome.css',
    'bower_components/bootstrap/dist/css/bootstrap.css',
    'bower_components/angular-bootstrap/ui-bootstrap-csp.css'
  ],
  less: [
    app + '/**/*.less'
  ],
  images: [
    app + '/**/*.{png,jpg,svg,gif,jpeg,ico,PNG,JPG,SVG,GIF,JPEG}'
  ],
  fonts: [
    'bower_components/bootstrap/fonts/**/*',
    'bower_components/font-awesome/fonts/**/*',
  ],
  misc: [
    app + '/index.html', app + '/404.html'
  ]
};

// @toDo: move in a proper config file
var api = {
  pattern:  '@@api',
  urlDev:   'YOUR_API_URL_DEV',
  urlProd:  'YOUR_API_URL_PROD'
};

var apiUrl = api.urlDev;

gulp.task('jshint', function () {
  return gulp.src(paths.js.src)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('js', function() {
  var stream = streamqueue({ objectMode: true });

  gulp.src(paths.js.libs)
    .pipe(gulp.dest(dist + '/js/'));

  stream.queue(
    gulp.src(paths.js.src)
      .pipe(concat('src.js'))
    );

  stream.queue(
    gulp.src(paths.partials)
      .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
      .pipe(ngtemplates({module: appName}))
    );

  return stream.done()
    .pipe(replace(api.pattern, apiUrl))
    .pipe(concat('app.js'))
    .pipe(babel({
      presets: ['es2015']
    }))
    .on('error', function(err) {
      console.log(err);
      this.emit('end');
    })
    .pipe(env === 'production' ? uglify({mangle: false}) : gutil.noop())
    .pipe(gulp.dest(dist + '/js/'))
    .pipe(livereload());
});

gulp.task('styles', function () {
  var stream = streamqueue({ objectMode: true });

  stream.queue(
    gulp.src(paths.css)
      .pipe(concat('styles.css'))
  );

  stream.queue(
    gulp.src(paths.less)
      .pipe(concat('styles.less'))
      .pipe(less())
  );

  return stream.done()
    .pipe(concat('app.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest(dist + '/css/'))
    .pipe(livereload());
});

gulp.task('copy', function () {
  return gulp.src(paths.misc)
    .pipe(gulp.dest(dist));
});

gulp.task('img', function () {
  return gulp.src(paths.images)
    .pipe(gulp.dest(dist + '/img/'));
});

gulp.task('fonts', function () {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest(dist + '/fonts/'));
});

gulp.task('utils', function () {
  gulp.src('bower_components/angular/angular.min.js.map')
    .pipe(gulp.dest(dist + '/js/'));

  gulp.src('bower_components/bootstrap/dist/css/bootstrap.css.map')
    .pipe(gulp.dest(dist + '/css/'));
});

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch(paths.js.src, ['js']);
  gulp.watch(paths.less, ['styles']);
  gulp.watch(paths.misc, ['copy']);
  gulp.watch(paths.partials, ['styles', 'js']);
});

gulp.task('default', [
    'jshint',
    'js',
    'styles',
    'copy',
    'fonts',
    'img',
    'utils'
  ]);
