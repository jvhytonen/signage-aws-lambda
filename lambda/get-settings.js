const aws = require('aws-sdk')
const lambda = new aws.Lambda({
  region: 'eu-north-1'
})

const getUserSettings = async (userName) => {
    
  let params = {
    FunctionName: 'signage-get-settings',
    Payload: JSON.stringify(userName)
  }
  try {
    const data = await lambda.invoke(params).promise()
    const result = JSON.parse(data.Payload)
    return result.body
  } catch(err) {
      console.log('Error occured!')
      throw err
  }
  
}
module.exports = {
  getUserSettings
}
