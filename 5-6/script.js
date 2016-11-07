var bands = d3.scaleBand()
  .domain([0,1,2])
  .rangeRound([0,100])
  .padding(0.1);

console.log('bandwidth -> ' + bands.bandwidth());
console.log('padding -> ' + bands.padding());
console.log('step -> ' + bands.step());
console.log('position 0 -> ' + bands(0));
console.log('position 1 -> ' + bands(1));
console.log('position 2 -> ' + bands(2));
