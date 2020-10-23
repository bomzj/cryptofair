import fetch from 'node-fetch'

exports.handler = async function handler(event, context, callback) {
  const requestUrl = event.path.substring(event.path.indexOf('/', 1) + 1)
  const response = await fetch(requestUrl)
  
  callback(null, {
    statusCode: 200,
    body: await response.text()
  })
}