var exec     = require('child_process').exec
  , gulp     = require('gulp')
  , install  = require('gulp-install')
  , conflict = require('gulp-conflict')
  , template = require('gulp-template')
  , inquirer = require('inquirer')
  , path     = require('path')
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
        , name: 'gitrepo'
        , message: 'Create Git repository?'
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
    gulp.src(__dirname + '/templates/**')     // Note use of __dirname to be relative to generator
      .pipe(template(answers))                 // Lodash template support
      .pipe(conflict('./'))                    // Confirms overwrites on file conflicts
      .pipe(gulp.dest('./'))                   // Without __dirname here = relative to cwd
      .pipe(install())                         // Run `bower install` and/or `npm install` if necessary
      .on('end', function () {
        if (answers.gitrepo) {
          exec('git init && git add . && git commit -m "Initial commit"', function(error, stdout, stderr) {
            if (!error) {
              console.error('Error creating Git Repository: ' + error);
            }
            done();
          });
        }
        else {
          done();
        }
      });
  });
});
