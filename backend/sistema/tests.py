from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User

class LoginTests(TestCase):
    def setUp(self):
        
        self.user = User.objects.create_user(username='testuser', password='12345')
        self.login_url = reverse('logar')  

    def test_login_success(self):
        response = self.client.post(self.login_url, {'cpf': self.user.username, 'password': '12345'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['status'], 'success')

    def test_login_invalid_credentials(self):
        response = self.client.post(self.login_url, {'cpf': self.user.username, 'password': 'wrongpassword'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['status'], 'error')
        self.assertEqual(response.json()['message'], 'Credenciais inválidas')

    def test_login_invalid_form(self):
        
        response = self.client.post(self.login_url, {'password': '12345'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['status'], 'error')
        self.assertEqual(response.json()['message'], 'Formulário inválido')

class SignupTests(TestCase):
    def setUp(self):
        self.signup_url = reverse('registro')  

    def test_signup_success(self):
        response = self.client.post(self.signup_url, {
            'fullname': 'kleber machado',
            'cpf': '12345678901',
            'email': 'test@example.com',
            'password': 'senha123',
            'password_confirm': 'senha123'
        })
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['status'], 'success')

    def test_signup_missing_fields(self):
        response = self.client.post(self.signup_url, {
            'password': 'senha123'
        })  # CPF ausente
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['status'], 'error')
        self.assertIn('Formulário inválido', response.json()['message'])

    def test_signup_duplicate_user(self):
        User.objects.create_user(username='12345678901', password='senha123')
        response = self.client.post(self.signup_url, {
            'fullname': 'Atencio machado',
            'cpf': '12345678901',
            'email': 'atencio@example.com',
            'password': 'senha123',
            'password_confirm': 'senha123'
        })
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['status'], 'error')
        self.assertIn("Credenciais já existentes.", response.json()['message'])  

class IntegrationTests(TestCase):
    
    def setUp(self):
        """Configuração inicial: cria um usuário de teste"""
        self.user = User.objects.create_user(username="12345678901", email="teste@email.com", password="senha123")

    def test_login_success(self):
        """Testa se o login funciona com credenciais corretas"""
        response = self.client.post(reverse('logar'), {"cpf": "12345678901", "password": "senha123"})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["status"], "success")

    def test_login_failure(self):
        """Testa se o login falha com credenciais erradas"""
        response = self.client.post(reverse('logar'), {"cpf": "12345678901", "password": "senhaerrada"})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["status"], "error")

    def test_signup(self):
        """Testa se um novo usuário pode ser cadastrado"""
        response = self.client.post(reverse('registro'), {
            'fullname': 'Gustavo maia',
            'cpf': '98765432100',
            'email': 'gustavomaia@example.com',
            'password': 'senha123',
            'password_confirm': 'senha123'
        })
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["status"], "success")
        self.assertTrue(User.objects.filter(username="98765432100").exists())