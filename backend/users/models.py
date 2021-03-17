from django.contrib.auth.models import AbstractUser, Group
from django.core.validators import RegexValidator
from django.db import models
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    phone_number_validator = RegexValidator(r'(8[1-8][0-9]{6}|9[0-8][0-9]{6})', 'Invalid phone number.')

    contact_no = models.CharField(
        blank=False, 
        default='00000000', 
        validators=[phone_number_validator], 
        max_length=8)
    # Enforce email uniqueness
    email = models.EmailField(_('email address'), unique=True)
    name = models.CharField(max_length=256, unique=True)
    subcommittee = models.CharField(max_length=256)
