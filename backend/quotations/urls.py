from django.urls import path

from . import views


urlpatterns = [
    path('quotations', views.QuotationListCreateView.as_view()),
    path('quotation/<int:pk>', views.QuotationRetrieveUpdateView.as_view()),
    path('quotation/<int:pk>/submit', views.SubmitQuotationView.as_view()),
    path('quotation/<int:pk>/approve', views.ApproveQuotationView.as_view()),
    path('quotation/<int:pk>/reject', views.RejectQuotationView.as_view()),
    path('suppliers', views.SupplierListCreateView.as_view()),
    path('supplier/<int:pk>', views.SupplierRetrieveUpdateView.as_view()),
    path('supplier/<int:pk>/select', views.ProcessListCreateView.as_view()),
    path('processes', views.ProcessListCreateView.as_view()),
]