from django.urls import path

from . import views


urlpatterns = [
    path('quotations', views.QuotationListCreateView.as_view()),
    path('suppliers', views.SupplierListCreateView.as_view()),
]