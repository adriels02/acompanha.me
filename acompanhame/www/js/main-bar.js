// document.addEventListener('DOMContentLoaded', function () {
//     const mainBarHTML = `
//        <div class="main-bar" id="main-bar">
//             <a href="disque.html">
//                 <span class="icon">
//                  <img src="img/footer_disque.svg" alt="Ícone de alerta" class="svg-icon">
//                 </span>
//             </a>

//             <a href="contatos.html">
//                 <span class="icon">
//                  <img src="img/footer_contato.svg" alt="Ícone de alerta" class="svg-icon">
//                 </span>
//             </a>

//             <a href="home.html">
//                 <span class="icon">
//                  <img src="img/footer_home.svg" alt="Ícone de alerta" class="svg-icon">
//                 </span>
//             </a>
            
//             <a href="sinais.html">
//                <span class="icon">
//                  <img src="img/footer_sinais.svg" alt="Ícone de alerta" class="svg-icon">
//                 </span>
//             </a>

//             <a href="alerta.html">
//                 <span class="icon">
//                  <img src="img/footer_alerta.svg" alt="Ícone de alerta" class="svg-icon">
//                 </span>
//             </a>
//           </div>
//     `;

//     // Insere o main-bar no final do body
//     document.body.insertAdjacentHTML('beforeend', mainBarHTML);

//     // Aplica estilo de filtro para SVGs
//     const svgIcons = document.querySelectorAll('.svg-icon');
//     svgIcons.forEach((icon) => {
//         icon.style.filter = 'brightness(0) invert(1)'; // Branco
//     });
// });


document.addEventListener('DOMContentLoaded', function () {
    const mainBarHTML = `
       <div class="main-bar" id="main-bar">
            <a href="disque.html">
                <span class="icon">
                    <img src="img/footer_disque.svg" alt="Ícone de alerta" width="25" height="55">
                </span>
            </a>
            <a href="contatos.html">
                <span class="icon">
                    <img src="img/footer_contato.svg" alt="Ícone de alerta" width="25" height="55">
                </span>
            </a>
            <a href="home.html">
                <span class="icon">
                    <img src="img/footer_home.svg" alt="Ícone de alerta" width="25" height="55">
                </span>
            </a>
            <a href="sinais.html">
                <span class="icon">
                    <img src="img/footer_sinais.svg" alt="Ícone de alerta" width="25" height="55">
                </span>
            </a>
            <a href="alerta.html">
                <span class="icon">
                    <img src="img/footer_alerta.svg" alt="Ícone de alerta" width="25" height="55">
                </span>
            </a>
       </div>
    `;

    // Insere o main-bar no final do body
    document.body.insertAdjacentHTML('beforeend', mainBarHTML);

    // Ajuste de cor ou estilos baseado na página atual
    const currentPage = document.body.getAttribute('data-page');
    const mainBar = document.getElementById('main-bar');

    // Garante que a cor de fundo seja goiaba e os ícones fiquem brancos
    if (currentPage === 'mapa') {
        mainBar.style.backgroundColor = '#DC3B53';
    } else {
        // Garante que os ícones na main-bar sejam brancos
        mainBar.querySelectorAll('.icon img').forEach((img) => {
            img.style.filter = 'brightness(0) invert(1)';
        });
    }
});
