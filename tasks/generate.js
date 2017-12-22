const memefy = require('memefy');

module.exports = function(gulp, options, plugins) {
  gulp.task('generate:handler', function() {
    let providers = [memefy.transformers, memefy.maps]

    providers.forEach((provider) => {
      Object.keys(provider).forEach((key) => {
        gulp.src('lib/function.template.js')
          .pipe(plugins.data(() => ({
            transformer: key
          })))
          .pipe(plugins.template())
          .pipe(plugins.rename(`${key}.js`))
          .pipe(gulp.dest('dist/functions'));
      });
    });
  });

  gulp.task('generate:yaml', function(callback) {
    let fs = require('fs');
    let yaml = require('js-yaml');
    let providers = [memefy.transformers, memefy.maps]
    let data = {
      service: 'serverless-memefy',

      provider: {
        name: 'aws',
        runtime: 'nodejs6.10'
      },

      plugins: [
        'serverless-offline'
      ],

      functions: {}
    }

    providers.forEach((provider) => {
      Object.keys(provider).forEach((key) => {
        let f = {
          handler: `functions/${key}.handle`,
          events: []
        }
        let e = {
          path: `${key}`,
          method: 'post',
          cors: true
        }

        f.events.push({
          http: e
        });
        data.functions[key] = f;
      });
    });

    fs.writeFile('./dist/serverless.yml', yaml.safeDump(data), callback);
  });

  gulp.task('generate:package', function() {
    gulp.src(['package.json', 'package-lock.json', 'node_modules'])
      .pipe(gulp.dest('dist'));
  });

  gulp.task('generate:config', ['generate:package', 'generate:yaml']);
};
