from django.urls import path
from .views import *

urlpatterns = [
    path('api/test/', TestAPIView.as_view(), name='test-api'),
    path('cadastro', registro, name='registro'),
]