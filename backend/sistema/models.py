from django.db import models

class Usuario(models.Model):
    cpf = models.CharField(max_length=16, primary_key=True)
    nome = models.CharField(max_length=250)
    email = models.EmailField()
    senha = models.CharField(max_length=255)

    def __str__(self):
        return self.nome

class Localizacao(models.Model):
    id = models.AutoField(primary_key=True)
    cep = models.CharField(max_length=100)
    rua = models.CharField(max_length=100)
    bairro = models.CharField(max_length=100)
    cidade = models.CharField(max_length=100)
    estado = models.CharField(max_length=100)
    latitude = models.CharField(max_length=100)
    longitude = models.CharField(max_length=100)
    usuario_cpf = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='localizacoes')

    def __str__(self):
        return f'{self.rua}, {self.bairro}'

class Contato(models.Model):
    id = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=100)
    telefone = models.CharField(max_length=50)
    mensagem = models.CharField(max_length=500)
    usuario_cpf = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='contatos')

    def __str__(self):
        return f'{self.nome} - {self.telefone}'
