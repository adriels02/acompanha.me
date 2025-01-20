from django import forms

class RegisterForm(forms.Form):
    fullname = forms.CharField(
        max_length=100,
        widget=forms.TextInput(attrs={'placeholder': 'Nome completo', 'class': 'nome', 'id': 'id_nome'}),
        label='Nome completo'
    )
    cpf = forms.CharField(
        max_length=11,
        widget=forms.TextInput(attrs={'placeholder': 'CPF', 'class': 'cpf', 'id': 'id_cpf'}),
        label='cpf'
    )
    email = forms.EmailField(
        widget=forms.EmailInput(attrs={'placeholder': 'Email', 'class': 'email', 'id': 'id_email'}),
        label='Email'
    )
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={'placeholder': 'Senha', 'class': 'senha', 'id': 'id_senha'}),
        label='Senha'
    )
    password_confirm = forms.CharField(
        widget=forms.PasswordInput(attrs={'placeholder': 'Confirme sua senha', 'class': 'confirmar_senha', 'id': 'id_confirmar_senha'}),
        label='Confirme sua senha'
    )

class LoginForm(forms.Form):

    cpf = forms.CharField(
        max_length=11,
        widget=forms.TextInput(attrs={'placeholder': 'CPF', 'class': 'cpf', 'id': 'id_cpf'}),
        label='cpf'
    )

    password = forms.CharField(
        widget=forms.PasswordInput(attrs={'placeholder': 'Senha', 'class': 'senha', 'id': 'id_senha'}),
        label='Senha'
    )
