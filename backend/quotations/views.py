from rest_framework import generics

from .models import Quotation, Supplier
from .serializers import QuotationSerializer, SupplierSerializer

class QuotationListCreateView(generics.ListCreateAPIView):
    queryset = Quotation.objects.all()
    serializer_class = QuotationSerializer

class SupplierListCreateView(generics.ListCreateAPIView):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer