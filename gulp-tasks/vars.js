var app = 'app';
var devServer = '.';

module.exports = {
  appName: 'angular-starter-app',
  app: app,
  devServer: devServer,
  dist: 'dist',
  paths: {
    index: app + '/index.html',
    js: {
      libs: [
        'node_modules/angular/angular.min.js',
        'node_modules/angular-ui-router/release/angular-ui-router.min.js',
      ],
      src: [
        app + '/app.js',
        app + '/**/*-module.js',
        app + '/**/*-service.js',
        app + '/**/*-helper.js',
        app + '/**/*-directive.js',
        app + '/**/*-filter.js',
        app + '/**/*-controller.js',
        app + '/shared/**/*.js',
        '!' + app + '/**/*.karma.js',
        '!' + app + '/**/*.protractor.js',
      ]
    },
    partials: [
      app + '/**/*.html',
      '!' + app + '/index.html'
    ],
    css: [],
    less: [
      app + '/**/*.less'
    ],
    images: [],
    fonts: [],
    misc: [
      app + '/index.html', app + '/404.html', app + '/shared/resources/images/favicon.ico'
    ],
    devDistResult: [
      devServer + '/index.html',
      devServer + '/css',
      devServer + '/fonts',
      devServer + '/js',
      devServer + '/img',
      devServer + '/translations'
    ]
  },
  api: {
    pattern: 'apiUrl',
    url: 'http://YOUR_API_URL/',
  }
};