// Inicializa o mapa e exibe a localização atual usando Leaflet.js
function initMap() {
    const map = L.map("map").setView([0, 0], 15); // Ponto inicial (será atualizado com a localização)
  
    // Adiciona tiles do OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
  
    // Obter localização atual
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
  
          // Atualizar a visualização do mapa para a localização atual
          map.setView([latitude, longitude], 15);
  
          // Adicionar marcador para a localização atual
          L.marker([latitude, longitude])
            .addTo(map)
            .bindPopup("Você está aqui!")
            .openPopup();
  
          // Atualizar texto da localização
          document.getElementById("current-location").textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;
        },
        () => {
          document.getElementById("current-location").textContent = "Não foi possível obter a localização.";
        }
      );
    } else {
      document.getElementById("current-location").textContent = "Geolocalização não é suportada pelo seu navegador.";
    }
  }
  
  // Carrega o mapa ao abrir a página
  window.onload = initMap;
  