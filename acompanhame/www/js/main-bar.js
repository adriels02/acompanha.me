document.addEventListener('DOMContentLoaded', function () {
    // HTML da barra principal
    const mainBarHTML = `
       <div class="main-bar" id="main-bar">
           <a href="#" class="link" data-page="disque" id="disque-btn">
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

    document.body.insertAdjacentHTML('beforeend', mainBarHTML);

    const mainBar = document.getElementById('main-bar');
    const initialHeight = mainBar.offsetHeight; // Altura inicial da barra

    // Detecta mudança de tamanho na janela para ajustar a barra
    window.addEventListener('resize', () => {
        const viewportHeight = window.innerHeight;

        if (viewportHeight < window.screen.height * 0.85) {
            mainBar.style.height = '12vh';
        } else {
            mainBar.style.height = `${initialHeight}px`;
        }
    });

    // Lógica para destacar o ícone da página atual
    const currentPath = window.location.pathname.split('/').pop();
    const links = document.querySelectorAll('#main-bar .link');

    links.forEach(link => {
        const page = link.getAttribute('data-page');
        const img = link.querySelector('img');

        if (currentPath === `${page}.html`) {
            img.classList.add('active-icon');
        } else {
            img.classList.remove('active-icon');
        }

        if (page !== 'disque') {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                links.forEach(item => {
                    const iconImg = item.querySelector('.svg-icon');
                    iconImg.classList.remove('active-icon');
                });

                const iconImg = link.querySelector('.svg-icon');
                iconImg.classList.add('active-icon');

                setTimeout(() => {
                    window.location.href = link.href;
                }, 100);
            });
        }
    });

    //  botão "Disque"
    const disqueBtn = document.getElementById('disque-btn');
    disqueBtn.addEventListener('click', function (e) {
        e.preventDefault(); 
       
        ligar();
    });

    function ligar() {
        var numero = "190"; 
        window.location.href = "tel:" + numero;
    }
});
