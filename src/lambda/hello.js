let counter = 0;

exports.handler = function handler(event, context, callback) {
  counter++;
  
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({msg: "Hello, World! " + counter})
  })
}