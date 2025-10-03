// Cria o container do mapa
const container = document.createElement("div");
container.style.width = "100%";
container.style.height = "500px";
document.body.appendChild(container);

// Inicializa o mapa Leaflet centralizado no Brasil
const map = L.map(container).setView([-14.2350, -51.9253], 4);

// Adiciona camada base do OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap'
}).addTo(map);

// Carrega o GeoJSON hospedado no GitHub (link RAW)
fetch("https://raw.githubusercontent.com/amarilisbezerra-beep/meu-mapa/main/municipios_br.geojson")
  .then(res => res.json())
  .then(data => {
    const layer = L.geoJSON(data, {
      style: {
        weight: 0.5,
        fillOpacity: 0.4,
        color: "#2e86de"
      },
      onEachFeature: (feature, lyr) => {
        // popup simples com nome e código IBGE
        lyr.bindPopup(`${feature.properties.name} (${feature.properties.code})`);
      }
    }).addTo(map);

    // Ajusta o zoom para caber todos os municípios
    map.fitBounds(layer.getBounds());
  })
  .catch(err => console.error("Erro ao carregar GeoJSON:", err));
