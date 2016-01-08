var node_euis = ['02031010'];
var data_from_ttn = [];
var lat = 63.422502
var lon = 10.395755

$(document).ready(function() {

  // TODO: for scalability when number of nodes increase,
  // consider using MQTT instead of API: http://thethingsnetwork.org/wiki/Software/Overview

  $.each( node_euis, function(i, node_eui) {
    console.log("Getting data from node: " + node_eui);
    $.get( "http://thethingsnetwork.org/api/v0/nodes/" + node_eui)
      .done(function( data ) {
        // if (!data) {
        //   console.log("No data for node "+node_eui)
        // }
        console.log("Got data from node: " + node_eui + "!")
        var lat = (node_eui === '02031010') ? 63.433297 : 63.422502
        var marker = L.marker([lat, lon]).addTo(map);
        marker.bindPopup("<b>Node "+node_eui+"</b><br><b>Latest CO2 level</b>: "+
          data[0]['data_plain'] + "<br><b>Time</b>: " + data[0]['time'] + "")
        $.each(data, function(k, v) {
          // DEV only put data from one node in the dygraph!
          if (node_eui === '02031010') {
            var date = new Date(this['time'])
            var value = Math.floor(Math.random() * (800 - 200) + 200) // this['data_plain'] OR this[data_something]
            // TODO make sure we retrieve a number from the sensor. If not number, something is probably wrong, notify someone somehow
            
            // console.log(date)

            // if ( (k == data.length - 1) && (value > 700) ) {
            //   console.log(k + " this is last element and value was higher than 300")
            //   var circle = L.circle([lat, lon], 200, {
            //     color: 'red',
            //     fillColor: '#f03',
            //     fillOpacity: 0.5
            //   }).addTo(map);
            //   warningCircleDrawn = true;
            // }

            // data_from_ttn.push( [date, value] )
            data_from_ttn.push( [date, value] )
          }
          // console.log(this['data_plain'] + ': ' + k)
          // $('#result').append('<p>#' + k + ': ' + this['data_plain'] + ' (' + this['time'] + ')</p>')
            /// do stuff
        });
      });
    
  })

  $("#generate-dygraph").click(draw_dygraph)
  $("#generate-dygraph-mock").click(draw_dygraph_mock)
  $("#generate-many-markers").click(function() {
    for (i = 0; i < 500; i++) { 
      var lat = 63.436 -(Math.random()*0.05)
      var lon = 10.34 + (Math.random()*0.1)
      L.marker([lat, lon])
        .addTo(map)
        .bindPopup("<b>Node X</b><br><b>Latest CO2 level</b>: 400<br><b>Time</b>: 2016-01-07T17:04:42.453Z");
    }
  })
  $("#add-circle").click(function() {
    var circle = L.circle([63.433297, 10.395755], 200, {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5
    }).addTo(map);
  })
})
