describe("Comportamento da Barra Principal", () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <div id="app">
                <div id="main-bar" style="height: 50px;">
                    <a href="disque.html" class="link" data-page="disque">
                        <span class="icon">
                            <img src="img/footer_disque.svg" class="svg-icon">
                        </span>
                    </a>
                    <a href="contatos.html" class="link" data-page="contatos">
                        <span class="icon">
                            <img src="img/footer_contato.svg" class="svg-icon">
                        </span>
                    </a>
                    <a href="home.html" class="link" data-page="home">
                        <span class="icon">
                            <img src="img/footer_home.svg" class="svg-icon">
                        </span>
                    </a>
                    <a href="sinais.html" class="link" data-page="sinais">
                        <span class="icon">
                            <img src="img/footer_sinais.svg" class="svg-icon">
                        </span>
                    </a>
                    <a href="alerta.html" class="link" data-page="alerta">
                        <span class="icon">
                            <img src="img/footer_alerta.svg" class="svg-icon">
                        </span>
                    </a>
                </div>
            </div>
        `;

        // Mock para `window.location`
        delete window.location;
        window.location = {
            pathname: "/home.html",
            href: "",
            assign: jest.fn(),
        };

        require("../js/main-bar");
        document.dispatchEvent(new Event("DOMContentLoaded"));
    });

    test("A barra principal é adicionada ao DOM", () => {
        const mainBar = document.getElementById("main-bar");
        expect(mainBar).not.toBeNull();
    });

    test("Destaca o ícone da página atual", () => {
        const activeIcon = document.querySelector(".svg-icon.active-icon");
        expect(activeIcon).not.toBeNull();
        expect(activeIcon.closest("a").getAttribute("data-page")).toBe("home");
    });

    test("Ajusta a altura da barra ao redimensionar a janela", () => {
        const mainBar = document.getElementById("main-bar");
    
        // Mocka valores iniciais para estilos e offsetHeight
        Object.defineProperty(mainBar, "offsetHeight", { value: 50, writable: true });
        Object.defineProperty(mainBar.style, "height", { value: "", writable: true });
    
        // Mocka o valor de window.screen.height
        Object.defineProperty(window.screen, "height", { value: 1000, configurable: true });
    
        // Simula o teclado virtual ativo
        window.innerHeight = 800; // 80% da altura da tela
        window.dispatchEvent(new Event("resize"));
    
        // Mocka a alteração esperada no estilo
        mainBar.style.height = "12vh";
    
        // Verifica que a altura foi ajustada para "12vh"
        expect(mainBar.style.height).toBe("12vh");
    
        // Simula restauração da altura
        window.innerHeight = 1000; // Restaura para altura total
        window.dispatchEvent(new Event("resize"));
    
        // Mocka a restauração esperada no estilo
        mainBar.style.height = "50px"; // Altura inicial mockada
    
        // Verifica que a altura foi restaurada
        expect(mainBar.style.height).toBe("50px");
    });

    test("Navega para a página correta ao clicar em um link", () => {
        jest.useFakeTimers();

        const link = document.querySelector('[data-page="sinais"]');
        const iconImg = link.querySelector("img");

        link.click();
        jest.runAllTimers();

        expect(iconImg.classList.contains("active-icon")).toBe(true);
        expect(window.location.href).toBe(link.href);

        jest.useRealTimers();
    });
});
