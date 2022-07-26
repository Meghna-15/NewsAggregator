import json

import boto3

dynamodb = boto3.resource('dynamodb')
users_table = dynamodb.Table('users')
articles_table = dynamodb.Table('articles')


def scan(table, **kwargs):
    response = table.scan(**kwargs)
    yield from response['Items']
    while response.get('LastEvaluatedKey'):
        response = table.scan(
            ExclusiveStartKey=response['LastEvaluatedKey'], **kwargs)
        yield from response['Items']


def lambda_handler(event, context):
    items = list(scan(articles_table))

    print(f'ITEMS: {items}')

    return {
        'data': items
    }
