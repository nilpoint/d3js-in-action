/**
 * Creating a bubble plot
 * Bubble plots help us to visualize three or four dimensions of data. Each
 * datum in a bubble plot consists not only of two values used to plot against
 * the X and Y axes, but also one or two additional values which are commonly
 * represented by different size symbols and/or colors.
 */

var url = "fert_pop_exp.csv";

d3.csv(url, function(error, rawData){
  var data = rawData.map(function(d){
    return {
      CountryCode: d.CountryCode,
      CountryName: d.CountryName,
      LifeExp: +d.LifeExp,
      FertRate: +d.FertRate,
      Population: +d.Population,
      Region: d.Region
    };
  });
  console.log(data[0]);

  var minBubbleSize = 5, maxBubbleSize = 50;
  var margin = {
    left: maxBubbleSize, 
    top: maxBubbleSize,
    bottom: maxBubbleSize, 
    right: maxBubbleSize
  };
  var axisPadding = 10;
  var graphWidth = 500, graphHeight = 400;
  var totalWidth = graphWidth + margin.left + margin.right;
  var totalHeight = graphHeight + margin.top + margin.bottom;

  var svg = d3.select('body')
    .append('svg')
    .attr('width', totalWidth)
    .attr('height', totalHeight);

  var lifeExpectancy = data.map(function(d) { return d.LifeExp; });
  var fertilityRate = data.map(function(d) { return d.FertRate; });
  var population = data.map(function(d) { return d.Population; });
  var regions = data.map(function(d) { return d.Region; });

  // x scale
  var xScale = d3.scaleLinear()
    .domain([d3.min(lifeExpectancy), d3.max(lifeExpectancy)])
    .range([0, graphWidth]);

  // y scale
  var yScale = d3.scaleLinear()
    .domain([d3.max(fertilityRate), 0])
    .range([0, graphHeight]);

  // pop scale
  var popScale = d3.scaleLinear()
    .domain(d3.extent(population))
    .range([minBubbleSize, maxBubbleSize]);

  var uniqueRegions = d3.set(regions).values();
  var regionColorMap = d3.scaleOrdinal()
    .domain(uniqueRegions)
    .range(d3.schemeCategory10);

  var yAxis = d3.axisLeft().scale(yScale);
  var yAxisNodes = svg.append('g')
    .attr('transform', 'translate(' + (margin.left - axisPadding) + ',' + margin.top + ')')
    .call(yAxis);
  styleAxisNodes(yAxisNodes);

  var xAxis = d3.axisBottom().scale(xScale);
  var xAxisNodes = svg.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + (totalHeight-margin.bottom+axisPadding) + ')')
    .call(xAxis);
  styleAxisNodes(xAxisNodes);

  // bubbles
  svg.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .each(function(d){
      d3.select(this)
        .attr('cx', xScale(d.LifeExp))
        .attr('cy', yScale(d.FertRate))
        .attr('r', popScale(d.Population))
        .attr('fill', regionColorMap(d.Region))
        .attr('stroke', regionColorMap(d.Region))
        .attr('fill-opacity', 0.5);
    });
});

function styleAxisNodes(axisNodes) {
  axisNodes.selectAll('.domain')
    .attr('fill', 'none')
    .attr('stroke-width', 1)
    .attr('stroke', 'black');
  
  axisNodes.selectAll('.tick line')
    .attr('fill', 'none')
    .attr('stroke-width', 1)
    .attr('stroke', 'black');
}