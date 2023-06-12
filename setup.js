// Nominatim does not map some actual addresses
'use strict';

// Map
const map = L.map('map', {
  center: [0, 0],
  zoom: 3,
});
map.zoomControl.remove();

var sentinelLayer = {};

addSentinelLayer('2016', 'https://s2maps-tiles.eu/wms', 's2cloudless_3857');
addSentinelLayer('2018', 'https://s2maps-tiles.eu/wms', 's2cloudless-2018_3857');
addSentinelLayer('2019', 'https://s2maps-tiles.eu/wms', 's2cloudless-2019_3857');
addSentinelLayer('2020', 'https://s2maps-tiles.eu/wms', 's2cloudless-2020_3857');
addSentinelLayer('2021', 'https://s2maps-tiles.eu/wms', 's2cloudless-2021_3857');

sentinelLayer['2021'].addTo(map);
function addSentinelLayer(key, url, layers,) {
    sentinelLayer[key] = L.tileLayer.wms(url, {
        layers: layers,
        format: 'image/jpeg',
        tileSize: 256,
        tileMatrixSet: 'GoogleMapsCompatible',
        version: '1.0.0',
        attribution: 's2maps-tiles.eu'
    })

    sentinelLayer[key].on('tileerror', function (error, tile) {
        console.log('Tile error:', error, tile);
    });
}


// container for address search results
const addressSearchResults = new L.LayerGroup().addTo(map);

/*** Geocoder ***/
// OSM Geocoder
const osmGeocoder = new L.Control.geocoder({
  collapsed: false,
  position: 'topright',
  text: 'Address Search',
  placeholder: 'Enter street address',
  defaultMarkGeocode: false,
}).addTo(map);

// handle geocoding result event
osmGeocoder.on('markgeocode', (e) => {
  // to review result object
  console.log(e);
  // coordinates for result
  const coords = [e.geocode.center.lat, e.geocode.center.lng];
  // center map on result
  map.setView(coords, 16);
});



