from django.test import Client, TestCase

from .models import User


class UserTest(TestCase):
    def setUp(self):
        user = User.objects.create(username="test", email="test@example.com")
        user.set_password(raw_password="finsec")
        user.save()

    def test_create_user(self):
        c = Client()
        
        # Duplicate username
        response = c.post('/api/users', {
            "username": "test",
            "email": "test2@example.com",
            "password": "failure"
        })
        self.assertEqual(response.status_code, 400)

        # Duplicate email
        response = c.post('/api/users', {
            "username": "test2",
            "email": "test@example.com",
            "password": "failure"
        })
        self.assertEqual(response.status_code, 400)

        # Successfully created user
        response = c.post('/api/users', {
            "username": "test2",
            "email": "test2@example.com",
            "password": "success"
        })
        self.assertEqual(response.status_code, 201)
        
        user = User.objects.get(username="test2")
        self.assertEqual(user.email, "test2@example.com")
        self.assertTrue(user.check_password("success"))

        
