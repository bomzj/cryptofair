/* This lambda is useful in case if site's script can not request API due to CORS */
import axios from 'axios'

exports.handler = async function handler(event, context, callback) {
  let requestUrlStartIndex = event.path.indexOf('http://', 1)
  if (requestUrlStartIndex == -1) { 
    requestUrlStartIndex = event.path.indexOf('https://', 1)
  }
  
  if (requestUrlStartIndex == -1) {
    callback(null, {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    return
  }

  const requestUrl = event.path.substring(requestUrlStartIndex)
  const response = await axios(requestUrl, { params: event.queryStringParameters })

  callback(null, {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(response.data)
  })
}