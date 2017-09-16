const gulp=require('gulp');

const browserSync = require('browser-sync');




gulp.task('default',function() {
    /***自动开启浏览器，多屏共享*****/
    browserSync.init({
        server: {
            baseDir: "dist/"
        }
    });
    
});