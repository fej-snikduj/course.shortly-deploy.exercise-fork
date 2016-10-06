module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // env : {
    //   options : {
    // //Shared Options Hash 
    //   },
    //   dev : {
    //     NODE_ENV : 'development',
    //     DEST     : 'temp'
    //   },
    //   build : {
    //     NODE_ENV : 'production',
    //     DEST     : 'dist',
    //     concat   : {
    //       PATH     : {
    //         'value': 'node_modules/.bin',
    //         'delimiter': ':'
    //       }
    //     }
    // },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['public/**/*.js'],
        dest: 'public/dist/built.js'
      }
    },

    clean: {
      build: ["public/dist"],
    },


    gitpush: {
      your_target: {
        options: {
          remote: 'live',
          branch: 'master'
          // Target-specific options go here. 
        }
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      my_target: {
        files: {
          'public/dist/built.min.js' : ['public/dist/built.js']
        }
      }
    },

    eslint: {
      target: [
        // Add list of files to lint here
      ]
    },

    cssmin: {
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-git');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('push', ['gitpush']);

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', ['clean', 'concat', 'uglify'
  ]);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('env') === 'production') {
      console.log('correctly sent env to production');
      // add your production server task here

    } else {
      console.log('failed to set env to production');
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    // add your deploy tasks here
  ]);
//add a grunt 
  grunt.registerTask('default', []);


};
