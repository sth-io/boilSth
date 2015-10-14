//get basic vars
var gulp = require('gulp'),
    less = require('gulp-less'),
    path = require('path'),
    minifyCSS = require('gulp-minify-css'),
    watch = require('gulp-watch'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    colors = require('colors'),
    watch = require('gulp-watch');

// your variables
var projectName = "sampleapp";


// notify on errors
var onError = function (err) {
    console.log(err)
    console.log('['+'! ERROR FOUND !'.red + ']');
    console.log('line:column: '.cyan + err.line + ':' + err.column + ' |  type: '.cyan + err.type);
    console.log('file: '.cyan + err.fileName.gray);
    console.log('message'.yellow);
    console.log(err.message.grey)
    console.log('details'.yellow);
    console.log(err.extract);
    console.log('['+'! ----------- !'.red + ']');
    this.emit('end');
};


// less task
gulp.task('less', function () {
    return gulp.src('./_src/less/base.less')
        .pipe(plumber({
          errorHandler: onError
        }))
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(minifyCSS())
        .pipe(rename(projectName+'.min.css'))
        .pipe(gulp.dest('./_dist/css'));
});

// javascript concatenation and minification
gulp.task('js', function () {
    return gulp.src('./_src/js/**/*.js')
        .pipe(plumber({
          errorHandler: onError
        }))
        .pipe(concat(projectName + '.min.js'))
        .pipe(uglify({
            mangle: false
        }))
        .pipe(gulp.dest('./_dist/js'));

});

//  concatenate your library. Insert it into array at
// return gulp.src([ 'array elem', 'array elem' ])
gulp.task('lib', function () {
    return gulp.src([
        './_src/lib/jQuery/dist/jquery.min.js'
    ])
        .pipe(plumber({
          errorHandler: onError
        }))
        .pipe(concat(projectName + '-lib.min.js'))
        .pipe(gulp.dest('./_dist/js'));
});

//used to add new styles for UI KIT preview
gulp.task('uikit', function () {
    return gulp.src('./_src/_uikit/less/base.less')
        .pipe(plumber({
          errorHandler: onError
        }))
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(minifyCSS())
        .pipe(rename('uikit.min.css'))
        .pipe(gulp.dest('./_src/_uikit/css/'));
});

gulp.task('watch', function () {
    watch('./_src/less/**/*.less', function () {
        gulp.start('less');
    });
    watch('./_src/js/**/*.js', function () {
        gulp.start('js');
    });
});

gulp.task('build', function(){
    gulp.start('less');
    gulp.start('js');
    gulp.start('lib');
})

gulp.task('uikit-watch', function () {
    watch('./_src/_uikit/less/*.less', function () {
        gulp.start('uikit');
    });
});