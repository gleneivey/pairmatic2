module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: { all: ['Gruntfile.js', 'server.js', 'integration/**/*.js'] },
    handlebars: { compile: {
        files: { "client/js/templates.js": ["client/js/templates/*.hbs"] }
    } },
    sass: { dist: {
      files: {
        'client/stylesheets/pairmatic.css': 'client/stylesheets/scss/*.scss'
      }
    } },
    forever: { options: { index: 'server.js' } },
    env: { test: { PAIRMATIC_DB_EXTENSION: "_test" } },
    "jasmine-node": {
      run: { spec: "place holder" } // replaced at runtime from configsForJasmineNode
    }
  });

  var configsForJasmineNode = {
    "server-unit": { run: { spec: "spec/server" } },
    "integration": { run: { spec: "integration" } }
  };

  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-forever');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-jasmine-node');


  grunt.registerTask(
    'integration',
    "Run HTTP and browser integration tests against a freshly-launched server",
    [
      'build', 'env:test', 'forever:start',
          'jasmine-setup:integration', 'jasmine-node',
      'forever:stop'
    ]
  );

  grunt.registerTask(
    'server-unit',
    "Run unit tests on server-side code",
    [ 'jasmine-setup:server-unit', 'jasmine-node' ]
  );

  grunt.registerTask('jasmine-setup', "rewrite jasmine-node config",
      function(configName) {
        grunt.config.data['jasmine-node'] = configsForJasmineNode[configName];
      }
  );


  grunt.registerTask('build', ['handlebars', 'sass']);
  grunt.registerTask('default', ['jshint', 'server-unit', 'integration']);
};
