module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      dist: {
        files: {
          'build/bundle.js': ['src/js/**/*.js'],
        }
        // options: {
        //   transform: ['coffeeify']
        // }
      }
    },
    watch: {
      scripts: {
        files: ['src/**/*.js'],
        tasks: ['build'],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['browserify']);

};