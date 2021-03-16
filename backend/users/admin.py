from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserCreationForm

from .models import User


# Custom admin to allow edit of roles in admin
class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
            ('Extra Fields', {'fields': ('role',)}),
    )

admin.site.register(User, CustomUserAdmin)
