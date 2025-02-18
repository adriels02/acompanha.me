from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .forms import *
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from .models import *
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json

class TestAPIView(APIView):
    def get(self, request):
        data = {
            "message": "API funcionando!",
            "status": "success"
        }
        return Response(data, status=status.HTTP_200_OK)
    
@csrf_exempt
def registro(request):
    if request.method == "POST":
        form = RegisterForm(request.POST)
        if form.is_valid():
            fullname = form.cleaned_data['fullname']
            cpf = form.cleaned_data['cpf']
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']
            password_confirm = form.cleaned_data['password_confirm']

            if password != password_confirm:
                return JsonResponse({"status": "error", "message": "As senhas não coincidem."})

            if User.objects.filter(username=cpf).exists():
                return JsonResponse({"status": "error", "message": "Credenciais já existentes."})
            
            if User.objects.filter(email=email).exists():
                return JsonResponse({"status": "error", "message": "Credenciais já existentes."})
        
            user = User.objects.create_user(username=cpf, email=email, password=password)
            user.first_name = fullname
            user.save()

           
            Usuario.objects.create(
                cpf=cpf,
                nome=fullname,
                email=email,
                senha=password,  
            )

            return JsonResponse({"status": "success", "message": "Conta criada com sucesso!", "redirect": "entrar.html"})

        else:
           
                return JsonResponse({
        "status": "error",
        "message": "Formulário inválido",
        "errors": form.errors  
    })

    return JsonResponse({"status": "error", "message": f"Método não permitido: {request.method}"})


@csrf_exempt
def logar(request):
    if request.method == "POST":
        form = LoginForm(request.POST)
        if form.is_valid():
            cpf = form.cleaned_data.get("cpf")
            password = form.cleaned_data.get("password")
            user = authenticate(username=cpf, password=password)

            if user is not None:
                
                login(request, user)
                response = {"status": "success", "redirect": "home.html"}
            else:
                response = {"status": "error", "message": "Credenciais inválidas"}
        else:
            response = {"status": "error", "message": "Formulário inválido"}
    else:
        response = {"status": "error", "message": f"Método não permitido: {request.method}"}
     
    return JsonResponse(response)