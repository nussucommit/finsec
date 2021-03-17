from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import User

def populate_models(sender, **kwargs):
    from django.contrib.auth.models import Group
    
    # Create treasurer group
    Group.objects.get_or_create(name="treasurer")

@receiver(post_save, sender=User)
def add_user_to_public_group(sender, instance, created, **kwargs):
    from django.contrib.auth.models import Group

    if created:
        instance.groups.add(Group.objects.get(name="treasurer"))
