import json

import boto3

dynamodb = boto3.resource('dynamodb')
users_table = dynamodb.Table('users')
articles_table = dynamodb.Table('raw_articles')


def scan(table, **kwargs):
    response = table.scan(**kwargs)
    yield from response['Items']
    while response.get('LastEvaluatedKey'):
        response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'], **kwargs)
        yield from response['Items']


def lambda_handler(event, context):
    user_id = event['queryStringParameters']['user_id']
    if user_id is None:
        return {
            'body': 'Missing parameters',
            'statusCode': 500
        }

    user_subscriptions = users_table.get_item(Key={'_id': user_id})['Item']['subscriptions']

    print(f'Subscribed topics for user {user_id}: {user_subscriptions}')

    items = list(scan(articles_table))

    print(f'ITEMS: {items}')

    filtered_items = [x for x in items if x['topic'] in user_subscriptions]

    return {
        'body': json.dumps({'data': filtered_items}),
        'statusCode': 200,
        "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
    }
