var url_json = "walking_dead_s5.json";
var margin = { top: 10, right: 10, bottom: 260, left: 85 };
var graphWidth = 500, graphHeight = 300;
var totalWidth = graphWidth + margin.left + margin.right;
var totalHeight = graphHeight + margin.top + margin.bottom;
var axisPadding = 3;

var svg = d3.select('body')
  .append('svg')
  .attr('width', totalWidth)
  .attr('height', totalHeight);

d3.json(url_json, function(error, data){
  var viewership = convert_data(error, data);
  var maxViewers = d3.max(viewership);

  var mainGroup = svg.append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

  // Now we create an ordinal scale for the bars
  var bands = d3.scaleBand()
    .domain(viewership)
    .range([0, graphWidth])
    .padding(0.05);

  // We also require a scale to calculate the height of each bar:
  var yScale = d3.scaleLinear()
    .domain([0, maxViewers])
    .range([0, graphHeight]);

  // create the groups for the content of each bar:
  var barGroup = mainGroup.selectAll('g')
    .data(viewership)
    .enter()
    .append('g')
    .attr('transform', function(d) { return 'translate(' + bands(d) + ',' + (graphHeight - yScale(d)) + ')'; });
  
  // append the rectangle for the bar:
  barGroup.append('rect')
    .attr('width', bands.bandwidth())
    .attr('height', function(d) { return yScale(d); })
    .attr('fill', 'steelblue');

  // add a label to the bar to show the exact viewership value:
  barGroup.append('text')
    .text(function(d) { return d; })
    .style('text-anchor', 'start')
    .attr('dx', 10)
    .attr('dy', -10)
    .attr('transform', 'rotate(90)')
    .attr('fill', 'white');

  // left axis:
  var leftAxisGroup = svg.append('g');
  leftAxisGroup.attr('transform', 'translate(' + (margin.left - axisPadding) + ',' + margin.top + ')');

  var yAxisScale = d3.scaleLinear()
    .domain([maxViewers, 0])
    .range([0, graphHeight]);

  var leftAxis = d3.axisLeft().scale(yAxisScale);

  var leftAxisNodes = leftAxisGroup.call(leftAxis);

  styleAxisNodes(leftAxisNodes);

  // bottom axis:
  var titles = data.map(function(d) { return d.Title; });
  var bottomAxisScale = d3.scaleBand()
    .domain(titles)
    .range([axisPadding, graphWidth + axisPadding]);
  var bottomAxis = d3.axisBottom().scale(bottomAxisScale);
  var bottomAxisX = margin.left - axisPadding;
  var bottomAxisY = totalHeight - margin.bottom + axisPadding;
  var bottomAxisGroup = svg.append('svg')
    .attr('transform', 'translate(' + bottomAxisX + ',' + bottomAxisY + ')');
  var bottomAxisNodes = bottomAxisGroup.call(bottomAxis);
  styleAxisNodes(bottomAxisNodes);
  bottomAxisNodes.selectAll('text')
    .style('text-anchor', 'start')
    .attr('dx', 10)
    .attr('dy', -5)
    .attr('transform', 'rotate(90)');
  
});

var convert_data = function(error, data){
  if (error) {
    console.log(error);
    return null;
  }

  if (data) {
    var convertedData = data.map(function(d){
      return d.USViewers;
    });
    return convertedData;
  }

  return null;
};

// The following function is used by the selection that creates
// the bars to position each of them:
function translator(d, i) {
  return "translate(" + bands(i) + ', ' + (graphHeight - yScale(d)) + ')';
};

function styleAxisNodes(axisNodes) {
  axisNodes.selectAll('.domain')
    .attr({
      fill: 'none',
      'stroke-width': 1,
      stroke: 'black'
    });
  axisNodes.selectAll('.tick line')
    .attr({
      fill: 'none',
      'stroke-width': 1,
      stroke: 'black'
    });
};