/**
 * # selection.style(name[, value[, priority]]) <>

  If a value is specified, sets the style property with the specified name to the specified value on the selected elements and returns this selection. If the value is a constant, then all elements are given the same style property value; otherwise, if the value is a function, then the function is evaluated for each selected element, in order, being passed the current datum (d), the current index (i), and the current group (nodes), with this as the current DOM element. The function’s return value is then used to set each element’s style property. A null value will remove the style property. An optional priority may also be specified, either as null or the string important (without the exclamation point).

  If a value is not specified, returns the current computed value of the specified style property for the first (non-null) element in the selection. This is generally useful only if you know the selection contains exactly one element. The computed value may be different than the previously-set value, particularly if it was set using a shorthand property (such as the font style, which is shorthand for font-size, font-face, etc.).

  Caution: unlike many SVG attributes, CSS styles typically have associated units. For example, 3px is a valid stroke-width property value, while 3 is not. Some browsers implicitly assign the px (pixel) unit to numeric values, but not all browsers do: IE, for example, throws an “invalid arguments” error!
 */
d3.selectAll('div')
  .style('width', function(d, i) { return (10 + 10 * i) + 'px'; })
  .style('background-color', function(d, i) { return (i % 2 === 0) ? 'lightblue' : 'lightgreen';});