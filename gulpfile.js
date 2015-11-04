var elixir = require('laravel-elixir');
var uglify = require('gulp-uglify');
var gulp = require('gulp');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var gulpFilter = require('gulp-filter');
var mainBowerFiles = require('gulp-main-bower-files');
var cssmin = require('gulp-cssmin');
var usemin = require('gulp-usemin');
var sourcemaps = require('gulp-sourcemaps');
var clean = require('gulp-clean');
/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */
/*
elixir(function(mix) {
    mix.sass('app.scss');
});
*/

gulp.task('default', function(){
    //runSequence('compress-app-js', 'compress-vendor-js', 'compress-app-css', 'compress-vendor-css');
    runSequence('usemin', 'copy', 'cleanup');
});

gulp.task('usemin', function(){
    return gulp.src('resources/views/main.src.php')
        .pipe(usemin({
            assetsDir: 'public',
            css: ['concat', cssmin],
            js: ['concat', uglify]
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('copy', function(){
    return gulp.src('dist/**/*.js')
    .pipe(gulp.dest('public'));
});

gulp.task('cleanup', function(){
    return gulp.src('dist', {read:false})
    .pipe(clean());
});