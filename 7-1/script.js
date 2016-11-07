/**
 * In this example, we start by creating the following SVG rectangle 
 * and setting its initial fill to red, followed by transitioning the 
 * fill color to blue over a period of five seconds.
 */

var svg = d3.select('body')
  .append('svg')
  .attr('width', 300)
  .attr('height', 300);

var rect = svg.append('rect')
  .attr('x', 10)
  .attr('y', 10)
  .attr('width', 80)
  .attr('height', 80)
  .attr('fill', 'green');

rect.transition()
  .duration(8000)
  .attr('fill', 'red')
  .attr('x', 80)
  .attr('y', 80)
  .attr('width', 100)
  .attr('height', 100);