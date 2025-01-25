const contactsContainer = document.querySelector('.contacts-container');
const noContacts = document.getElementById('no-contacts');

// Carregar contatos do localStorage
const loadContacts = () => {
  const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  renderContacts(contacts);
};

// Renderizar contatos na tela
const renderContacts = (contacts) => {
  contactsContainer.innerHTML = '';
  if (contacts.length === 0) {
    noContacts.style.display = 'block';
    return;
  }
  noContacts.style.display = 'none';

  contacts.forEach((contact, index) => {
    const contactCard = document.createElement('div');
    contactCard.classList.add('contact-card');

    contactCard.innerHTML = `
      <div class="contact-info">
        <p><strong>Nome:</strong> ${contact.name}</p>
        <p><strong>Telefone:</strong> ${contact.phone}</p>
      </div>
      <div>
        <button onclick="sendMessage(${index})">Enviar Mensagem</button>
        <button onclick="deleteContact(${index})">Excluir</button>
      </div>
    `;
    contactsContainer.appendChild(contactCard);
  });
};

// Enviar mensagem
const sendMessage = (index) => {
  const contacts = JSON.parse(localStorage.getItem('contacts'));
  alert(`Mensagem enviada para ${contacts[index].name}: "${contacts[index].message}"`);
};

// Excluir contato
const deleteContact = (index) => {
  const contacts = JSON.parse(localStorage.getItem('contacts'));
  contacts.splice(index, 1);
  localStorage.setItem('contacts', JSON.stringify(contacts));
  loadContacts();
};

loadContacts();
