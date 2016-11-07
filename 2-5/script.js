d3.selectAll('div').style('background-color', function(d, i){
  return (i % 2 === 0) ? 'lightblue' : 'lightgrey';
});