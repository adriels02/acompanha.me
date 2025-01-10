from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class TestAPIView(APIView):
    def get(self, request):
        data = {
            "message": "API funcionando!",
            "status": "success"
        }
        return Response(data, status=status.HTTP_200_OK)