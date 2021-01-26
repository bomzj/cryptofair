/* This lambda is useful in case if site's script can not request API due to CORS */
import axios from 'axios'
import qs from 'qs'

// Serialize query params that represents object with props
axios.defaults.paramsSerializer = params => {
  return qs.stringify(params)
}

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
  
  try {
    var response = await axios(requestUrl, { 
      method: event.httpMethod,
      params: event.queryStringParameters,
      data: event.body
    })
  } catch (error) {
    console.error(error)
    callback(null, {
      statusCode: 500, 
      body: JSON.stringify(error)
    })
    return
  }

  callback(null, {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(response.data)
  })
}