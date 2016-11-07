/**
 * Creating a basic scatter plot using fixed-sized and solid points
 */

var dataUrl = "corr_aapl_msft.csv";
var graphWidth = 400, graphHeight = 400;
var radius = 5;

var svg = d3.select('body')
  .append('svg')
  .attr('width', graphWidth)
  .attr('height', graphHeight);

var scale = d3.scaleLinear()
  .range([0, graphWidth]);

d3.csv(dataUrl, function(error, rawData){
  var data = rawData.map(function(d){
    return {x: +d.AAPL, y: +d.MSFT}
  });
  console.log(data);

  var xExtents = d3.extent(data, function(d){ return d.x; });
  var yExtents = d3.extent(data, function(d){ return d.y; });

  console.log(xExtents);
  console.log(yExtents);

  var maxExtent = d3.max(xExtents.concat(yExtents), function(d) { return Math.abs(d); });
  console.log(maxExtent);
  scale.domain([-maxExtent, maxExtent]);

  svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', function(d) { return scale(d.x); })
    .attr('cy', function(d) { return scale(d.y); })
    .attr('fill', 'steelblue')
    .attr('r', radius);
});