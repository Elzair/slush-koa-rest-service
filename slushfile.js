var gulp = require('gulp')
  , install = require('gulp-install')
  , conflict = require('gulp-conflict')
  , template = require('gulp-template')
  , inquirer = require('inquirer')
  ;

gulp.task('default', function (done) {
  inquirer.prompt([
      // Get app name from arguments by default
      {
          type: 'input'
        , name: 'author'
        , message: 'Please input your name'
      }
    , {
          type: 'input' 
        , name: 'servname' 
        , message: 'Now, give your REST service a name' 
        , default: gulp.args.join(' ')
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
    if (!answers.moveon) {
      return done();
    }
    gulp.src(__dirname + '/templates/**')     // Note use of __dirname to be relative to generator
      .pipe(template(answers))                 // Lodash template support
      .pipe(conflict('./'))                    // Confirms overwrites on file conflicts
      .pipe(gulp.dest('./'))                   // Without __dirname here = relative to cwd
      .pipe(install())                         // Run `bower install` and/or `npm install` if necessary
      .on('end', function () {
        done();                                // Finished!
      });
  });
});
