
function draw_dygraph() {
    var dygraph_div = document.getElementById("dygraph-div")

    // data_from_ttn.unshift([ new Date(2016,01,07), 300 ])
    
    // OBS! newest data pushed first to the data_from_ttn, reverse it to get chronological timeline!
    new Dygraph(dygraph_div, data_from_ttn.reverse(), { 
      labels: [ "x", "02031010" ],
      legend: 'always',
      title: 'Readings from node 02031010',
      showRoller: true,
      rollPeriod: 1, // # of days to average over
      // customBars: true, // val;lower;upper
      ylabel: 'CO2 (ppm)',
    });
}


function draw_dygraph_mock() {
    var dygraph_div = document.getElementById("dygraph-div-mock")

    new Dygraph(dygraph_div, "ny-vs-sf.txt", {
      legend: 'always',
      title: 'Readings from mulitple nodes (mock data)',
      showRoller: true,
      rollPeriod: 1, // # of days to average over
      customBars: true, // val;lower;upper
      ylabel: 'CO2 (ppm)',
    });
}
