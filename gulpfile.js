const gulp = require('gulp');
const zip = require('gulp-zip');
 
gulp.task('default', () =>
    gulp.src([
    	'Logo.png',
    	'chrome.png',
    	'icon128.png',
    	'icon16.png',
    	'icon48.png',
    	'youtube.png',
    	'manifest.json',
    	'popup.html',
    	'options.html',
    	'main.js',
    	'options.js',
    	'styles.css',
        'bubblesee.css',
        'bubblesee.js'
    ])
    .pipe(zip('archive.zip'))
    .pipe(gulp.dest('dist'))
);