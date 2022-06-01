const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region: 'eu-north-1', apiVersion: '2012-08-10'});

const getItem = (tableName, city, type, callback) => {
    const attrName = city.toString() + type.toString()

    let params = {
        TableName: tableName,
        Key: {
        CityType: { S: attrName },
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
}
module.exports = {
    getItem
}