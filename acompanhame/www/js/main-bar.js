
document.addEventListener('DOMContentLoaded', function () {
    // HTML da barra principal
    const mainBarHTML = `
       <div class="main-bar" id="main-bar">
            <a href="disque.html" class="link" data-page="disque">
                <span class="icon">
                    <img src="img/footer_disque.svg" alt="Ícone de alerta" class="svg-icon">
                </span>
            </a>
            <a href="contatos.html" class="link" data-page="contatos">
                <span class="icon">
                    <img src="img/footer_contato.svg" alt="Ícone de alerta" class="svg-icon">
                </span>
            </a>
            <a href="home.html" class="link" data-page="home">
                <span class="icon">
                    <img src="img/footer_home.svg" alt="Ícone de alerta" class="svg-icon">
                </span>
            </a>
            <a href="sinais.html" class="link" data-page="sinais">
                <span class="icon">
                    <img src="img/footer_sinais.svg" alt="Ícone de alerta" class="svg-icon">
                </span>
            </a>
            <a href="alerta.html" class="link" data-page="alerta">
                <span class="icon">
                    <img src="img/footer_alerta.svg" alt="Ícone de alerta" class="svg-icon">
                </span>
            </a>
       </div>
    `;

    // Insere o main-bar no final do body
    document.body.insertAdjacentHTML('beforeend', mainBarHTML);

    // Identifica a página atual pelo pathname
    const currentPath = window.location.pathname.split('/').pop();
    const links = document.querySelectorAll('#main-bar .link');

    links.forEach(link => {
        const page = link.getAttribute('data-page');
        const img = link.querySelector('img');
        if (currentPath === `${page}.html`) {
            // Adiciona a classe ao ícone ativo
            img.classList.add('active-icon');
        } else {
            // Garante que os ícones não ativos não tenham a classe
            img.classList.remove('active-icon');
        }
    });
});


