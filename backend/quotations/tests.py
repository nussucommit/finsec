import json
import os
import tempfile
from decimal import Decimal

from django.core.files.base import File
from django.test import Client, TestCase

from .models import Quotation, Supplier
from .serializers import SupplierSerializer
from utils.tests import AuthenticatedTestCase


class CreateQuotationTest(AuthenticatedTestCase):
    def setUp(self):
        super().setUp()
        self.address = '/api/quotations'

    def test_create_quotation_success(self):
        quotation_info = {
            'event_name': 'Testing yay',
            'item_description': 'Acme bombs',
            'item_quantity': 42,
            'reason': 'beep beep'
        }

        response = self.client.post(self.address, quotation_info, **self.headers)
        self.assertEqual(response.status_code, 201)
        self.compare_quotation(Quotation.objects.get(pk=1), quotation_info)
        
    ### Helper methods
    def compare_quotation(self, quotation, quotation_info):
        self.assertEqual(quotation.event_name, quotation_info['event_name'])
        self.assertEqual(quotation.item_description, quotation_info['item_description'])
        self.assertEqual(quotation.item_quantity, quotation_info['item_quantity'])
        self.assertEqual(quotation.reason, quotation_info['reason'])


class CreateSupplierTest(AuthenticatedTestCase):
    def setUp(self):
        super().setUp()
        self.quotation_address = '/api/quotations'
        self.address = '/api/suppliers'
        
        # Generate files
        self.f = File(file=tempfile.NamedTemporaryFile())
        self.f.write(b'Lorem ipsum')
        self.f.seek(0)

        quotation_info = {
            'event_name': 'Testing yay',
            'item_description': 'Acme bombs',
            'item_quantity': 42,
            'reason': 'beep beep',
            'selected': True
        }
        response = self.client.post(self.quotation_address, quotation_info, **self.headers)
        self.assertEqual(response.status_code, 201)

    def tearDown(self):
        self.f.close()

    def test_create_supplier_success(self):
        supplier_info = {
            'document': self.f,
            'contact_number': '88888888',
            'contact_person': 'John Smith',
            'quotation': 1,
            'remarks': 'Weird',
            'supplier_name': 'SOS',
            'unit_price': '1.00',
        }

        response = self.client.post(self.address, supplier_info, format='multipart', **self.headers)
        self.assertEqual(response.status_code, 201)
        supplier = Supplier.objects.get(pk=1)
        self.compare_supplier(supplier, supplier_info)
        self.assertFalse(supplier.selected)
        
    ### Helper methods
    def compare_supplier(self, supplier, supplier_info):
        self.assertEqual(supplier.contact_number, supplier_info['contact_number'])
        self.assertEqual(supplier.contact_person, supplier_info['contact_person'])
        self.assertEqual(supplier.quotation, Quotation.objects.get(pk=supplier_info['quotation']))
        self.assertEqual(supplier.remarks, supplier_info['remarks'])
        self.assertEqual(supplier.unit_price, Decimal(supplier_info['unit_price']))

class ListSupplierTest(AuthenticatedTestCase):
    def setUp(self):
        super().setUp()
        self.quotation_address = '/api/quotations'
        self.address = '/api/suppliers'
        
        # Generate files
        self.f = File(file=tempfile.NamedTemporaryFile())
        self.f.write(b'Lorem ipsum')
        self.f.seek(0)

        quotation_info = {
            'event_name': 'Testing yay',
            'item_description': 'Acme bombs',
            'item_quantity': 42,
            'reason': 'beep beep',
            'selected': True
        }
        response = self.client.post(self.quotation_address, quotation_info, **self.headers)
        self.assertEqual(response.status_code, 201)

    def tearDown(self):
        self.f.close()

    def test_list_supplier_success(self):
        supplier_info = {
            'document': self.f,
            'contact_number': '88888888',
            'contact_person': 'John Smith',
            'quotation': 1,
            'remarks': 'Weird',
            'supplier_name': 'SOS',
            'unit_price': '1.00',
        }

        response = self.client.post(self.address, supplier_info, format='multipart', **self.headers)
        self.assertEqual(response.status_code, 201)

        id = json.loads(response.content.decode('utf-8'))['id']
        response = self.client.get(self.address)
        data = json.loads(response.content.decode('utf-8'))
        self.assertEqual(len(data), 1)

        supplier_info.pop('quotation')
        supplier_info.pop('document')
        supplier_info['selected'] = False
        data[0].pop('id')
        data[0].pop('document')
        self.assertEqual(data[0], supplier_info)
