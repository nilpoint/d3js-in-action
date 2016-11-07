/**
 * # transition.tween(name[, value]) <>

  For each selected element, assigns the tween with the specified name with the specified value function. The value must be specified as a function that returns a function. When the transition starts, the value function is evaluated for each selected element, in order, being passed the current datum d and index i, with the this context as the current DOM element. The returned function is then invoked for each frame of the transition, in order, being passed the eased time t, typically in the range [0, 1]. If the specified value is null, removes the previously-assigned tween of the specified name, if any.

  For example, to interpolate the fill attribute to blue, like transition.attr:

  selection.tween("attr.fill", function() {
    var node = this, i = d3.interpolateRgb(node.getAttribute("fill"), "blue");
    return function(t) {
      node.setAttribute("fill", i(t));
    };
  });
  This method is useful to specify a custom interpolator, or to perform side-effects, say to animate the scroll offset.

  * d3.interpolateRound(a, b) <>

  Returns an interpolator between the two numbers a and b; the interpolator is similar to interpolateNumber, except it will round the resulting value to the nearest integer.
 */

var svg = d3.select('body')
  .append('svg')
  .attr('width', 600)
  .attr('height', 200);

svg.append('text')
  .attr('x', 10)
  .attr('y', 50)
  .transition()
  .duration(10000)
  .tween('mytween', function(d, i){
    var node = this;
    return function(t) {
      node.textContent = d3.interpolateRound(0,10)(t);
    }
  });