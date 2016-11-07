/**
 * # transition.on(typenames[, listener]) <>

  Adds or removes a listener to each selected element for the specified event typenames. The typenames is one of the following string event types:

  start - when the transition starts.
  end - when the transition ends.
  interrupt - when the transition is interrupted.

  See The Life of a Transition for more. Note that these are not native DOM events as implemented by selection.on and selection.dispatch, but transition events!

  The type may be optionally followed by a period (.) and a name; the optional name allows multiple callbacks to be registered to receive events of the same type, such as start.foo and start.bar. To specify multiple typenames, separate typenames with spaces, such as interrupt end or start.foo start.bar.

  When a specified transition event is dispatched on a selected node, the specified listener will be invoked for the transitioning element, being passed the current datum d and index i, with the this context as the current DOM element. Listeners always see the latest datum for their element, but the index is a property of the selection and is fixed when the listener is assigned; to update the index, re-assign the listener.

  If an event listener was previously registered for the same typename on a selected element, the old listener is removed before the new listener is added. To remove a listener, pass null as the listener. To remove all listeners for a given name, pass null as the listener and .foo as the typename, where foo is the name; to remove all listeners with no name, specify . as the typename.

  If a listener is not specified, returns the currently-assigned listener for the specified event typename on the first (non-null) selected element, if any. If multiple typenames are specified, the first matching listener is returned.
 */

var svg = d3.select('body')
  .append('svg')
  .attr('width', 600)
  .attr('height', 200);

var rect = svg.append('rect')
  .attr('x', 10)
  .attr('y', 10)
  .attr('width', 80)
  .attr('height', 80)
  .attr('fill', 'green');

rect.transition()
  .on('start', function(){
    d3.select(this).attr('fill', 'blue');
  })
  .delay(1000)
  .duration(1500)
  .attr('fill', 'purple')
  .attr('x', 240)
  .attr('y', 80)
  .attr('width', 60)
  .attr('height', 60)
  .transition()
  .duration(1500)
  .attr('x', 460)
  .attr('y', 10)
  .attr('width', 80)
  .attr('height', 80)
  .attr('fill', 'yellow')
  .on('end', function(){
    d3.select(this).attr('fill', 'red');
  });