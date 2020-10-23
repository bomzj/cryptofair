let counter = 0;

exports.handler = function handler(event, context, callback) {
  counter++;
  console.log('keke')
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({msg: "Hello, World! " + counter})
  })
}