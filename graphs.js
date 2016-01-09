$(document).ready(function () {
  draw_real_time_graph();
  draw_compare_data_graph();
});

function draw_real_time_graph() {
  var real_time_graph = document.getElementById('real-time-graph');
  var data = [];
  var t = new Date();
  
  // Generate initial random data
  for (var i = 10; i >= 0; i--) {
    var x = new Date(t.getTime() - i*2000);
    data.push([ x, Math.floor(Math.random() * 110) + 300 ]);
  }

  var g = new Dygraph(real_time_graph, data,
    {
      legend: 'always',
      drawPoints: true,
      // showRoller: true,
      valueRange: [0, 1000],
      labels: ['Time', 'Node 001'],
      ylabel: 'CO2 (ppm)'
    });
  
  // It sucks that these things aren't objects, and we need to store state in window.
  window.intervalId = setInterval(function() {
    var x = new Date();  // current time
    var y = Math.floor(Math.random() * 110) + 300;
    data.push([x, y]);
    g.updateOptions( { 'file': data } );
  }, 2000);
}

function draw_compare_data_graph() {
  var compare_data_graph = document.getElementById('compare-data-graph')

  new Dygraph(compare_data_graph, "mock-data.txt", { // TODO: add more nodes and better values to mock data file
    legend: 'always',
    // title: 'Readings from mulitple nodes (mock data)',
    showRoller: true,
    rollPeriod: 1, // # of days to average over
    customBars: true, // val;lower;upper
    ylabel: 'CO2 (ppm)',
  });
}
