from rest_framework import generics, permissions, status, views
from rest_framework.response import Response

from .models import Process, ProcessStage, Quotation, Supplier
from .serializers import ProcessSerializer, QuotationSerializer, SupplierDetailSerializer, SupplierSerializer

class QuotationListCreateView(generics.ListCreateAPIView):
    permission_classes = permissions.IsAuthenticated
    queryset = Quotation.objects.all()
    serializer_class = QuotationSerializer

class QuotationRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    permission_classes = permissions.IsAuthenticated
    queryset = Quotation.objects.all()
    serializer_class = QuotationSerializer

class SupplierListCreateView(generics.ListCreateAPIView):
    permission_classes = permissions.IsAuthenticated
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer

class SupplierRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    permission_classes = permissions.IsAuthenticated
    queryset = Supplier.objects.all()
    serializer_class = SupplierDetailSerializer

class ProcessListCreateView(generics.ListCreateAPIView):
    permission_classes = permissions.IsAuthenticated
    queryset = Process.objects.all().order_by('order')
    serializer_class = ProcessSerializer

### Patch views
class SelectSupplierView(views.APIView):
    permission_classes = permissions.IsAuthenticated
    def patch(self, request, pk, format=None):
        try:
            supplier = Supplier.objects.get(pk=pk)
        except Supplier.DoesNotExist:
            return Response({'details': 'supplier does not exist.'}, status=status.HTTP_404_NOT_FOUND)
        
        # Mark all other suppliers for the same quotation as not selected
        quotation = supplier.quotation
        for quotation_supplier in quotation.suppliers:
            quotation_supplier.selected = False
            quotation_supplier.save()
        
        supplier.selected = True
        supplier.save()
        return Response({'details': 'supplier selected.'}, status=status.HTTP_200_OK)

class SubmitQuotationView(views.APIView):
    permission_classes = permissions.IsAuthenticated
    def patch(self, request, pk, format=None):
        try:
            quotation = Quotation.objects.get(pk=pk)
        except Quotation.DoesNotExist:
            return Response({'details': 'quotation does not exist.'}, status=status.HTTP_404_NOT_FOUND)
        
        if quotation.status != Quotation.DRAFT:
            return Response({'details': 'quotation was not in draft status.'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            supplier = Supplier.objects.get(quotation=quotation, selected=True)
        except Supplier.DoesNotExist:
            return Response({'details': 'quotation does not have selected supplier.'}, status=status.HTTP_400_BAD_REQUEST)

        quotation.status = Quotation.SUBMITTED

        total_sum = quotation.get_sum()
        for process in Process.objects.all().order_by('order'):
            if total_sum >= process.min_amount and total_sum <= process.max_amount:
                for group_order in process.groups_order.all():
                    process_stage = ProcessStage.objects.create(quotation=quotation, group=group_order.group, order=group_order.order)
                    process_stage.save()

        quotation.save()
        return Response({'details': 'quotation submitted.'}, status=status.HTTP_200_OK)

class ApproveQuotationView(views.APIView):
    permission_classes = permissions.IsAuthenticated
    def patch(self, request, pk, format=None):
        try:
            quotation = Quotation.objects.get(pk=pk)
        except Quotation.DoesNotExist:
            return Response({'details': 'quotation does not exist.'}, status=status.HTTP_404_NOT_FOUND)
        
        if quotation.status != Quotation.SUBMITTED:
            return Response({'details': 'quotation was not submitted.'}, status=status.HTTP_400_BAD_REQUEST)

        quotation.status = Quotation.APPROVED
        quotation.save()
        return Response({'details': 'quotation approved.'}, status=status.HTTP_200_OK)

class RejectQuotationView(views.APIView):
    permission_classes = permissions.IsAuthenticated
    def patch(self, request, pk, format=None):
        try:
            quotation = Quotation.objects.get(pk=pk)
        except Quotation.DoesNotExist:
            return Response({'details': 'quotation does not exist.'}, status=status.HTTP_404_NOT_FOUND)
        
        if quotation.status != Quotation.SUBMITTED:
            return Response({'details': 'quotation was not submitted.'}, status=status.HTTP_400_BAD_REQUEST)

        quotation.status = Quotation.REJECTED
        quotation.save()
        return Response({'details': 'quotation rejected.'}, status=status.HTTP_200_OK)
