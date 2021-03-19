from django.contrib.auth.models import Group
from rest_framework import serializers

from .models import (
    Process, 
    ProcessGroupPrecedence,
    ProcessStage,
    Quotation, 
    Supplier,
)
from users.serializers import DisplayUserSerializer


class SupplierSerializer(serializers.ModelSerializer):
    quotation = serializers.PrimaryKeyRelatedField(queryset=Quotation.objects.all(), write_only=True)

    class Meta:
        model = Supplier
        fields = (
            'document',
            'contact_number',
            'contact_person',
            'id',
            'quotation',
            'remarks',
            'selected',
            'supplier_name',
            'unit_price',
        )
        extra_kwargs = {
            'selected': {'read_only': True},
        }

class SupplierDetailSerializer(SupplierSerializer):
    quotation = serializers.PrimaryKeyRelatedField(read_only=True)

class ProcessStageSerializer(serializers.ModelSerializer):
    group = serializers.CharField(source='group.name', read_only=False)
    class Meta:
        model = ProcessStage
        fields = (
            'group',
            'order',
            'status'
        )
        extra_kwargs = {
            'status': {'read_only': True},
        }

class QuotationSerializer(serializers.ModelSerializer):
    approvers = ProcessStageSerializer(many=True, read_only=True)
    selected_supplier = SupplierSerializer(source='get_selected_supplier', read_only=True, allow_null=True)
    student = DisplayUserSerializer(read_only=True)
    suppliers = SupplierSerializer(many=True, read_only=True)

    class Meta:
        model = Quotation
        fields = (
            'approvers',
            'event_name',
            'id',
            'item_description',
            'item_quantity',
            'reason',
            'selected_supplier',
            'status',
            'student',
            'sum',
            'suppliers',
        )
        extra_kwargs = {
            'status': {'read_only': True},
        }

    ### Methods to add pseudo-fields
    def get_selected_supplier(self, quotation):
        for supplier in quotation.suppliers:
            if supplier.selected:
                return supplier
        
        return None

    ### Additional create steps
    def create(self, validated_data):
        quotation = Quotation.objects.create(student=self.context['request'].user, **validated_data)
        return quotation

# Extra declaration because sum is a reserved keyword
QuotationSerializer._declared_fields["sum"] = serializers.DecimalField(
    source='get_sum', max_digits=8, decimal_places=2, required=False, read_only=True)

### Rules-related serializers
class ProcessGroupPrecedenceSerializer(serializers.ModelSerializer):
    group = serializers.CharField(source='group.name', read_only=False)
    
    class Meta:
        model = ProcessGroupPrecedence
        fields = (
            'group',
            'order',
        )

class ProcessSerializer(serializers.ModelSerializer):
    groups = ProcessGroupPrecedenceSerializer(
        many=True, 
        read_only=False, 
        source='groups_order')
    
    class Meta:
        model = Process
        fields = (
            'groups',
            'max_amount',
            'min_amount',
            'name',
            'order',
        )

    def create(self, validated_data):
        groups = validated_data.pop('groups')
        process = Process.objects.create(**validated_data)

        for group_info in groups:
            group = Group.objects.get_or_create(name=group['name'])
            group.save()

            process_group_precedence = ProcessGroupPrecedence.objects.create(process=process, group=group, order=group['order'])
            process_group_precedence.save()

        return process

