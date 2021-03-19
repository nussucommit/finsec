from django.contrib import admin

from .models import Quotation, Supplier


admin.site.register(Quotation)
admin.site.register(Supplier)
