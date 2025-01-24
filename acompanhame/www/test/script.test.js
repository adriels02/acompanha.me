describe("Comportamento da Splash Screen", () => {
  let originalLocation;

  beforeEach(() => {
    // Salva o objeto original `location` antes de sobrescrever
    originalLocation = window.location;

    // Sobrescreve `window.location` com um mock
    delete window.location;
    window.location = {
      href: "",
      assign: jest.fn()
    };

    // Configura o DOM com a splash screen
    document.body.innerHTML = `
      <div class="splash-screen">Loading...</div>
    `;
  });

  afterEach(() => {
    // Restaura o objeto original `location`
    window.location = originalLocation;

    // Limpa todos os mocks
    jest.clearAllMocks();
    jest.useRealTimers(); // Certifique-se de voltar para os timers reais após o teste
  });

  test("A splash screen existe no DOM", () => {
    // Verifica se o elemento splash-screen está presente
    const splashScreen = document.querySelector(".splash-screen");
    expect(splashScreen).not.toBeNull();
  });

  test("Redireciona para entrar.html após 3 segundos ao carregar o DOM", () => {
    jest.useFakeTimers(); // Substitui os temporizadores reais por mocks

    // Importa o script principal
    require("../js/script.js");

    // Simula o evento DOMContentLoaded
    document.dispatchEvent(new Event("DOMContentLoaded"));

    // Avança o tempo para disparar o setTimeout
    jest.runAllTimers();

    // Verifica se o redirecionamento ocorreu corretamente
    expect(window.location.href).toBe("entrar.html");
  });
});

