var exec     = require('child_process').exec
  , gulp     = require('gulp')
  , install  = require('gulp-install')
  , conflict = require('gulp-conflict')
  , template = require('gulp-template')
  , inquirer = require('inquirer')
  , path     = require('path')
  , rename   = require('gulp-rename')
  ;

gulp.task('default', function (done) {
  inquirer.prompt([

      {
          type: 'input'
        , name: 'author'
        , message: 'Input your name'
      }
    // Get app name from arguments by default
    , {
          type: 'input' 
        , name: 'servname' 
        , message: 'Now, give your REST service a name' 
        , default: path.basename(process.cwd())
      } 
    , {
          type: 'input'
        , name: 'servdesc'
        , message: 'Describe your service'
      }
    , {
          type: 'input'
        , name: 'license'
        , message: 'What license do you wish to use?'
      }
    , {
          type: 'confirm' 
        , name: 'moveon' 
        , message: 'Continue?'
      }
  ],
  function (answers) {
    console.log(answers);
    if (!answers.moveon) {
      return done();
    }
    gulp.src(__dirname + '/templates/**')       // Note use of __dirname to be relative to generator
      .pipe(template(answers))                 // Lodash template support
      .pipe(rename(function(file) {            // Rename pseudo-hidden files
        if (file.basename[0] === '_') {
          file.basename = '.' + file.basename.slice(1);
        }
      }))
      .pipe(conflict('./'))                    // Confirms overwrites on file conflicts
      .pipe(gulp.dest('./'))                   // Without __dirname here = relative to cwd
      .pipe(install())                         // Run `bower install` and/or `npm install` if necessary
      .on('end', function () {
        done();
      });
  });
});
