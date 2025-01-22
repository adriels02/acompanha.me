
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

    const mainBar = document.getElementById('main-bar');
    const initialHeight = mainBar.offsetHeight; // Altura inicial da barra

    // Detecta mudança de tamanho na janela para ajustar a barra
    window.addEventListener('resize', () => {
        const viewportHeight = window.innerHeight;

        // Verifica se o teclado virtual está ativo
        if (viewportHeight < window.screen.height * 0.85) {
            // Aumenta a altura da barra
            mainBar.style.height = '12vh';
        } else {
            // Restaura a altura original
            mainBar.style.height = `${initialHeight}px`;
        }
    });
});


