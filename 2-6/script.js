d3.selectAll('div')
  .style('width', function(d, i){
    return (10 + 10 * i) + "px";
  })
  .style('background-color', function(d, i){
    return (i % 2 === 0) ? 'lightblue' : 'lightgrey';
  });