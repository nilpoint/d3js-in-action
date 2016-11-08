/**
 * mouseout
 * The mouseout event is fired when a pointing device (usually a mouse) is moved off the element that has the listener attached or off one of its children.
 * 
 * mouseenter
 * The mouseenter event is fired when a pointing device (usually a mouse) is moved over the element that has the listener attached. Similar to mouseover, it differs in that it doesn't bubble and that it isn't sent when the pointer is moved from one of its descendants' physical space to its own physical space.With deep hierarchies, the amount of mouseenter events sent can be quite huge and cause significant performance problems. In such cases, it is better to listen for mouseover events. Combined with the behavior of its symmetrical event, mouseleave, the mouseenter DOM Event acts in a very similar way to the CSS :hover pseudo-class.
 */

var data = [30, 20, 40], x=0;

var svg = d3.select('body')
  .append('svg')
  .attr('width', 600)
  .attr('height', 600);

svg.append('rect')
  .attr('x', 0)
  .attr('y', 0)
  .attr('width', 600)
  .attr('height', 600)
  .attr('stroke', 'black')
  .attr('stroke-width', 1)
  .attr('fill', 'white');

svg.selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attr('fill', 'steelblue')
  .each(function(d, i){
    d3.select(this)
      .attr('cx', x += (d+5))
      .attr('cy', 40)
      .attr('r', d/2)
  })
  .on('mouseenter', function(){
    d3.select(this).attr('fill', 'red');
  })
  .on('mouseout', function(){
    d3.select(this).attr('fill', 'steelblue');
  })
  .on('click', function(d, i){
    console.log(d + ' ' + i);
  });