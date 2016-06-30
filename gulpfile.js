var gulp = require('gulp')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')

gulp.task('default', function(){
    return gulp.src('aniframe.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./'))
})
