from django.test import TestCase
import json
from django.test import TestCase
from django.contrib.auth.models import User
from django.urls import reverse
from .models import Usuario, Contato, Localizacao


class GenerateSMSLinkTests(TestCase):
    def setUp(self):
        """Cria um usuário para autenticação"""
        self.user = User.objects.create_user(username="12345678900", password="password")

    def test_generate_sms_link_unauthenticated(self):
        """Verifica se um usuário não autenticado é bloqueado (redirect para login)"""
        response = self.client.post(reverse("generate-sms-link"), json.dumps({
            "phone": "+5511999999999",
            "latitude": "-23.55052",
            "longitude": "-46.633308"
        }), content_type="application/json")

        self.assertEqual(response.status_code, 302)

    def test_generate_sms_link_authenticated(self):
        """Verifica se um usuário autenticado pode gerar o link SMS"""
        self.client.login(username="12345678900", password="password")  # Login

        response = self.client.post(reverse("generate-sms-link"), json.dumps({
            "phone": "+5511999999999",
            "latitude": "-23.55052",
            "longitude": "-46.633308"
        }), content_type="application/json")

        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("sms_uri", data)

    def test_generate_sms_link_missing_data(self):
        """Verifica se a API retorna erro ao faltar dados obrigatórios"""
        self.client.login(username="12345678900", password="password")

        response = self.client.post(reverse("generate-sms-link"), json.dumps({
            "phone": "+5511999999999",
        }), content_type="application/json")

        self.assertEqual(response.status_code, 400)
        self.assertIn("error", response.json())



class ContatoTests(TestCase):
    def setUp(self):
        """Cria um usuário e seus contatos de emergência"""
        self.user = User.objects.create_user(username="12345678900", password="password")
        self.usuario = Usuario.objects.create(
            cpf="12345678900", nome="Test User", email="user@example.com", senha="password"
        )
        self.contato = Contato.objects.create(
            nome="Contato de Emergência",
            telefone="+5511999999999",
            mensagem="Preciso de ajuda!",
            usuario_cpf=self.usuario,
        )

    def test_contact_saving(self):
        """Verifica se os contatos de emergência são salvos corretamente"""
        contato = Contato.objects.get(usuario_cpf=self.usuario) 
        self.assertEqual(contato.nome, "Contato de Emergência")
        self.assertEqual(contato.telefone, "+5511999999999")
        self.assertEqual(contato.mensagem, "Preciso de ajuda!")

    def test_get_contacts_api(self):
        """Testa se conseguimos recuperar os contatos salvos via API"""
        self.client.login(username="12345678900", password="password")
        response = self.client.get(reverse("get_contacts"))

        self.assertEqual(response.status_code, 200)

        data = response.json()
        self.assertIsInstance(data, list)
        self.assertGreater(len(data), 0)  # Deve haver pelo menos um contato salvo

        first_contact = data[0]
        self.assertEqual(first_contact["nome"], "Contato de Emergência")
        self.assertEqual(first_contact["telefone"], "+5511999999999")
        self.assertEqual(first_contact["mensagem"], "Preciso de ajuda!")
        self.assertEqual(first_contact["usuario_cpf_id"], self.usuario.cpf)  # ✅ Correct field name
    

class LocationTests(TestCase):
    def setUp(self):
        """Cria um usuário e salva uma localização"""
        self.user = User.objects.create_user(username="12345678900", password="password")
        self.usuario = Usuario.objects.create(
            cpf="12345678900", nome="Test User", email="user@example.com", senha="password"
        )
        self.localizacao = Localizacao.objects.create(
            cep="01000-000",
            rua="Rua Teste",
            bairro="Centro",
            cidade="São Paulo",
            estado="SP",
            latitude="-23.55052",
            longitude="-46.633308",
            usuario_cpf=self.usuario,
        )

    def test_location_saving(self):
        """Verifica se a localização foi salva corretamente"""
        local = Localizacao.objects.get(usuario_cpf=self.usuario)
        self.assertEqual(local.cidade, "São Paulo")
        self.assertEqual(local.latitude, "-23.55052")
        self.assertEqual(local.longitude, "-46.633308")

    def test_get_latest_location_authenticated(self):
        """Testa se conseguimos recuperar a última localização autenticado"""
        self.client.login(username="12345678900", password="password")
        response = self.client.get(reverse("get_latest_location"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["latitude"], "-23.55052")

    def test_get_latest_location_unauthenticated(self):
        """Verifica se a API bloqueia requisições sem autenticação"""
        response = self.client.get(reverse("get_latest_location"))
        self.assertEqual(response.status_code, 302)

    def test_get_latest_location_no_data(self):
        """Testa quando não há localização salva"""
        Localizacao.objects.all().delete()
        self.client.login(username="12345678900", password="password")
        response = self.client.get(reverse("get_latest_location"))
        self.assertEqual(response.status_code, 404)
        self.assertJSONEqual(response.content, {"error": "No location found"})

    def test_authenticated_user_can_access_location(self):
        """Usuário autenticado deve acessar a localização"""
        self.client.login(username="12345678900", password="password")
        response = self.client.get(reverse("get_latest_location"))
        self.assertEqual(response.status_code, 200)
        self.assertIn("latitude", response.json())
