/**
 * # transition.styleTween(name[, factory[, priority]])) <>

  If factory is specified and not null, assigns the style tween for the style with the specified name to the specified interpolator factory. An interpolator factory is a function that returns an interpolator; when the transition starts, the factory is evaluated for each selected element, in order, being passed the current datum d and index i, with the this context as the current DOM element. The returned interpolator will then be invoked for each frame of the transition, in order, being passed the eased time t, typically in the range [0, 1]. Lastly, the return value of the interpolator will be used to set the style value with the specified priority. The interpolator must return a string. (To remove an style at the start of a transition, use transition.style; to remove an style at the end of a transition, use transition.on to listen for the end event.)

  If the specified factory is null, removes the previously-assigned style tween of the specified name, if any. If factory is not specified, returns the current interpolator factory for style with the specified name, or undefined if no such tween exists.

  For example, to interpolate the fill style from red to blue:

  selection.styleTween("fill", function() {
    return d3.interpolateRgb("red", "blue");
  });
  Or to interpolate from the current fill to blue, like transition.style:

  selection.styleTween("fill", function() {
    return d3.interpolateRgb(getComputedStyle(this).getPropertyValue("fill"), "blue");
  });
  Or to apply a custom rainbow interpolator:

  selection.styleTween("fill", function() {
    return function(t) {
      return "hsl(" + t * 360 + ",100%,50%)";
    };
  });
  This method is useful to specify a custom interpolator, such as with data interpolation, where d3.interpolateObject is used to interpolate two data values, and the resulting value is then used to compute the new style value.
 */

var svg = d3.select('body')
  .append('svg')
  .attr('width', 600)
  .attr('height', 200);

svg.append('text')
  .attr('x', 10)
  .attr('y', 50)
  .text('Watch my size change')
  .transition()
  .duration(5000)
  .styleTween('font', function(d, i){
    return d3.interpolate('12px Helvetica', '36px Helvetica');
  });