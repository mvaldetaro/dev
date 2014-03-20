module.exports = function(grunt) {
  "use strict";
  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // RECESS
    recess: {
      build: {
        options: {
          compile: true
        },
        files: {
          'build/css/bootstrap.css': ['app/components/bootstrap/less/bootstrap.less'],
          'build/css/main.css': ['app/less/main.less']
        }
      }
    },

    // CONCAT
    concat: {
     jquery: {
      src:['app/components/jquery/jquery.js'],
      dest: 'build/js/jquery.js'
     },
     bootstrap: {
      src: [
      'app/components/bootstrap/js/transition.js',
      'app/components/bootstrap/js/alert.js',
      'app/components/bootstrap/js/button.js',
      'app/components/bootstrap/js/carousel.js',
      'app/components/bootstrap/js/collapse.js',
      'app/components/bootstrap/js/dropdown.js',
      'app/components/bootstrap/js/modal.js',
      'app/components/bootstrap/js/tooltip.js',
      'app/components/bootstrap/js/popover.js',
      'app/components/bootstrap/js/scrollspy.js',
      'app/components/bootstrap/js/tab.js',
      'app/components/bootstrap/js/affix.js'
      ],
      dest: 'build/js/bootstrap.js',
      },
      plugins: {
        src: [
        'app/components/jquery.stellar/jquery.stellar.js',
        'app/components/jquery.validation/jquery.validate.js',
        'app/components/jQuery-Mask-Plugin/jquery.mask.js',
        'app/components/picturefill/picturefill.js',
        'app/components/chosen/chosen.jquery.js',
        ],
        dest: 'build/js/plugins.js'
      },
      main: {
        src: ['app/js/main.js'],
        dest: 'build/js/main.js'
      }
    },

    jshint: {
      options:{
        jshintrc:'.jshintrc'
      },
      src: {
        src: ['Gruntfile.js']
      }
    },

    copy: {
      build: {
        files: [
          { expand: true,
            cwd: 'app/',
            src: ['*.html', '*.png', '*.ico', '*.php'],
            dest:'build/'
          },
          {
           expand: true,
            cwd: 'app/components/bootstrap/dist/fonts/',
            src: ['*.svg','*.eot', '*.ttf', '*.woff'],
            dest:'build/fonts/'
          },
          {
           expand: true,
            cwd: 'app/images/',
            src: ['*.png','*.jpg', '*.gif', '*.svg'],
            dest:'build/images/'
          },
          {
           expand: true,
            cwd: 'app/inc/',
            src: ['*.php'],
            dest:'build/inc/'
          }
        ]
      },
      /*wamp: {
        files: [
          { expand: true,
            cwd: 'build/',
            src: ['*','css/*','fonts/*','images/*','inc/*','js/*'],
            dest:'C:/wamp/www/anmeb/wp-content/themes/anmeb-alfadur/'
          }
        ]
      },*/
      dist: {
        files: [
          {
           expand: true,
            cwd: 'app/components/bootstrap/fonts/',
            src: ['*.svg','*.eot', '*.ttf', '*.woff'],
            dest:'dist/fonts/'
          },
          {
           expand: true,
            cwd: 'app/',
            src: ['*.php','*.css'],
            dest:'dist/'
          },
          {
           expand: true,
            cwd: 'app/inc/',
            src: ['*.php'],
            dest:'dist/inc/'
          }
        ]
      },
    },

    /*sync: {
      main: {
        files: [{
           cwd: 'build/',
           src: ['*','css/*','fonts/*','images/*','inc/*','js/*'],
           dest:'C:/wamp/www/anmeb/wp-content/themes/anmeb-alfadur/'
        }]
      }
    },*/

    cssmin: {
      add_banner: {
        options: {
          banner: '/* Minified css file */'
        },
        files: {
          'dist/css/main.css': ['build/css/main.css'],
          'dist/css/bootstrap.css': ['build/css/bootstrap.css']
        }
      }
    },

    uglify: {
      my_target: {
        files: {
          'dist/js/main.js': ['build/js/main.js'],
          'dist/js/plugins.js': ['build/js/plugins.js'],
          'dist/js/bootstrap.js': ['build/js/bootstrap.js']
        }
      }
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'build/images',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'dist/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'dist/index.html': 'build/index.html',
          'dist/category.html': 'build/category.html',
          'dist/page.html': 'build/page.html',
          'dist/single.html': 'build/single.html'
        }
      }
    },

    watch: {
      css: {
        files: ['app/**/*.less'],
        tasks: ['recess']
      },
      js: {
        files: ['app/js/*.js', 'app/js/**/*.js'],
        tasks: ['concat']
      },
      html: {
        files: ['app/*.html', 'app/*.php', 'app/inc/*.php'],
        tasks: ['copy:build']
      },
      copy: {
        files: ['build/*.php', 'build/*.html', 'build/css/*.css', 'build/fonts/*.{svg, eot, ttf, woff}', 'build/images/*.{png, jpg, gif}', 'build/inc/*.php', 'build/js/*.js'],
        options: {
          event: ['added', 'changed'],
        },
      },
      options: {
        livereload: true,
      }
    },

    /*'ftp-deploy': {
      build: {
        auth: {
          host: 'ftp.anmeb.org.br',
          port: 21,
          authKey: 'key1'
        },
        src: 'dist',
        dest: '/wp-content/themes/anmeb-alfadur',
        exclusions: ['*.html']
      }
    }*/
  });

  // Load the plugin that provides task.
  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-ftp-deploy');
  grunt.loadNpmTasks('grunt-sync');

  // Default task(s).
  grunt.registerTask( 'cat' , ['concat']);
  grunt.registerTask( 'less' , ['recess']);
  grunt.registerTask( 'hint' , ['jshint']);
  grunt.registerTask( 'cop' , [ 'copy' ] );
  grunt.registerTask( 'w' , ['watch']);
  grunt.registerTask('syn', 'sync');
  grunt.registerTask( 'builder' , ['concat','recess:build','copy:build'] );
  grunt.registerTask( 'wamper' , ['concat','recess:build','copy:build','copy:wamp'] );
  grunt.registerTask( 'dister' , ['uglify','cssmin','imagemin', 'copy:dist'] );
  grunt.registerTask( 'deploy' , ['ftp-deploy'] );
};