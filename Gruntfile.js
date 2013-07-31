module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: { all: ['Gruntfile.js', 'server.js', 'integration/**/*.js'] },
    forever: { options: { index: 'server.js' } },
    "jasmine-node": {
      run: { spec: "place holder" } // replaced at runtime from configsForJasmineNode
    }
  });

  var configsForJasmineNode = {
    "server-unit": { run: { spec: "spec/server" } },
    "integration": { run: { spec: "integration" } }
  };

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine-node');
  grunt.loadNpmTasks('grunt-forever');



  grunt.registerTask(
    'integration',
    "Run integration tests against a freshly-launched server",
    [
      'forever:start',
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


  grunt.registerTask('default',
      ['jshint', 'server-unit', 'integration']);
};