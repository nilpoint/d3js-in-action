/**
 * # d3.mouse(container) <>

  Returns the x and y coordinates of the current event relative to the specified container. The container may be an HTML or SVG container element, such as a G element or an SVG element. The coordinates are returned as a two-element array of numbers [x, y].

  # selection.node() <>

  Returns the first (non-null) element in this selection. 
  If the selection is empty, returns null.
 */

var svg = d3.select('body')
  .append('svg')
  .attr('width', 450)
  .attr('height', 450);

svg.append('rect')
  .attr('x', 0)
  .attr('y', 0)
  .attr('width', 450)
  .attr('height', 450)
  .attr('stroke', 'black')
  .attr('stroke-width', 1)
  .attr('fill', 'white');

var label = svg.append('text')
  .attr('x', 10)
  .attr('y', 30);

svg.on('mousemove', function(){
  var position = d3.mouse(svg.node());
  label.text('X=' + position[0] + ', Y=' + position[1]);
});