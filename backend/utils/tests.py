import json

from django.test import Client, TestCase

from users.models import User


class AuthenticatedTestCase(TestCase):
    def setUp(self):
        self.client = Client()

        # Create user and get access token
        user = User.objects.create(name='Test', username='test', email='test@example.com')
        user.set_password('finsec')
        user.save()

        # Login and get token
        response = self.client.post('/api/token', {
            'username': 'test',
            'password': 'finsec',
        })
        access_token = json.loads(response.content.decode('utf-8'))['access']
        self.headers = {
            'HTTP_AUTHORIZATION': 'Bearer ' + access_token
        }