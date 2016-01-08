var node_euis = ['02031010', '02031001'];
var data_from_ttn = [];

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
        var lon = (node_eui === '02031010') ? 10.4000 : 10.3900
        var marker = L.marker([63.4297, lon]).addTo(map);
        marker.bindPopup("<b>Node "+node_eui+"</b><br>Latest CO2 level: "+
          data[0]['data_plain'] + " (measured " + data[0]['time'] + ")")
          .openPopup();
        $.each(data, function(k, v) {
          // DEV only put data from one node in the dygraph!
          if (node_eui === '02031010') {
            var date = new Date(this['time'])
            // console.log(date)

            // TODO make sure we retrieve a number from the sensor. If not number, something is probably wrong, notify someone somehow
            // data_from_ttn.push( [date, this['data_plain']] )
            data_from_ttn.push( [date, Math.floor(Math.random() * (800 - 200) + 200)] )
          }
          // console.log(this['data_plain'] + ': ' + k)
          // $('#result').append('<p>#' + k + ': ' + this['data_plain'] + ' (' + this['time'] + ')</p>')
            /// do stuff
        });
      });
    
  })

  $("#generate-dygraph").click(draw_dygraph)
  $("#generate-dygraph-mock").click(draw_dygraph_mock)
})
