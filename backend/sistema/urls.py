from django.urls import path
from .views import TestAPIView

urlpatterns = [
    path('api/test/', TestAPIView.as_view(), name='test-api'),
]