var data = [55, 44, 30, 23, 17, 14, 16, 25, 41, 61, 85,
            101, 95, 105, 114, 150, 180, 210, 125, 100, 71,
            75, 72, 67];
var barWidth = 15;
var barPadding = 3;
var maxValue = d3.max(data);

function xloc(d, i) { return i * (barWidth + barPadding); }
function yloc(d) { return maxValue - d; }
function translator(d, i) {
  return "translate(" + xloc(d, i) + ", " + yloc(d) + ")";
}
var textTranslator = "translate(" + barWidth / 2 + ",0)";

var graphWidth = data.length * (barWidth + barPadding) - barPadding;
var margin = {
  top: 10,
  right: 10,
  bottom: 10,
  left: 50
};
var totalWidth = graphWidth + margin.left + margin.right;
var totalHeight = maxValue + margin.top + margin.bottom;

// Create the main SVG element
var svg = d3.select('body')
  .append('svg')
  .attr('width', totalWidth)
  .attr('height', totalHeight);

// Add a rectangle that shows us the boundaries of the main SVG element
svg.append('rect')
  .attr('width', totalWidth)
  .attr('height', totalHeight)
  .attr('fill', 'white')
  .attr('stroke', 'black')
  .attr('stroke-width', 1);

// Add a group to hold the main part of the graph
var graphGroup = svg.append('g')
  .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

graphGroup.append('rect')
  .attr('fill', 'rgba(0,0,0,0.1)')
  .attr('width', totalWidth - (margin.left + margin.right))
  .attr('height', totalHeight - (margin.top + margin.bottom))

var barGroups = graphGroup.selectAll("g")
  .data(data)
  .enter()
  .append('g')
  .attr("transform", translator)

barGroups.append('rect')
  .attr("fill", 'steelblue')
  .attr("width", barWidth)
  .attr("height", function(d){ return d; });

barGroups.append('text')
  .text(function(d) { return d; } )
  .attr('fill', 'white')
  .attr('alignment-baseline', 'before-edge')
  .attr('text-anchor', 'middle')
  .attr('transform', textTranslator)
  .style('font','10px sans-serif');

var scale = d3.scaleLinear()
  .domain([maxValue, 0])
  .range([0, maxValue]);

var axis = d3.axisLeft(scale)
var leftAxisGroup = svg.append('g');
var axisPadding = 3;
leftAxisGroup.attr('transform', 'translate(' + (margin.left - axisPadding) + ', ' + margin.top + ')')
  .call(axis);

