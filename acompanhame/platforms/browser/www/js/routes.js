var app = new Framework7({
  el: "#app",
  name: "My App",
  id: "com.myapp.test",
  routes: [
<<<<<<< HEAD
    {
      path: "/index/",
      url: "index.html",
      animate: false,
      on: {
        pageBeforeIn: function (event, page) {
          // fazer algo antes da página ser exibida
        },
        pageAfterIn: function (event, page) {
          // fazer algo depois da página ser exibida
        },
        pageInit: function (event, page) {
          // fazer algo quando a página for inicializada
        },
        pageBeforeRemove: function (event, page) {
          // fazer algo antes da página ser removida do DOM
        },
      },
    },
    {
      path: "/link2/",
      url: "link2.html",
      animate: false,
      on: {
        pageBeforeIn: function (event, page) {
          // fazer algo antes da página ser exibida
        },
        pageAfterIn: function (event, page) {
          // fazer algo depois da página ser exibida
        },
        pageInit: function (event, page) {
          // fazer algo quando a página for inicializada
        },
        pageBeforeRemove: function (event, page) {
          // fazer algo antes da página ser removida do DOM
        },
      },
    },
    {
      path: "/link3/",
      url: "link3.html",
      animate: false,
      on: {
        pageBeforeIn: function (event, page) {
          // fazer algo antes da página ser exibida
        },
        pageAfterIn: function (event, page) {
          // fazer algo depois da página ser exibida
        },
        pageInit: function (event, page) {
          // fazer algo quando a página for inicializada
        },
        pageBeforeRemove: function (event, page) {
          // fazer algo antes da página ser removida do DOM
        },
      },
    },
    {
      path: "/entrar/",
      url: "/entrar.html",
      animate: false,
      on: {
        pageBeforeIn: function (event, page) {
          // fazer algo antes da página ser exibida
        },
        pageAfterIn: function (event, page) {
          // fazer algo depois da página ser exibida
        },
        pageInit: function (event, page) {
          // fazer algo quando a página for inicializada
        },
        pageBeforeRemove: function (event, page) {
          // fazer algo antes da página ser removida do DOM
        },
      },
    },
    {
      path: "/cadastro/",
      url: "cadastro.html",
      animate: false,
      on: {
        pageBeforeIn: function (event, page) {
          // fazer algo antes da página ser exibida
        },
        pageAfterIn: function (event, page) {
          // fazer algo depois da página ser exibida
        },
        pageInit: function (event, page) {
          // fazer algo quando a página for inicializada
        },
        pageBeforeRemove: function (event, page) {
          // fazer algo antes da página ser removida do DOM
        },
      },
    },
=======
    { path: "/home/", url: "home.html", animate: false },
    { path: "/alerta/", url: "alerta.html", animate: false },
    { path: "/contatos/", url: "contatos.html", animate: false },
    { path: "/sinais/", url: "sinais.html", animate: false },
    { path: "/disque/", url: "disque.html", animate: false },
>>>>>>> 90773496dba1767302c24a836b06ed9d61be4947
  ],
});

<<<<<<< HEAD
//Para testes direto no navegador
var mainView = app.views.create(".view-main", { url: "/index/" });


//EVENTO PARA SABER O ITEM DO MENU ATUAL
app.on("routeChange", function (route) {
  var currentRoute = route.url;
  console.log(currentRoute);
  document.querySelectorAll(".tab-link").forEach(function (el) {
    el.classList.remove("active");
  });
  var targetEl = document.querySelector(
    '.tab-link[href="' + currentRoute + '"]'
  );
  if (targetEl) {
    targetEl.classList.add("active");
  }
});

function onDeviceReady() {
  //Quando estiver rodando no celular
  var mainView = app.views.create(".view-main", { url: "/index/" });
  
  //COMANDO PARA "OUVIR" O BOTAO VOLTAR NATIVO DO ANDROID
  document.addEventListener(
    "backbutton",
    function (e) {
      if (mainView.router.currentRoute.path === "/index/") {
        e.preventDefault();
        app.dialog.confirm("Deseja sair do aplicativo?", function () {
          navigator.app.exitApp();
        });
      } else {
        e.preventDefault();
        mainView.router.back({ force: true });
      }
    },
    false
  );
}
=======
// Criar visualização principal
var mainView = app.views.create(".view-main", {
  url: "/home/",
});
>>>>>>> 90773496dba1767302c24a836b06ed9d61be4947
