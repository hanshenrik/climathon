var map_today = L.map('map-today', {
  center: [63.4285, 10.3933],
  scrollWheelZoom: false,
  maxZoom: 18,
  zoom: 14
});

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  accessToken: 'pk.eyJ1IjoiaGFuc2hlbnJpayIsImEiOiJjaWo0aTAzdncwMDIwdXJrcm5jZDZ6dXJ4In0.00I3RVVHNDAvi0XnbZEU-Q',
  id: 'mapbox.streets' // Or one of these: https://www.mapbox.com/developers/api/maps/#tiles
}).addTo(map_today);

// TODO: add static markers that actually exist today

var map_the_feature = L.map('map-the-feature', {
  center: [63.4285, 10.3933],
  scrollWheelZoom: false,
  maxZoom: 18,
  zoom: 14
});

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  accessToken: 'pk.eyJ1IjoiaGFuc2hlbnJpayIsImEiOiJjaWo0aTAzdncwMDIwdXJrcm5jZDZ6dXJ4In0.00I3RVVHNDAvi0XnbZEU-Q',
  id: 'mapbox.streets'
}).addTo(map_the_feature);

// Generate 200 randomly placed markers
for (i = 0; i < 200; i++) {
  var lat = 63.436 -(Math.random()*0.05)
  var lon = 10.34 + (Math.random()*0.1)
  var value = Math.floor(Math.random() * 700) + 300;
  var color = "blue";
  if (value > 800) color = "red";
  if (value < 400) color = "green";

  L.circleMarker([lat, lon],
    {
      color: color
    })
    .addTo(map_the_feature)
    .bindPopup("<b>Node X</b><br><b>Latest CO2 level</b>: "+value+"<br><b>Time</b>: 2016-01-07T17:04:42.453Z");
}

var popup = L.popup();
function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("<a href='#'>Request drone measurement</a> at this location<br><a href='#'>Request permanent sensor</a> at this location") //+ e.latlng.toString())
    .openOn(map_the_feature);
}

map_the_feature.on('click', onMapClick);

// var polygon = L.polygon([
//   [63.4297, 10.3930],
//   [63.4290, 10.3943],
//   [63.4242, 10.3822]
// ]).addTo(map);
