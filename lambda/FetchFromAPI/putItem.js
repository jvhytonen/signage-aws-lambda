const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region: 'eu-north-1', apiVersion: '2012-08-10'});

function putItem(data, city, type, callback) {
    
    const flights = JSON.stringify(data.response);
    const cityType = city.toString() + type.toString()
    const params = {
       Item: {
           "CityType" : {
               S: cityType
           },
           "data" : {
               S: flights.toString()
           }
   },
   TableName: "Timetables"
   };
dynamodb.putItem(params, function(err, data) {
       if (err) {
           console.log(err);
           callback(err);
       }
       else {
           callback(null, data);
       }
       
   }
);
}
  module.exports = {
    putItem
  }