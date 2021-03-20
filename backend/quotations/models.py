from decimal import Decimal

from django.contrib.auth.models import Group
from django.db import models

from users.models import User
from utils.validators import file_validator, phone_number_validator


### Rules models
class Process(models.Model):
    name = models.CharField(max_length=256, unique=True)
    min_amount = models.DecimalField(
        default=0.00, 
        decimal_places=2, 
        max_digits=10)
    max_amount = models.DecimalField(
        default=0.00, 
        decimal_places=2, 
        max_digits=10)
    order = models.PositiveSmallIntegerField(unique=True)

    groups_order = models.ManyToManyField(Group, through='ProcessGroupPrecedence')

class ProcessGroupPrecedence(models.Model):
    process = models.ForeignKey(Process, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    order = models.PositiveSmallIntegerField()

    class Meta:
        unique_together = (
            ('process', 'group'),
            ('process', 'order'),
        )

class ProcessStage(models.Model):
    UNPROCESSED = 0
    APPROVED = 1
    REJECTED = 2

    STATUS_CHOICES = (
        (UNPROCESSED, "unprocessed"),
        (APPROVED, "approved"),
        (REJECTED, "rejected"),
    )

    quotation = models.ForeignKey(Quotation, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    order = models.PositiveSmallIntegerField()
    status = models.IntegerField(choices=STATUS_CHOICES, default=UNPROCESSED, blank=True)

    class Meta:
        unique_together = (
            ('quotation', 'group'),
            ('quotation', 'order'),
        )

### Quotation models
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

    approvers_order = models.ManyToManyField(Group, through='ProcessStage')

    def get_sum(self):
        try:
            supplier = Supplier.objects.get(quotation=quotation, selected=True)
        except Supplier.DoesNotExist:
            return 0
        
        return Decimal(self.item_quantity) * supplier.unit_price

    def get_next_approver(self):
        # Only for use for quotations in processing stage.
        # Rejections should flag quotation as rejected immediately.
        stages = self.approvers_order.all()
        for stage in stages:
            if stage.status == stage.UNPROCESSED:
                return stage.group.name

        return None
