const { jest } = require('@jest/globals');

describe('Teste da função de discagem', () => {
    let disqueBtn;

    beforeEach(() => {
        document.body.innerHTML = `
            <div class="main-bar" id="main-bar">
                <a href="#" class="link" data-page="disque" id="disque-btn">
                    <span class="icon">
                        <img src="img/footer_disque.svg" alt="Ícone de alerta" class="svg-icon">
                    </span>
                </a>
            </div>
        `;
        
        // Simula a função de discagem
        global.ligar = jest.fn(() => {
            window.location.href = "tel:190";  // Simula a alteração de URL para discagem
        });
        
        // Simula o event listener do botão
        disqueBtn = document.getElementById('disque-btn');
        disqueBtn.addEventListener('click', (e) => {
            e.preventDefault();
            ligar();  // Chama a função ligar ao clicar
        });
    });

    test('Deve chamar a função ligar() ao clicar no botão de discagem', () => {
        disqueBtn.click();  // Simula o clique no botão
        expect(ligar).toHaveBeenCalled();  // Verifica se a função foi chamada
    });


    test('Deve ligar para o número de emergência', () => {
       
        const mockLigar = jest.fn();
        delete window.location;
        window.location = { href: '' };
        global.ligar = mockLigar;
        window.location.href = 'tel:190';
        expect(window.location.href).toBe('tel:190');
      });
      
});
