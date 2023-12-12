mapboxgl.accessToken = 'pk.eyJ1IjoidmljdG9ybGxjcyIsImEiOiJjbHB4YWJ4YmowbHBtMnFucmVhMndmaDBiIn0.UG5REz8UIPweCOOWkiKHLA';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-46.6333, -23.5505],
  zoom: 10
});

var map2 = new mapboxgl.Map({
  container: 'map2',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-43.940035681623165, -19.92071678672289],
  zoom: 10
});

var map3 = new mapboxgl.Map({
  container: 'map3',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-46.6333, -23.5505],
  zoom: 10
});

var map4 = new mapboxgl.Map({
  container: 'map4',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-46.6333, -23.5505],
  zoom: 10
});

var map5 = new mapboxgl.Map({
  container: 'map5',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-46.6333, -23.5505],
  zoom: 10
});

var map6 = new mapboxgl.Map({
  container: 'map6',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-46.6333, -23.5505],
  zoom: 10
});

var map7 = new mapboxgl.Map({
  container: 'map7',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-46.6333, -23.5505],
  zoom: 10
});

var map8 = new mapboxgl.Map({
  container: 'map8',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-46.6333, -23.5505],
  zoom: 10
});

// Adicione os controles de navegação aos mapas
map.addControl(new mapboxgl.NavigationControl());
map2.addControl(new mapboxgl.NavigationControl());
map3.addControl(new mapboxgl.NavigationControl());
map4.addControl(new mapboxgl.NavigationControl());
map5.addControl(new mapboxgl.NavigationControl());
map6.addControl(new mapboxgl.NavigationControl());
map7.addControl(new mapboxgl.NavigationControl());
map8.addControl(new mapboxgl.NavigationControl());

// Adicione as rotas aos mapas
addRoute(map, [-46.63780, -23.54380], [-46.40464, -23.43135]);
addRoute(map2, [-19.93610, -43.94764], [-19.95173, -43.91320]);
addRoute(map3, [-46.63780, -23.54380], [-46.40464, -23.43135]);
addRoute(map4, [-19.93610, -43.94764], [-19.95173, -43.91320]);
addRoute(map5, [-46.63780, -23.54380], [-46.40464, -23.43135]);
addRoute(map6, [-19.93610, -43.94764], [-19.95173, -43.91320]);
addRoute(map7, [-46.63780, -23.54380], [-46.40464, -23.43135]);
addRoute(map8, [-19.93610, -43.94764], [-19.95173, -43.91320]);

// Função para adicionar uma rota a um mapa específico
function addRoute(maps, start, end) {
  var directionsRequest = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + start[0] + ',' + start[1] + ';' + end[0] + ',' + end[1] +
    '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken;

  // Faça uma solicitação AJAX para obter a rota
  fetch(directionsRequest)
    .then(response => response.json())
    .then(data => {
      var route = data.routes[0].geometry;
      maps.forEach(map => {
        map.addLayer({
          id: 'route' + Date.now(),
          type: 'line',
          source: {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: route
            }
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#3887be',
            'line-width': 5
          }
        });
      });
    });
}

// Adicione as rotas aos mapas
addRoute([map, map2], [-19.93610, -43.94764], [-19.95173, -43.91320]);
addRoute([map3, map4], [-19.93610, -43.94764], [-19.95173, -43.91320]);
addRoute([map5, map6], [-19.93610, -43.94764], [-19.95173, -43.91320]);
addRoute([map7, map8], [-46.63780, -23.54380], [-46.40464, -23.43135]);




var layer = L.mapbox.tileLayer('mapbox.streets');
layer.on('ready', function() {
});

var layer = L.mapbox.tileLayer('mapbox.streets');
layer.on('error', function(err) {
});