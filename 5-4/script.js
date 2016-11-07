var colorScale = d3.scaleOrdinal()
  .domain(['red', 'green', 'blue'])
  .range(['#ff0000', '#00ff00', '#0000ff']);

console.log('red -> ' + colorScale('red'));
console.log('green -> ' + colorScale('green'));
console.log('blue -> ' + colorScale('blue'));