var modules = [
  'bower_components/lodash/lodash.js',
  'bower_components/angular/angular.js',
  'bower_components/angular-ui-router/release/angular-ui-router.js'
];

module.exports = function(grunt) {
  grunt.initConfig({
    clean: ['dist/'],
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [ modules, 'app/js/*.js', 'app/js/controllers/*.js' ],
        dest: 'dist/js/app.js'
      }
    },
    copy: {
      main: {
        expand: true,
        cwd: 'app/',
        src: ['index.html', 'partials/*.html'],
        dest: 'dist/'
      }
    },
    less: {
      dev: {
        options: {
          paths: ['app/less']
        },
        files: {'dist/css/app.css': 'app/less/app.less'}
      },
      prod: {
        options: {
          paths: ['app/less'],
          cleancss: true
        },
        files: {'dist/css/app.css': 'app/less/app.less'}
      }
    },
    watch: {
      files: 'app/**',
      tasks: ['concat', 'less:prod', 'copy'],
      options: {
        livereload: true,
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['clean', 'concat', 'less:prod', 'copy:main']);
};