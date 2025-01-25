const form = document.getElementById('add-contact-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const message = document.getElementById('message').value;

  const contacts = JSON.parse(localStorage.getItem('contacts')) || [];

  if (contacts.length >= 3) {
    alert('O limite de 3 contatos foi atingido!');
    return;
  }

  contacts.push({ name, phone, message });
  localStorage.setItem('contacts', JSON.stringify(contacts));

  alert('Contato adicionado com sucesso!');
  form.reset();
  window.location.href = 'contatos.html';
});
