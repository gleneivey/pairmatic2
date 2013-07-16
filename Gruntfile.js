module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: { all: ['Gruntfile.js', 'server.js', 'integration/**/*.js'] },
    forever: { options: { index: 'server.js' } },
    "jasmine-node": {
      run: {
	spec: "integration"
      }
    }
  });



  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine-node');
  grunt.loadNpmTasks('grunt-forever');



  grunt.registerTask(
    'integration',
    "Run integration tests against a freshly-launched server",
    [ 'forever:start', 'jasmine-node', 'forever:stop' ]
  );




  grunt.registerTask('default', ['jshint', 'integration']);
};