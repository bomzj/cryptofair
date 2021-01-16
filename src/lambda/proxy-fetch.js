/* This lambda is useful in case if site's script can not request API due to CORS */
import axios from 'axios'

exports.handler = async function handler(event, context, callback) {
  const requestUrl = event.path.substring(event.path.indexOf('/', 1) + 1)
  console.log(requestUrl)
  console.log(event.queryStringParameters)
  const response = await axios(requestUrl, { params: event.queryStringParameters })
  
  callback(null, {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(response.data)
  })
}