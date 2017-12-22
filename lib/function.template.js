const memefy = require('memefy');

module.exports.handle = function(event, context, callback) {
  let q = event.queryStringParameters.q;

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      text: memefy['<%= transformer %>'](q)
    })
  };

  callback(null, response);
}
