var svg = d3.select('body')
  .append('svg')
  .attr('width', 100)
  .attr('height', 500);

var scale = d3.scaleLinear()
  .domain([210, 0])
  .range([0, 300]);

var axis = d3.axisLeft(scale);

// The axis scale then needs to be associated with a selection, 
// which is performed using the .call() function.
var axisGroup = svg.append('g');
axisGroup.attr("transform", 'translate(50,0)')
  .call(axis);