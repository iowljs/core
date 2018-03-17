var gulp = require('gulp')
var typescript = require('gulp-tsc')
var browserify = require("browserify")
var tsify = require('tsify')
var source = require('vinyl-source-stream')
var concat = require('gulp-concat')

gulp.task('compile', () => {
    return browserify({
        basedir: '.',
        debug: false,
        entries: ['bootstrap.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify, {
       target: "es3",
       noImplicitAny: false,
       surpressImplicityAnyIndexErrors: false,
       jsx: "react"
    })
    .bundle()
    .pipe(source('ts.js'))
    .pipe(gulp.dest('build'))
})