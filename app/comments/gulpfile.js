process.env.DISABLE_NOTIFIER = true;

var elixir = require('laravel-elixir');

require('laravel-elixir-js-uglify')

elixir.config.sourcemaps = false;

var jsDest  = 'public/js/';
var cssDest = 'public/css/';

elixir(function(mix) {
    // mix.less('bootstrapless.less', cssDest + 'bootstrapless.css', {compress: true});
    mix.less('comments.less', cssDest + 'comments.css')
       .less('admin.less', cssDest + 'admin.css')
       .less('demo.less', cssDest + 'demo.css');

    mix.browserify('admin.js', jsDest + 'admin.js', null, {debug: elixir.config.sourcemaps});
    mix.browserify('comments.js', jsDest + 'comments.js', null, {debug: elixir.config.sourcemaps});

    // Minify JS files.
    mix.uglify(['admin.js', 'comments.js'], jsDest, jsDest);
});
