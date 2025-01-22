document.addEventListener("DOMContentLoaded", () => {
    const splashScreen = document.querySelector(".splash-screen");
  
    // Exibir a Splash Screen por 3 segundos e redirecionar para entrar.html
    setTimeout(() => {
      window.location.href = "entrar.html";
    }, 3000);
  });