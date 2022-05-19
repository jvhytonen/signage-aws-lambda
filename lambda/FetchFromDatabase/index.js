
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region: 'eu-north-1', apiVersion: '2012-08-10'});

exports.handler = (event, context, callback) => {
    
   let params = {
    TableName: "Timetables",
    Key: {
    CityType: { S: "HELDEP" },
  },
}; 
    
dynamodb.getItem(params, function(err, data) {
        if (err) {
            console.log(err);
            callback(err);
        } else {
         const items = JSON.parse(data.Item.data.S);   
         
         
            callback(null, items);
        }
    });
};
