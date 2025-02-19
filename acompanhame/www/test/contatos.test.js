// contatos_adicionar.test.js

const { JSDOM } = require('jsdom');
const fs = require('fs');

// Carrega o HTML no ambiente de teste
const html = fs.readFileSync('./contatos_adicionar.html', 'utf8');
const dom = new JSDOM(html);
global.document = dom.window.document;
global.window = dom.window;

// Carrega o script que será testado
require('./contatos_adicionar.js');

describe('Testes para a funcionalidade de adicionar contatos', () => {
  beforeEach(() => {
    // Limpa o localStorage antes de cada teste
    localStorage.clear();
    // Reseta o formulário
    document.getElementById('add-contact-form').reset();
  });

  test('Caso de Uso 01: O usuário acessa a tela de contatos', () => {
    expect(document.getElementById('add-contact-form')).not.toBeNull();
  });

  test('Caso de Uso 02: O usuário preenche os campos de nome, telefone e mensagem', () => {
    document.getElementById('name').value = 'João Silva';
    document.getElementById('phone').value = '11987654321';
    document.getElementById('message').value = 'Olá, João!';

    expect(document.getElementById('name').value).toBe('João Silva');
    expect(document.getElementById('phone').value).toBe('11987654321');
    expect(document.getElementById('message').value).toBe('Olá, João!');
  });

  test('Caso de Uso 03: O usuário clica no botão de adicionar contato', () => {
    document.getElementById('name').value = 'Maria Oliveira';
    document.getElementById('phone').value = '11912345678';
    document.getElementById('message').value = 'Oi, Maria!';

    const event = new window.Event('submit');
    const form = document.getElementById('add-contact-form');
    form.dispatchEvent(event);

    const contacts = JSON.parse(localStorage.getItem('contacts'));
    expect(contacts.length).toBe(1);
    expect(contacts[0].name).toBe('Maria Oliveira');
    expect(contacts[0].phone).toBe('11912345678');
    expect(contacts[0].message).toBe('Oi, Maria!');
  });

  test('Caso de Uso 04: O usuário deve preencher os campos de nome, telefone e mensagem', () => {
    document.getElementById('name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('message').value = '';

    const event = new window.Event('submit');
    const form = document.getElementById('add-contact-form');
    form.dispatchEvent(event);

    const contacts = JSON.parse(localStorage.getItem('contacts'));
    expect(contacts).toBeNull();
  });

  test('Caso de Uso 05: O usuário clica em salvar contato', () => {
    document.getElementById('name').value = 'Carlos Souza';
    document.getElementById('phone').value = '11999999999';
    document.getElementById('message').value = 'Oi, Carlos!';

    const event = new window.Event('submit');
    const form = document.getElementById('add-contact-form');
    form.dispatchEvent(event);

    const contacts = JSON.parse(localStorage.getItem('contacts'));
    expect(contacts.length).toBe(1);
    expect(contacts[0].name).toBe('Carlos Souza');
    expect(contacts[0].phone).toBe('11999999999');
    expect(contacts[0].message).toBe('Oi, Carlos!');
  });

  test('Requisito Funcional 06: O sistema deve permitir que o usuário insira os dados nos campos', () => {
    document.getElementById('name').value = 'Ana Paula';
    document.getElementById('phone').value = '11988888888';
    document.getElementById('message').value = 'Oi, Ana!';

    expect(document.getElementById('name').value).toBe('Ana Paula');
    expect(document.getElementById('phone').value).toBe('11988888888');
    expect(document.getElementById('message').value).toBe('Oi, Ana!');
  });

  test('Requisito Funcional 07: O sistema deve salvar apenas 3 números', () => {
    const contacts = [
      { name: 'Contato 1', phone: '11111111111', message: 'Mensagem 1' },
      { name: 'Contato 2', phone: '22222222222', message: 'Mensagem 2' },
      { name: 'Contato 3', phone: '33333333333', message: 'Mensagem 3' },
    ];
    localStorage.setItem('contacts', JSON.stringify(contacts));

    document.getElementById('name').value = 'Contato 4';
    document.getElementById('phone').value = '44444444444';
    document.getElementById('message').value = 'Mensagem 4';

    const event = new window.Event('submit');
    const form = document.getElementById('add-contact-form');
    form.dispatchEvent(event);

    const updatedContacts = JSON.parse(localStorage.getItem('contacts'));
    expect(updatedContacts.length).toBe(3);
  });

  test('Requisito Funcional 08: O sistema deve salvar os contatos localmente', () => {
    document.getElementById('name').value = 'Pedro Alves';
    document.getElementById('phone').value = '11977777777';
    document.getElementById('message').value = 'Oi, Pedro!';

    const event = new window.Event('submit');
    const form = document.getElementById('add-contact-form');
    form.dispatchEvent(event);

    const contacts = JSON.parse(localStorage.getItem('contacts'));
    expect(contacts.length).toBe(1);
    expect(contacts[0].name).toBe('Pedro Alves');
    expect(contacts[0].phone).toBe('11977777777');
    expect(contacts[0].message).toBe('Oi, Pedro!');
  });

  test('Requisito Funcional 09: O sistema deve validar os campos obrigatórios de nome e telefone', () => {
    document.getElementById('name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('message').value = 'Mensagem sem nome e telefone';

    const event = new window.Event('submit');
    const form = document.getElementById('add-contact-form');
    form.dispatchEvent(event);

    const contacts = JSON.parse(localStorage.getItem('contacts'));
    expect(contacts).toBeNull();
  });

  test('Requisito Funcional 10: O sistema deve permitir que o usuário possa retornar a tela de lista contatos', () => {
    const backButton = document.querySelector('.back-button');
    expect(backButton.getAttribute('href')).toBe('entrar.html');
  });
});