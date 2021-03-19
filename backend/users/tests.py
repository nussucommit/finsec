from django.contrib.auth.models import Group
from django.test import Client, TestCase

from .models import User


class UserTest(TestCase):
    def setUp(self):
        user = User.objects.create(
            name="John Smith", 
            username="test", 
            email="test@example.com", 
            contact_no="88888888",
            subcommittee="NUSSU")
        user.set_password(raw_password="finsec")
        user.save()

    def test_create_user(self):
        c = Client()
        
        # Duplicate username
        response = c.post('/api/users', {
            "name": "Test 0",
            "username": "test",
            "email": "test2@example.com",
            "password": "failure",
            "contact_no": "88888888",
            "subcommittee": "NUSSU",
        })
        self.assertEqual(response.status_code, 400)

        # Duplicate email
        response = c.post('/api/users', {
            "name": "Test 1",
            "username": "test2",
            "email": "test@example.com",
            "password": "failure",
            "contact_no": "88888888",
            "subcommittee": "NUSSU",
        })
        self.assertEqual(response.status_code, 400)

        # Duplicate name
        response = c.post('/api/users', {
            "name": "John Smith",
            "username": "test3",
            "email": "test@example.com",
            "password": "failure",
            "contact_no": "88888888",
            "subcommittee": "NUSSU",
        })
        self.assertEqual(response.status_code, 400)

        # Successfully created user
        response = c.post('/api/users', {
            "name": "John Doe",
            "username": "test2",
            "email": "test2@example.com",
            "password": "success",
            "contact_no": "88888888",
            "subcommittee": "NUSSU",
        })
        self.assertEqual(response.status_code, 201)
        user = User.objects.get(username="test2")
        self.assertEqual(user.contact_no, "88888888")
        self.assertEqual(user.email, "test2@example.com")
        self.assertEqual(user.name, "John Doe")
        self.assertEqual(user.subcommittee, "NUSSU")
        self.assertTrue(user.check_password("success"))
        self.assertEqual(user.groups.count(), 1)
        self.assertEqual(user.groups.first(), Group.objects.get(name="treasurer"))

        # Filter out roles and always assign treasurer
        response = c.post('/api/users', {
            "name": "Mario Mario",
            "username": "test3",
            "email": "test3@example.com",
            "password": "attempt_to_register_as_president",
            "groups": ["nussu_president"],
            "contact_no": "88888888",
            "subcommittee": "NUSSU",
        })
        self.assertEqual(response.status_code, 201)
        user = User.objects.get(username="test3")
        self.assertEqual(user.groups.count(), 1)
        self.assertEqual(user.groups.first(), Group.objects.get(name="treasurer"))

        
