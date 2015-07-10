var gulp        = require('gulp');
var concat      = require('gulp-concat');
var streamqueue = require('streamqueue');
var htmlmin     = require('gulp-htmlmin');
var ngtemplates = require('gulp-angular-templatecache');
var less        = require('gulp-less');
var livereload  = require('gulp-livereload');
var plumber     = require('gulp-plumber');

var app         = 'app';
var dist        = 'dist';

var paths = {
    js: {
        libs: [
            'bower_components/lodash/lodash.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-ui-router/release/angular-ui-router.js'
        ],
        src: [
            app 		+ '/app.js',
            app 		+ '/**/*-module.js',
            app 		+ '/**/*-service.js',
            app 		+ '/**/*-directive.js',
            app 		+ '/**/*-filter.js',
            app 		+ '/**/*-controller.js',
        ]
    },
    partials: [
        { files: [ app + '/**/*.html', '!' + app + '/index.html' ] }
    ],
    css: [
        'bower_components/bootstrap/dist/css/bootstrap.css',
    ],
    less: [
        app + '/**/*.less',
    ],
    images: [
        app + '/img/**/*.{png,jpg,svg,gif,jpeg}',
    ],
    fonts: [
        'bower_components/bootstrap/fonts/**/*',
    ],
    misc: [
        app + '/index.html', app + '/404.html'
    ]
};

gulp.task('js', function () {
    var stream = streamqueue({ objectMode: true });

    stream.queue(
        gulp.src(paths.js.libs.concat(paths.js.src))
            .pipe(plumber())
            .pipe(concat('src.js'))
    );

    paths.partials.forEach(function (partials) {
        stream.queue(
            gulp.src(partials.files)
                .pipe(plumber())
                .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
                .pipe(ngtemplates({ module: 'skeleton-app', root: partials.root }))
        );
    });

    stream.done()
        .pipe(plumber())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(dist + '/js/'))
        .pipe(livereload());
});

gulp.task('styles', function () {
    var stream = streamqueue({ objectMode: true });

    stream.queue(
        gulp.src(paths.css)
            .pipe(plumber())
            .pipe(concat('styles.css'))
    );

    stream.queue(
        gulp.src(paths.less)
            .pipe(plumber())
            .pipe(concat('styles.less'))
            .pipe(less())
    );

    stream.done()
        .pipe(concat('app.css'))
        .pipe(plumber())
        .pipe(gulp.dest(dist + '/css/'))
        .pipe(livereload());
});

gulp.task('copy', function () {
    gulp.src(paths.misc)
        .pipe(gulp.dest(dist))
        .pipe(livereload());

    gulp.src(paths.fonts)
        .pipe(plumber())
        .pipe(gulp.dest(dist + '/fonts/'));
});

gulp.task('img', function () {
     return gulp.src(paths.images)
        .pipe(plumber())
        .pipe(gulp.dest(dist + '/img/'));
});

gulp.task('fonts', function () {
    return gulp.src(paths.fonts)
        .pipe(plumber())
        .pipe(gulp.dest(dist + '/fonts/'));
});

gulp.task('utils', function () {
    gulp.src('bower_components/angular/angular.min.js.map')
        .pipe(plumber())
        .pipe(gulp.dest(dist + '/js/'));

    return gulp.src('bower_components/bootstrap/dist/css/bootstrap.css.map')
        .pipe(plumber())
        .pipe(gulp.dest(dist + '/css/'));
});

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(paths.js.src, ['js']);
    gulp.watch(paths.sass, ['styles']);
    gulp.watch(paths.misc, ['copy']);
    paths.partials.forEach(function (partials) {
        gulp.watch(partials.files, ['js']);
    });
});

gulp.task('default', [
    'js',
    'styles',
    'copy',
    'fonts',
    'img',
    'utils'
]);
