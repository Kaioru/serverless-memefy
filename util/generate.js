const fs = require('fs');
const yaml = require('js-yaml');
const memefy = require('memefy');

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

let providers = [memefy.transformers, memefy.maps]

providers.forEach((provider) => {
  Object.keys(provider).forEach((key) => {
    let f = {
      handler: `lib/handler.${key}`,
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

fs.writeFileSync('serverless.yml', yaml.safeDump(data));
