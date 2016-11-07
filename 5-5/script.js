var data = d3.range(0, 10);

var colorScale = d3.scaleOrdinal(d3.schemeCategory10);

var svg = d3.select('body')
  .append('svg')
  .attr('width', 500)
  .attr('height', 50);

svg.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('fill', function(d) { return colorScale(d); })
  .attr('x', function(d, i) { return i * 50; })
  .attr('width', 50)
  .attr('height', 50)

