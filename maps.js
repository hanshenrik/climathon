var today_map;
var future_map;

$(document).ready(function () {
  today_map = draw_today_map();
  future_map = draw_future_map();
});

function draw_today_map() {
  var today_map = L.map('today-map', {
    center: [63.3985, 10.3933],
    scrollWheelZoom: false,
    maxZoom: 18,
    zoom: 11
  });

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    accessToken: 'pk.eyJ1IjoiaGFuc2hlbnJpayIsImEiOiJjaWo0aTAzdncwMDIwdXJrcm5jZDZ6dXJ4In0.00I3RVVHNDAvi0XnbZEU-Q',
    id: 'mapbox.streets' // Or one of these: https://www.mapbox.com/developers/api/maps/#tiles
  }).addTo(today_map);

  var options = {
    color: 'black',
    fillOpacity: .5,
    opacity: 1
  }
  L.circleMarker([63.357514, 10.371765], options).addTo(today_map)
  L.circleMarker([63.417531, 10.396615], options).addTo(today_map)
  L.circleMarker([63.430473, 10.393609], options).addTo(today_map)
  L.circleMarker([63.432923, 10.410652], options).addTo(today_map)

  // tiller =       63.357514, 10.371765
  // elgeseter =    63.417531, 10.396615
  // torvet =       63.430473, 10.393609
  // bakke kirke =  63.432923, 10.410652

  return today_map;
}

function draw_future_map() {
  var future_map = L.map('future-map', {
    center: [63.4235, 10.3933],
    scrollWheelZoom: false,
    maxZoom: 18,
    zoom: 13
  });

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    accessToken: 'pk.eyJ1IjoiaGFuc2hlbnJpayIsImEiOiJjaWo0aTAzdncwMDIwdXJrcm5jZDZ6dXJ4In0.00I3RVVHNDAvi0XnbZEU-Q',
    id: 'mapbox.streets'
  }).addTo(future_map);

  // Generate 200 randomly placed markers
  for (i = 0; i < 200; i++) {
    var lat = 63.436 -(Math.random()*0.03)
    var lon = 10.33 + (Math.random()*0.15)
    var value = Math.floor(Math.random() * 700) + 300;
    var color = "blue";
    if (value > 800) color = "red";
    if (value < 400) color = "green";

    L.circleMarker([lat, lon],
      {
        color: color
      })
      .addTo(future_map)
      .bindPopup("<b>Node X</b><br><b>Latest CO2 level</b>: "+value+"<br><b>Time</b>: 2016-01-07T17:04:42.453Z")
      .on('dblclick', onMarkerDblClick);
  }

  var popup = L.popup();
  function onMapClick(e) {
    popup
      .setLatLng(e.latlng)
      .setContent("<a href='#'>Request drone measurement</a> at this location<br><a href='#'>Request permanent sensor</a> at this location") //+ e.latlng.toString())
      .openOn(future_map);
  }
  function onMarkerDblClick(e) {
    alert('hi')
  }

  future_map.on('click', onMapClick);


  // var polygon = L.polygon([
  //   [63.4297, 10.3930],
  //   [63.4290, 10.3943],
  //   [63.4242, 10.3822]
  // ]).addTo(map);

return future_map;
}
