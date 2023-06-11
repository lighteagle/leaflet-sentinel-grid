// Nominatim does not map some actual addresses
'use strict';

// Map
const map = L.map('map', {
    center: [0, 0],
    zoom: 3,
});
var sentinel2021 = L.tileLayer.wms('https://s2maps-tiles.eu/wms', {
    layers: 's2cloudless-2021_3857',
    format: 'image/jpeg',
    tileSize: 256,
    tileMatrixSet: 'GoogleMapsCompatible',
    version: '1.0.0',
    attribution: 's2maps-tiles.eu'
}).addTo(map);

sentinel2021.on('tileerror', function (error, tile) {
    console.log('Tile error:', error, tile);
});


// container for address search results
const addressSearchResults = new L.LayerGroup().addTo(map);

/*** Geocoder ***/
// OSM Geocoder
const osmGeocoder = new L.Control.geocoder({
    collapsed: false,
    position: 'topright',
    text: 'Address Search',
    placeholder: 'Enter street address',
    defaultMarkGeocode: false
}).addTo(map);

// handle geocoding result event
osmGeocoder.on('markgeocode', e => {
    // to review result object
    console.log(e);
    // coordinates for result
    const coords = [e.geocode.center.lat, e.geocode.center.lng];
    // center map on result
    map.setView(coords, 16);
});