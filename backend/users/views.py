from rest_framework import generics

from .models import User
from .serializers import CreateUserSerializer

class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = CreateUserSerializer
