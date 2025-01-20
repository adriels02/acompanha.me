var app = new Framework7({
  el: "#app",
  name: "My App",
  id: "com.myapp.test",
  routes: [
    { path: "/entrar/", url: "entrar.html", animate: false },
    { path: "/home/", url: "home.html", animate: false },
    { path: "/alerta/", url: "alerta.html", animate: false },
    { path: "/contatos/", url: "contatos.html", animate: false },
    { path: "/sinais/", url: "sinais.html", animate: false },
    { path: "/disque/", url: "disque.html", animate: false },
    { path: "/cadastro/", url: "cadastro.html", animate: false },
    { path: "/termos/", url: "termos_de_uso.html", animate: false },
  ],
});

// Criar visualização principal
var mainView = app.views.create(".view-main", {
  url: "/home/",
});
