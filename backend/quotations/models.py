from django.db import models

from users.models import User
from utils.validators import file_validator, phone_number_validator


class Supplier(models.Model):
    contact_person = models.CharField(max_length=256)
    contact_number = models.CharField(
        blank=False, 
        default='00000000', 
        validators=[phone_number_validator], 
        max_length=8)
    supplier_name = models.CharField(max_length=256)
    unit_price = models.DecimalField(
        default=0.00, 
        decimal_places=2, 
        max_digits=10)

    # Max size of 128 KB for documents
    document = models.FileField(upload_to="uploads/", max_length=128*1024, validators=[file_validator])
    remarks = models.TextField()

    quotation = models.ForeignKey(
        'Quotation', 
        related_name='suppliers', 
        on_delete=models.CASCADE)
    selected = models.BooleanField(default=False)

    class Meta:
        unique_together = (
            ('quotation', 'supplier_name'),
        )

class Quotation(models.Model):
    DRAFT = 0
    SUBMITTED = 1
    PROCESSING = 2
    APPROVED = 3
    REJECTED = 4

    STATUS_CHOICES = (
        (DRAFT, "draft"),
        (SUBMITTED, "submitted"),
        (PROCESSING, "processing"),
        (APPROVED, "approved"),
        (REJECTED, "rejected"),
    )

    event_name = models.CharField(max_length=256)

    item_description = models.TextField(blank=True)
    item_quantity = models.PositiveIntegerField(default=0)
    reason = models.TextField(blank=True)

    student = models.ForeignKey(User, on_delete=models.CASCADE)

    status = models.IntegerField(choices=STATUS_CHOICES, default=DRAFT)
    