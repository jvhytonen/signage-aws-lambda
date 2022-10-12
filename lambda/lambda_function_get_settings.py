"""
Lambda function for getting user settings to fetch the correct data 

Parameters:

event: string that holds the username.
"""


import boto3
import json
from variables import table_name
# The service resource.
dynamodb = boto3.resource('dynamodb')
#Name of the table where the data is fetched should not be visible for example from GitHub, hence importing it from another file. 
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    # 
    try:
        # We remove curly brackets because the whole path name is coming from another Lambda and further from API Gateway.
        user = event.strip("{}")
        #In case there is no username coming from event.
    except AttributeError as aterr:
        print('Could not find the user from \"event\"-dict')
        print(aterr)
    response = table.get_item(
         Key={
            'user_id': user
        }
    )
    try:
        data = response['Item']
        settings = json.loads(data['settings'])
        return {
           'statusCode': 200,
           'body': settings
        }
        #get_item will fetch data from DynamoDB anyway. In case there are no data for queried user, trying to 
        #access response["item"] will cause an error we are handling here:
    except KeyError as ke:
        print('User not found', ke) 
        return {
            'statusCode': 404,
            'body': 'User not found'
        }