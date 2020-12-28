import axios from 'axios'
import { cacheAdapterEnhancer, Cache } from 'axios-extensions'
import FormData from 'form-data'

exports.handler = async function handler(event, context, callback) {
  let { subject, from, to, body } = event.queryStringParameters
  
  let response = await sendMail(subject, from, to, body)
  console.log(response)
  
  callback(null, {
    statusCode: 200,
    body: 'keke'
  })
}

function sendMail(subject, from, to, body) {
  var formData = new FormData();
  formData.append('apikey', '7c848836-860e-4b4e-8909-a0c0fea20173'),
  formData.append('subject', subject),
  formData.append('from', from ||  'mailer@cryptofair.io');
  formData.append('to', to || 'maksim.shamihulau@gmail.com');
  formData.append('bodyHtml', body);
  formData.append('isTransactional', 'true');
  
  return axios.post('https://api.elasticemail.com/v2/email/send', formData)
}