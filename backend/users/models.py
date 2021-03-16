from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    TREASURER = 0
    FINANCIAL_EXECUTIVE = 1
    FINANCIAL_SECRETARY = 2
    NUSSU_PRESIDENT = 3

    ROLE_CHOICES = [
        (TREASURER, 'Treasurer'),
        (FINANCIAL_EXECUTIVE, 'Financial Executive'),
        (FINANCIAL_SECRETARY, 'Financial Secretary'),
        (NUSSU_PRESIDENT, 'NUSSU President')
    ]

    # Enforce email uniqueness
    email = models.EmailField(_('email address'), unique=True, blank=True)
    role = models.IntegerField(blank=True, choices=ROLE_CHOICES, default=0)
