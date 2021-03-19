from rest_framework import serializers

from .models import Quotation, Supplier
from users.serializers import DisplayUserSerializer


class SupplierSerializer(serializers.ModelSerializer):
    quotation = serializers.PrimaryKeyRelatedField(queryset=Quotation.objects.all(), write_only=True)

    class Meta:
        model = Supplier
        fields = [
            'document',
            'contact_number',
            'contact_person',
            'id',
            'quotation',
            'remarks',
            'selected',
            'supplier_name',
            'unit_price'
        ]
        extra_kwargs = {
            'selected': {'read_only': True},
        }

class SupplierDetailSerializer(SupplierSerializer):
    quotation = serializers.PrimaryKeyRelatedField(queryset=Quotation.objects.all(), read_only=True)

class QuotationSerializer(serializers.ModelSerializer):
    selected_supplier = SupplierSerializer(source='get_selected_supplier', read_only=True, allow_null=True)
    student = DisplayUserSerializer(read_only=True)
    suppliers = SupplierSerializer(many=True, read_only=True)

    class Meta:
        model = Quotation
        fields = [
            'event_name',
            'id',
            'item_description',
            'item_quantity',
            'reason',
            'selected_supplier',
            'status',
            'student',
            'sum',
            'suppliers'
        ]
        extra_kwargs = {
            'status': {'read_only': True},
        }

    ### Methods to add pseudo-fields
    def get_selected_supplier(self, quotation):
        for supplier in quotation.suppliers:
            if supplier.selected:
                return supplier
        
        return None

    def get_sum(self, quotation):
        if not quotation.selected_supplier.exists():
            return 0
        
        return quotation.item_quantity * quotation.selected_supplier.unit_price

    ### Additional create steps
    def create(self, validated_data):
        quotation = Quotation.objects.create(student=self.context['request'].user, **validated_data)
        return quotation

# Extra declaration because sum is a reserved keyword
QuotationSerializer._declared_fields["sum"] = serializers.DecimalField(
    source='get_sum', max_digits=8, decimal_places=2, required=False, read_only=True)
