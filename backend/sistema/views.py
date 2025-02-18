from django.shortcuts import render, get_object_or_404
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
from django.contrib.auth.decorators import login_required
import requests
from urllib.parse import quote



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

@login_required
def get_user_cpf(request):
    return JsonResponse({'cpf': request.user.username})


@login_required
def get_latest_location(request):
    cpf = request.user.username
    location = Localizacao.objects.filter(usuario_cpf__cpf=cpf).order_by('-id').first()

    if location:
        return JsonResponse({
            'latitude': location.latitude,
            'longitude': location.longitude
        })
    return JsonResponse({'error': 'No location found'}, status=404)

@login_required
def save_localizacao(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            latitude, longitude = data.get('latitude'), data.get('longitude')
            usuario = get_object_or_404(Usuario, cpf=request.user.username)

            if not latitude or not longitude:
                return JsonResponse({'error': 'Latitude ou longitude ausentes'}, status=400)

            response = requests.get(
                'https://nominatim.openstreetmap.org/reverse',
                params={'format': 'json', 'lat': latitude, 'lon': longitude},
                headers={'User-Agent': 'AcompanhaMe/1.0'}
            )
            geo_data = response.json().get('address', {})

            localizacao = Localizacao.objects.create(
                cep=geo_data.get('postcode', 'N/A'),
                rua=geo_data.get('road', 'N/A'),
                bairro=geo_data.get('suburb', 'N/A'),
                cidade=geo_data.get('city', 'N/A'),
                estado=geo_data.get('state', 'N/A'),
                latitude=latitude,
                longitude=longitude,
                usuario_cpf=usuario
            )

            return JsonResponse({'success': True, 'localizacao_id': localizacao.id}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request'}, status=400)

@login_required
def get_contacts(request):
    contatos = Contato.objects.filter(usuario_cpf__cpf=request.user.username).values("id", "nome", "telefone", "mensagem", "usuario_cpf_id")
    return JsonResponse(list(contatos), safe=False)

@csrf_exempt
@login_required
def save_contact(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            nome = data.get("nome")
            telefone = data.get("telefone")
            mensagem = data.get("mensagem")
            usuario_cpf = data.get("usuario_cpf")

            if not all([nome, telefone, mensagem, usuario_cpf]):
                return JsonResponse({"error": "Todos os campos são obrigatórios."}, status=400)

            try:
                usuario = Usuario.objects.get(cpf=usuario_cpf)
            except Usuario.DoesNotExist:
                return JsonResponse({"error": "Usuário não encontrado."}, status=404)

            contato = Contato.objects.create(
                nome=nome,
                telefone=telefone,
                mensagem=mensagem,
                usuario_cpf=usuario
            )

            return JsonResponse({"message": "Contato salvo com sucesso!", "contact_id": contato.id}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Dados inválidos. Envie um JSON válido."}, status=400)

    return JsonResponse({"error": "Método não permitido."}, status=405)

@login_required
def generate_sms_link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            latitude, longitude = data.get('latitude'), data.get('longitude')

            if not latitude or not longitude:
                return JsonResponse({'error': 'Latitude ou longitude ausentes'}, status=400)

            contatos = Contato.objects.filter(usuario_cpf__cpf=request.user.username).values_list('telefone', 'mensagem')

            if not contatos:
                return JsonResponse({'error': 'Nenhum contato de emergência cadastrado.'}, status=404)

            sms_links = []
            for telefone, mensagem in contatos:
                mensagem_formatada = mensagem if mensagem else "Estou com problemas na seguinte localização:"
                sms_message = quote(f"{mensagem_formatada} acompanhame://location?lat={latitude}&lng={longitude}")
                sms_uri = f"sms:{telefone}?body={sms_message}"
                sms_links.append(sms_uri)

            return JsonResponse({'sms_links': sms_links}, status=200)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'JSON inválido'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Método não permitido'}, status=405)


