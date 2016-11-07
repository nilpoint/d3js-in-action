/**
 * Creating a basic scatter plot using fixed-sized and solid points
 */

var dataUrl = "corr_aapl_msft.csv";
var graphWidth = 400, graphHeight = 400;
var margins = {top: 10, right: 20, bottom: 30, left: 50};
var totalWidth = graphWidth + margins.left + margins.right;
var totalHeight = graphHeight + margins.top + margins.bottom;
var radius = 5;
var axisPadding = 3;

var svg = d3.select('body')
  .append('svg')
  .attr('width', totalWidth)
  .attr('height', totalHeight);

svg.append('rect')
  .attr('width', totalWidth)
  .attr('height', totalHeight)
  .attr('x', 0)
  .attr('y', 0)
  .attr('stroke', 'black')
  .attr('stroke-width', 1)
  .attr('fill', 'white');

var graphGroup = svg.append('g')
  .attr('width', graphWidth)
  .attr('height', graphHeight)
  .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')');

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

  graphGroup.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', function(d) { return scale(d.x); })
    .attr('cy', function(d) { return scale(d.y); })
    .attr('fill', 'none')
    .attr('stroke', 'steelblue')
    .attr('r', radius);

  // Add y axis
  var leftAxisGroup = svg.append('g')
    .attr('transform', 'translate(' + (margins.left - axisPadding) + ',' + margins.top + ')');
  var yAxisScale = d3.scaleLinear()
    .domain([-maxExtent, maxExtent])
    .range([0,graphHeight]);
  var leftAxis = d3.axisLeft().scale(yAxisScale);
  var leftAxisNodes = leftAxisGroup.call(leftAxis);

  // Add x axis
  var bottomAxisGroup = svg.append('g')
    .attr('transform', 'translate(' + margins.left  + ',' + (totalHeight - margins.bottom + axisPadding) + ')');
  var xAxisScale = d3.scaleLinear()
    .domain([-maxExtent, maxExtent])
    .range([0, graphWidth]);
  var bottomAxis = d3.axisBottom().scale(xAxisScale);
  var leftAxisNodes = bottomAxisGroup.call(bottomAxis);

  // Add gridlines
  var yGridlinesAxis = d3.axisLeft().scale(yAxisScale);
  var yGridlinesNodes = svg.append('g')
    .attr('transform', 'translate(' + (margins.left + graphWidth) + ',' + margins.top + ')')
    .call(yGridlinesAxis.tickSize(graphWidth + axisPadding, 0, 0).tickFormat(""));
  styleGridlineNodes(yGridlinesNodes);

  var xGridlinesAxis = d3.axisBottom().scale(xAxisScale);
  var xGridlinesNodes = svg.append('g')
    .attr('transform', 'translate(' + margins.left + ',' + (totalHeight - margins.bottom + axisPadding) + ')')
    .call(xGridlinesAxis.tickSize((-graphHeight - axisPadding), 0, 0).tickFormat(""));
  styleGridlineNodes(xGridlinesNodes);
});

function styleGridlineNodes(axisNodes) {
  axisNodes.selectAll('.domain')
    .attr('fill', 'none')
    .attr('stroke', 'none');
  axisNodes.selectAll('.tick line')
    .attr('fill', 'none')
    .attr('stroke-width', 1)
    .attr('stroke', 'lightgray');
}