# Browserify-Gulp-Babelify-React
    const gulp = require('gulp');
    const uglify = require('gulp-uglify');
    const htmlreplace = require('gulp-html-replace');
    const source = require('vinyl-source-stream');
    const browserify = require('browserify');
    const watchify = require('watchify');
    const babel = require('babelify');
    const streamify = require('gulp-streamify');
    const { parallel } = require('gulp');
    // 位置参数
    const path = {
      HTML: 'index.html',
      MINIFIED_OUT: 'bundle.min.js',
      OUT: 'bundle.js',
      DEST: 'dist',
      DEST_BUILD: 'dist/build',
      DEST_SRC: 'dist/src',
      ENTRY_POINT: './app/index.js'
    };
    // 复制 html 到 dist
    function copy(){
      gulp.src(path.HTML)
         .pipe(gulp.dest(path.DEST))
    }
   
    // 监听 HTML 是否变化 是复制到 dist
    function watch(){
      gulp.watch(path.HTML,copy);
      var watcher  = watchify(browserify({
        entries: [path.ENTRY_POINT],
        transform: [babel],
        debug: true,
      }));
    return watcher.on('update', function () {
        watcher.bundle()
          .pipe(source(path.OUT))
          .pipe(gulp.dest(path.DEST_SRC))
          console.log('Updated');
      })
        .bundle()
        .pipe(source(path.OUT))
        .pipe(gulp.dest(path.DEST_SRC));
    }
    
    // 执行 production 转义
    function Copys(){
      browserify({
        entries: [path.ENTRY_POINT],
        transform: [babel],
      })
        .bundle()
        .pipe(source(path.MINIFIED_OUT))
        .pipe(streamify(uglify(path.MINIFIED_OUT)))
        .pipe(gulp.dest(path.DEST_BUILD));
    }
    // dist script 引用替换
    function replaceHTML(){
      gulp.src(path.HTML)
      .pipe(htmlreplace({
        'js': 'build/' + path.MINIFIED_OUT
      }))
      .pipe(gulp.dest(path.DEST));
    }
  // 执行 gulp 会执行 gulp default 的任務：copy,watch。若跑 gulp production，則會執行 Copys,replaceHTML
   const build = parallel(copy,watch);
   const production = parallel(Copys,replaceHTML);

   exports.default = build;
   exports.production = production;
   
