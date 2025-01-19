from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .forms import *
from django.contrib.auth.models import User
from .models import *
from django.views.decorators.csrf import csrf_exempt

class TestAPIView(APIView):
    def get(self, request):
        data = {
            "message": "API funcionando!",
            "status": "success"
        }
        return Response(data, status=status.HTTP_200_OK)
    
@csrf_exempt
def registro(request):
    
    form = RegisterForm(request.POST)
    if form.is_valid():
        fullname = form.cleaned_data['fullname']
        cpf = form.clean['cpf']
        email = form.cleaned_data['email']
        password = form.cleaned_data['password']
        password_confirm = form.cleaned_data['password_confirm']

        if password != password_confirm:
            form.add_error('password_confirm', 'As senhas não coincidem')

        elif User.objects.filter(cpf=cpf).first():
                form.add_error('cpf', 'CPF já cadastrado')

        else:
            user = User.objects.create_user(username=cpf, email=email, password=password)
            user.first_name = fullname
            user.save() 

            Usuario.objects.create(
                cpf=cpf['cpf'],
                nome=fullname['nome'],
                email=email['email'],
                senha=password['senha'],
            )
            return redirect(reverse('management:logar'))