const memefy = require('memefy');

let createHandler = function(transformer) {
  return function(event, context, callback) {
    let q = event.queryStringParameters.q;

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        text: transformer(q)
      })
    };

    callback(null, response);
  };
};

let providers = [memefy.transformers, memefy.maps]

providers.forEach((provider) => {
  Object.keys(provider).forEach((key) => {
    module.exports[key] = createHandler(memefy[key]);
  });
});
