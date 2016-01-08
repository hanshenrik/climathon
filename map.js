var map = L.map('map', {
  center: [63.4297, 10.3933],
  dragging: false,
  scrollWheelZoom: false,
  maxZoom: 18,
  zoom: 14
});

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  accessToken: 'pk.eyJ1IjoiaGFuc2hlbnJpayIsImEiOiJjaWo0aTAzdncwMDIwdXJrcm5jZDZ6dXJ4In0.00I3RVVHNDAvi0XnbZEU-Q',
  id: 'mapbox.streets'
}).addTo(map);

// TODO: choose most appealing layout for pitch
// id: one of these https://www.mapbox.com/developers/api/maps/#tiles

var circle = L.circle([63.4297, 10.4133], 500, {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5
}).addTo(map);

// var polygon = L.polygon([
//   [63.4297, 10.3930],
//   [63.4290, 10.3943],
//   [63.4242, 10.3822]
// ]).addTo(map);

var popup = L.popup();
function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("<a href='#'>Request sensor</a> at this location") //+ e.latlng.toString())
    .openOn(map);
}

map.on('click', onMapClick);
