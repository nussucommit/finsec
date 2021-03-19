from django.contrib.auth.models import AbstractUser, Group
from django.db import models
from django.utils.translation import gettext_lazy as _

from utils.validators import phone_number_validator

class User(AbstractUser):
    contact_no = models.CharField(
        blank=False, 
        default='00000000', 
        validators=[phone_number_validator], 
        max_length=8)
    # Enforce email uniqueness
    email = models.EmailField(_('email address'), unique=True)
    name = models.CharField(max_length=256, unique=True)
    subcommittee = models.CharField(max_length=256)
